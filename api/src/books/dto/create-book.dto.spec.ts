import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateBookDto } from './create-book.dto.js';

const categoryId = '55555555-5555-4555-8555-555555555555';
const authorId = '66666666-6666-4666-8666-666666666666';

/** Runs the same transform + validation the global ValidationPipe does. */
async function check(input: Record<string, unknown>) {
  const dto = plainToInstance(CreateBookDto, input);
  const errors = await validate(dto);
  return { dto, failed: errors.map((e) => e.property) };
}

const valid = {
  isbn: '978-0-441-47812-5',
  title: '  The Left Hand of Darkness  ',
  categoryId,
};

describe('CreateBookDto', () => {
  it('accepts a valid book and normalises ISBN and title', async () => {
    const { dto, failed } = await check(valid);

    expect(failed).toEqual([]);
    expect(dto.isbn).toBe('9780441478125');
    expect(dto.title).toBe('The Left Hand of Darkness');
  });

  it('rejects an invalid ISBN checksum', async () => {
    const { failed } = await check({ ...valid, isbn: '9780441478120' });
    expect(failed).toContain('isbn');
  });

  it('requires a UUID categoryId', async () => {
    const { failed } = await check({ ...valid, categoryId: 'abc' });
    expect(failed).toContain('categoryId');
  });

  it('rejects zero copies and a future publishedYear', async () => {
    const { failed } = await check({
      ...valid,
      totalCopies: 0,
      publishedYear: new Date().getFullYear() + 1,
    });
    expect(failed).toEqual(
      expect.arrayContaining(['totalCopies', 'publishedYear']),
    );
  });

  it('rejects duplicate or malformed authorIds', async () => {
    expect(
      (await check({ ...valid, authorIds: [authorId, authorId] })).failed,
    ).toContain('authorIds');
    expect((await check({ ...valid, authorIds: ['nope'] })).failed).toContain(
      'authorIds',
    );
  });
});
