/** Error body returned by the API's global exception filter. */
export interface ApiErrorBody {
  statusCode: number;
  error: string;
  message: string | string[];
  path?: string;
  timestamp?: string;
}

export class ApiError extends Error {
  readonly statusCode: number;
  readonly code: string;
  readonly messages: string[];

  constructor(body: ApiErrorBody) {
    const messages = Array.isArray(body.message)
      ? body.message
      : [body.message];
    super(messages.join('; '));
    this.name = 'ApiError';
    this.statusCode = body.statusCode;
    this.code = body.error;
    this.messages = messages;
  }
}

type Method = 'GET' | 'POST' | 'PATCH' | 'DELETE';

/**
 * Typed wrapper around fetch for `/api/*` (proxied to NestJS by Vite in dev).
 * Throws ApiError for non-2xx responses; returns undefined for 204 No Content.
 */
export async function apiFetch<T>(
  path: string,
  options: { method?: Method; body?: unknown } = {},
): Promise<T> {
  const { method = 'GET', body } = options;

  let response: Response;
  try {
    response = await fetch(`/api${path}`, {
      method,
      headers:
        body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError({
      statusCode: 0,
      error: 'NETWORK_ERROR',
      message: 'Cannot reach the API. Is it running on port 3000?',
    });
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data: unknown = await response.json().catch(() => undefined);

  if (!response.ok) {
    const isApiError =
      typeof data === 'object' && data !== null && 'statusCode' in data;
    throw new ApiError(
      isApiError
        ? (data as ApiErrorBody)
        : {
            statusCode: response.status,
            error: response.statusText || 'ERROR',
            message: `Request failed with status ${response.status}`,
          },
    );
  }

  return data as T;
}
