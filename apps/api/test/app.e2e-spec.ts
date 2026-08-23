import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { Readable } from 'node:stream';
import { AppModule } from '../src/app.module';
import { StorageService } from '../src/infrastructure/storage/storage.service';

process.env.ADMIN_ACCESS_TOKEN ??= 'e2e-admin-token';

const ADMIN_TOKEN = process.env.ADMIN_ACCESS_TOKEN;

class InMemoryStorageService extends StorageService {
  private readonly objects = new Map<string, Buffer>();

  get bucket(): string {
    return 'e2e-bucket';
  }

  put(key: string, data: Buffer): Promise<void> {
    this.objects.set(key, data);
    return Promise.resolve();
  }

  get(key: string): Promise<Readable> {
    const data = this.objects.get(key);
    if (!data) {
      return Promise.reject(new Error(`Object ${key} does not exist`));
    }
    return Promise.resolve(Readable.from(data));
  }

  delete(key: string): Promise<void> {
    this.objects.delete(key);
    return Promise.resolve();
  }
}

describe('GraphQL API (e2e)', () => {
  let app: INestApplication;
  const cleanupIds: { skills: string[]; projects: string[]; assets: string[] } =
    {
      skills: [],
      projects: [],
      assets: [],
    };

  const sendGraphql = (query: string, token?: string) => {
    const req = request(app.getHttpServer()).post('/graphql');
    if (token) {
      void req.set('Authorization', `Bearer ${token}`);
    }
    return req.send({ query });
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(StorageService)
      .useClass(InMemoryStorageService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    for (const id of cleanupIds.projects) {
      await sendGraphql(
        `mutation { deleteProject(id: "${id}") }`,
        ADMIN_TOKEN,
      ).catch(() => undefined);
    }
    for (const id of cleanupIds.skills) {
      await sendGraphql(
        `mutation { deleteSkill(id: "${id}") }`,
        ADMIN_TOKEN,
      ).catch(() => undefined);
    }
    for (const id of cleanupIds.assets) {
      await sendGraphql(
        `mutation { deleteAsset(id: "${id}") }`,
        ADMIN_TOKEN,
      ).catch(() => undefined);
    }
    await app.close();
  });

  it('exposes a health endpoint', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/health')
      .expect(200);
    expect(response.body).toEqual({ status: 'ok' });
  });

  it('returns public queries without a token', async () => {
    const response = await sendGraphql(
      '{ skills { id slug } socialLinks { id } }',
    ).expect(200);
    expect(response.body.errors).toBeUndefined();
    expect(Array.isArray(response.body.data.skills)).toBe(true);
    expect(Array.isArray(response.body.data.socialLinks)).toBe(true);
  });

  it('rejects mutations without an admin token', async () => {
    const response = await sendGraphql(
      'mutation { createSkill(input: { slug: "nope", name: "Nope", category: OTHER, sortOrder: 1 }) { id } }',
    ).expect(200);

    expect(response.body.errors).toBeDefined();
    expect(response.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
    expect(response.body.data).toBeNull();
  });

  it('rejects mutations with a wrong admin token', async () => {
    const response = await sendGraphql(
      'mutation { createSkill(input: { slug: "nope", name: "Nope", category: OTHER, sortOrder: 1 }) { id } }',
      'wrong-token',
    ).expect(200);

    expect(response.body.errors[0].extensions.code).toBe('UNAUTHENTICATED');
  });

  it('rejects invalid input with a bad request error', async () => {
    const response = await sendGraphql(
      'mutation { createSkill(input: { slug: "Not A Slug", name: "x", category: OTHER, sortOrder: 1 }) { id } }',
      ADMIN_TOKEN,
    ).expect(200);

    expect(response.body.errors[0].extensions.code).toBe('BAD_REQUEST');
  });

  it('runs a full skill lifecycle as admin', async () => {
    const slug = `e2e-skill-${Date.now()}`;

    const created = await sendGraphql(
      `mutation { createSkill(input: { slug: "${slug}", name: "E2E Skill", category: TESTING, sortOrder: 999 }) { id slug name category sortOrder } }`,
      ADMIN_TOKEN,
    ).expect(200);

    const skill = created.body.data.createSkill;
    expect(skill).toMatchObject({
      slug,
      name: 'E2E Skill',
      category: 'TESTING',
    });
    cleanupIds.skills.push(skill.id);

    const updated = await sendGraphql(
      `mutation { updateSkill(id: "${skill.id}", input: { name: "E2E Skill v2" }) { id name } }`,
      ADMIN_TOKEN,
    ).expect(200);
    expect(updated.body.data.updateSkill.name).toBe('E2E Skill v2');

    const listed = await sendGraphql(
      `{ skills(category: TESTING) { id slug name } }`,
    ).expect(200);
    expect(
      listed.body.data.skills.some((s: { id: string }) => s.id === skill.id),
    ).toBe(true);

    const deleted = await sendGraphql(
      `mutation { deleteSkill(id: "${skill.id}") }`,
      ADMIN_TOKEN,
    ).expect(200);
    expect(deleted.body.data.deleteSkill).toBe(true);
    cleanupIds.skills = [];
  });

  it('runs a full project lifecycle as admin', async () => {
    const slug = `e2e-project-${Date.now()}`;

    const created = await sendGraphql(
      `mutation { createProject(input: { slug: "${slug}", titleEn: "E2E", titleRu: "E2E", summaryEn: "s", summaryRu: "с", sortOrder: 999, skillIds: [] }) { id slug featured } }`,
      ADMIN_TOKEN,
    ).expect(200);

    const project = created.body.data.createProject;
    expect(project).toMatchObject({ slug, featured: false });
    cleanupIds.projects.push(project.id);

    const bySlug = await sendGraphql(
      `{ project(slug: "${slug}") { id slug } }`,
    ).expect(200);
    expect(bySlug.body.data.project.id).toBe(project.id);

    const updated = await sendGraphql(
      `mutation { updateProject(id: "${project.id}", input: { featured: true }) { id featured } }`,
      ADMIN_TOKEN,
    ).expect(200);
    expect(updated.body.data.updateProject.featured).toBe(true);

    const deleted = await sendGraphql(
      `mutation { deleteProject(id: "${project.id}") }`,
      ADMIN_TOKEN,
    ).expect(200);
    expect(deleted.body.data.deleteProject).toBe(true);
    cleanupIds.projects = [];
  });

  it('uploads, downloads and deletes an asset', async () => {
    const uploaded = await request(app.getHttpServer())
      .post('/api/admin/assets')
      .set('Authorization', `Bearer ${ADMIN_TOKEN}`)
      .attach('file', Buffer.from('e2e asset body', 'utf8'), {
        filename: 'e2e-asset.txt',
        contentType: 'text/plain',
      })
      .expect(201);

    const assetId: string = uploaded.body.id;
    expect(uploaded.body).toMatchObject({
      originalName: 'e2e-asset.txt',
      mimeType: 'text/plain',
      url: `/api/assets/${assetId}`,
    });
    cleanupIds.assets.push(assetId);

    const downloaded = await request(app.getHttpServer())
      .get(`/api/assets/${assetId}`)
      .expect(200);
    expect(downloaded.headers['content-type']).toBe('text/plain');
    expect(downloaded.text).toBe('e2e asset body');

    const listed = await sendGraphql(
      '{ assets { id url } }',
      ADMIN_TOKEN,
    ).expect(200);
    expect(
      listed.body.data.assets.some((a: { id: string }) => a.id === assetId),
    ).toBe(true);

    const deleted = await sendGraphql(
      `mutation { deleteAsset(id: "${assetId}") }`,
      ADMIN_TOKEN,
    ).expect(200);
    expect(deleted.body.data.deleteAsset).toBe(true);

    await request(app.getHttpServer())
      .get(`/api/assets/${assetId}`)
      .expect(404);
    cleanupIds.assets = [];
  });

  it('rejects asset uploads without an admin token', async () => {
    await request(app.getHttpServer())
      .post('/api/admin/assets')
      .attach('file', Buffer.from('nope', 'utf8'), {
        filename: 'nope.txt',
        contentType: 'text/plain',
      })
      .expect(401);
  });
});
