import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateExperienceInput } from './create-experience.input';

describe('CreateExperienceInput', () => {
  it('allows startDate through whitelist validation', async () => {
    const input = plainToInstance(CreateExperienceInput, {
      company: 'Example Labs',
      roleEn: 'Developer',
      roleRu: 'Разработчик',
      descriptionEn: 'Description',
      descriptionRu: 'Описание',
      startDate: new Date('2023-04-01T00:00:00.000Z'),
      endDate: null,
      sortOrder: 10,
      skillIds: ['skill-1'],
    });

    const errors = await validate(input, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    expect(errors).toEqual([]);
  });
});
