import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let prisma: {
    profile: {
      findFirst: jest.Mock;
      update: jest.Mock;
      create: jest.Mock;
    };
    asset: { count: jest.Mock };
  };

  const profileRow = {
    id: 'profile-1',
    fullName: 'Alexey Petrov',
    headlineEn: 'Backend developer',
    headlineRu: 'Backend-разработчик',
    summaryEn: 'Summary',
    summaryRu: 'Описание',
    email: 'alexey.petrov@example.com',
    githubUrl: 'https://github.com/example',
    avatarAssetId: null,
    resumeAssetId: null,
    avatarAsset: null,
    resumeAsset: null,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    updatedAt: new Date('2026-01-01T00:00:00.000Z'),
  };

  beforeEach(() => {
    prisma = {
      profile: {
        findFirst: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
      },
      asset: { count: jest.fn() },
    };
    service = new ProfileService(prisma as unknown as PrismaService);
  });

  describe('get', () => {
    it('maps the stored profile', async () => {
      prisma.profile.findFirst.mockResolvedValue(profileRow);

      const result = await service.get();

      expect(result).toMatchObject({
        id: 'profile-1',
        fullName: 'Alexey Petrov',
        avatar: null,
        resume: null,
      });
    });

    it('throws when the profile is not configured', async () => {
      prisma.profile.findFirst.mockResolvedValue(null);

      await expect(service.get()).rejects.toBeInstanceOf(NotFoundException);
    });
  });

  describe('update', () => {
    it('updates the existing single profile row', async () => {
      prisma.profile.findFirst
        .mockResolvedValueOnce({ id: 'profile-1' })
        .mockResolvedValueOnce(profileRow);
      prisma.profile.update.mockResolvedValue({
        ...profileRow,
        fullName: 'New Name',
      });

      const result = await service.update({ fullName: 'New Name' });

      expect(prisma.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'profile-1' } }),
      );
      expect(result.fullName).toBe('New Name');
    });

    it('bootstraps the profile row when it does not exist yet', async () => {
      prisma.profile.findFirst.mockResolvedValue(null);
      prisma.profile.create.mockResolvedValue(profileRow);

      const result = await service.update({ fullName: 'Alexey Petrov' });

      expect(prisma.profile.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            fullName: 'Alexey Petrov',
            headlineEn: '',
            email: '',
          }),
        }),
      );
      expect(result.id).toBe('profile-1');
    });

    it('disconnects assets when null is passed', async () => {
      prisma.profile.findFirst
        .mockResolvedValueOnce({ id: 'profile-1' })
        .mockResolvedValueOnce(profileRow);
      prisma.profile.update.mockResolvedValue(profileRow);

      await service.update({ avatarAssetId: null, resumeAssetId: null });

      expect(prisma.profile.update).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            avatarAsset: { disconnect: true },
            resumeAsset: { disconnect: true },
          }),
        }),
      );
    });

    it('rejects asset ids that do not exist', async () => {
      prisma.asset.count.mockResolvedValue(0);

      await expect(
        service.update({ avatarAssetId: 'missing-asset' }),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.profile.update).not.toHaveBeenCalled();
    });
  });
});
