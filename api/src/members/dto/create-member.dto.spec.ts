import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateMemberDto } from './create-member.dto.js';

async function check(input: Record<string, unknown>) {
  const dto = plainToInstance(CreateMemberDto, input);
  const errors = await validate(dto);
  return { dto, failed: errors.map((e) => e.property) };
}

describe('CreateMemberDto', () => {
  it('trims and lowercases the email', async () => {
    const { dto, failed } = await check({
      name: ' Jane Doe ',
      email: '  Jane.Doe@Example.COM ',
    });

    expect(failed).toEqual([]);
    expect(dto.email).toBe('jane.doe@example.com');
    expect(dto.name).toBe('Jane Doe');
  });

  it('rejects an empty name and an invalid email', async () => {
    const { failed } = await check({ name: '   ', email: 'not-an-email' });
    expect(failed).toEqual(expect.arrayContaining(['name', 'email']));
  });

  it('accepts a known status and rejects an unknown one', async () => {
    const base = { name: 'Jane', email: 'jane@example.com' };
    expect((await check({ ...base, status: 'SUSPENDED' })).failed).toEqual([]);
    expect((await check({ ...base, status: 'BANNED' })).failed).toContain(
      'status',
    );
  });
});
