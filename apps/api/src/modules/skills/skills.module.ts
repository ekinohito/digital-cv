import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { SkillsResolver } from './skills.resolver';
import { SkillsService } from './skills.service';

@Module({
  imports: [PrismaModule],
  providers: [SkillsResolver, SkillsService],
})
export class SkillsModule {}
