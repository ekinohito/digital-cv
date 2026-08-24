import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { StorageModule } from './infrastructure/storage/storage.module';
import { AssetsModule } from './modules/assets/assets.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SkillsModule } from './modules/skills/skills.module';
import { SocialLinksModule } from './modules/social-links/social-links.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      autoSchemaFile: join(process.cwd(), 'schema.gql'),

      sortSchema: true,
      introspection: true,
      playground: false,
      graphiql: true,
    }),

    ProfileModule,
    ExperiencesModule,
    ProjectsModule,
    SkillsModule,
    SocialLinksModule,
    AssetsModule,
    PrismaModule,
    StorageModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
