import { describe, expect, it, vi } from 'vitest';
import { logoReq, signReq } from '@/server/testFixtures';
import { serveRequestFile } from './serveFile';

const stream = () => new Response('bytes').body!;

describe('serveRequestFile', () => {
  it('returns 404 when the request or its file does not exist', async () => {
    expect((await serveRequestFile(null, vi.fn())).status).toBe(404);
    expect((await serveRequestFile({ ...signReq, imageUrl: null }, vi.fn())).status).toBe(404);
    expect((await serveRequestFile(signReq, vi.fn(async () => null))).status).toBe(404);
  });

  it('streams an image inline with its content type and no caching', async () => {
    const res = await serveRequestFile(signReq, vi.fn(async () => ({ stream: stream(), contentType: 'image/png' })));
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('image/png');
    expect(res.headers.get('cache-control')).toBe('private, no-store');
    expect(res.headers.get('content-disposition')).toBeNull();
    expect(await res.text()).toBe('bytes');
  });

  it('downloads SVG and PDF files instead of rendering them, and sandboxes them', async () => {
    const svg = await serveRequestFile({ ...logoReq, imageUrl: 'https://b/requests/AF-1043/logo.svg' }, vi.fn(async () => ({ stream: stream(), contentType: 'image/svg+xml' })));
    expect(svg.headers.get('content-disposition')).toBe('attachment; filename="AF-1043.svg"');
    expect(svg.headers.get('content-security-policy')).toBe("sandbox; default-src 'none'");
  });

  it('asks the store for the private file by its stored URL', async () => {
    const getFile = vi.fn(async () => ({ stream: stream(), contentType: 'image/png' }));
    await serveRequestFile(signReq, getFile);
    expect(getFile).toHaveBeenCalledWith(signReq.imageUrl);
  });
});
