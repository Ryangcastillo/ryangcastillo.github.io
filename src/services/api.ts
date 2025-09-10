// Minimal typed API client scaffold for future backend integration

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const BASE_URL = (import.meta as any).env?.VITE_API_BASE as string | undefined;

function makeUrl(path: string): string {
  if (!BASE_URL) throw new Error('VITE_API_BASE is not set');
  const base = BASE_URL.replace(/\/$/, '');
  const rel = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rel}`;
}

export interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

export async function request<TResponse = unknown, TBody = unknown>(
  path: string,
  { method = 'GET', body, headers = {}, signal }: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const isJson = body !== undefined && typeof body !== 'string' && !(body instanceof FormData);
  const res = await fetch(makeUrl(path), {
    method,
    headers: {
      ...(isJson ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : isJson ? JSON.stringify(body) : (body as any),
    signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${method} ${path} failed: ${res.status} ${res.statusText} ${text}`.trim());
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as TResponse;
  }
  return (await res.text()) as unknown as TResponse;
}

export const api = {
  get: <TResponse>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TResponse>(path, { ...(opts || {}), method: 'GET' }),
  post: <TResponse, TBody = unknown>(path: string, body?: TBody, opts?: Omit<RequestOptions<TBody>, 'method'>) =>
    request<TResponse, TBody>(path, { ...(opts || {}), method: 'POST', body }),
  put: <TResponse, TBody = unknown>(path: string, body?: TBody, opts?: Omit<RequestOptions<TBody>, 'method'>) =>
    request<TResponse, TBody>(path, { ...(opts || {}), method: 'PUT', body }),
  patch: <TResponse, TBody = unknown>(path: string, body?: TBody, opts?: Omit<RequestOptions<TBody>, 'method'>) =>
    request<TResponse, TBody>(path, { ...(opts || {}), method: 'PATCH', body }),
  delete: <TResponse>(path: string, opts?: Omit<RequestOptions, 'method' | 'body'>) =>
    request<TResponse>(path, { ...(opts || {}), method: 'DELETE' }),
};
