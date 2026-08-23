import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { ExperiencesResolver } from './experiences.resolver';
import { ExperiencesService } from './experiences.service';

@Module({
  imports: [PrismaModule],
  providers: [ExperiencesResolver, ExperiencesService],
})
export class ExperiencesModule {}
