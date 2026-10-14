import {
  ArgumentsHost,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '../../generated/prisma/client.js';
import { AllExceptionsFilter } from './all-exceptions.filter.js';

const prismaError = (code: string) =>
  new Prisma.PrismaClientKnownRequestError('db error', {
    code,
    clientVersion: 'test',
  });

describe('AllExceptionsFilter', () => {
  const reply = vi.fn();
  const response = {};
  let filter: AllExceptionsFilter;
  let logError: ReturnType<typeof vi.spyOn>;

  const host = {
    switchToHttp: () => ({
      getResponse: () => response,
      getRequest: () => ({}),
    }),
  } as unknown as ArgumentsHost;

  const catchAndGetBody = (exception: unknown) => {
    filter.catch(exception, host);
    const [res, body, status] = reply.mock.calls[0];
    expect(res).toBe(response);
    expect(body.statusCode).toBe(status);
    return body;
  };

  beforeEach(() => {
    reply.mockReset();
    logError = vi
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => undefined);
    const adapterHost = {
      httpAdapter: { reply, getRequestUrl: () => '/api/test' },
    } as unknown as HttpAdapterHost;
    filter = new AllExceptionsFilter(adapterHost);
  });

  it('formats Nest HTTP exceptions with path and timestamp', () => {
    const body = catchAndGetBody(new NotFoundException('Book x not found'));

    expect(body).toMatchObject({
      statusCode: 404,
      error: 'NOT_FOUND',
      message: 'Book x not found',
      path: '/api/test',
    });
    expect(new Date(body.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('keeps the list of validation messages', () => {
    const body = catchAndGetBody(
      new BadRequestException([
        'name should not be empty',
        'email must be an email',
      ]),
    );

    expect(body.statusCode).toBe(400);
    expect(body.message).toEqual([
      'name should not be empty',
      'email must be an email',
    ]);
  });

  it.each([
    ['P2002', 409, 'CONFLICT'],
    ['P2025', 404, 'NOT_FOUND'],
    ['P2003', 409, 'CONFLICT'],
  ])('maps Prisma %s to %i', (code, statusCode, error) => {
    const body = catchAndGetBody(prismaError(code));
    expect(body).toMatchObject({ statusCode, error });
  });

  it('turns unmapped Prisma errors into 500', () => {
    expect(catchAndGetBody(prismaError('P2000')).statusCode).toBe(500);
  });

  it('hides unexpected error details and logs them', () => {
    const body = catchAndGetBody(new Error('secret SQL detail'));

    expect(body).toMatchObject({
      statusCode: 500,
      error: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
    });
    expect(JSON.stringify(body)).not.toContain('secret');
    expect(logError).toHaveBeenCalled();
  });
});
