import { Module } from '@nestjs/common';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { SocialLinksResolver } from './social-links.resolver';
import { SocialLinksService } from './social-links.service';

@Module({
  imports: [PrismaModule],
  providers: [SocialLinksResolver, SocialLinksService],
})
export class SocialLinksModule {}
