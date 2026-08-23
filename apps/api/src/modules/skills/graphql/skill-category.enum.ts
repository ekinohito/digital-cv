import { registerEnumType } from '@nestjs/graphql';

export enum SkillCategory {
  LANGUAGE = 'LANGUAGE',
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  DATABASE = 'DATABASE',
  INFRASTRUCTURE = 'INFRASTRUCTURE',
  TESTING = 'TESTING',
  TOOLING = 'TOOLING',
  OTHER = 'OTHER',
}

registerEnumType(SkillCategory, {
  name: 'SkillCategory',
});
