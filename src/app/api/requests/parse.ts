import type { ZodError } from 'zod';
import { createRequest, type RequestDeps, type SubmitInput } from '@/server/createRequest';
import { clientIp, hashIp } from '@/server/ip';
import { logoRequestSchema, signRequestSchema, validateUpload } from '@/lib/validation';

const HONEYPOT = 'company_website';

const badRequest = (errors: Record<string, string[] | undefined>) => Response.json({ errors }, { status: 400 });
const fieldErrors = (e: ZodError) => e.flatten().fieldErrors as Record<string, string[] | undefined>;

async function submit(req: Request, input: SubmitInput, deps: RequestDeps): Promise<Response> {
  const result = await createRequest(input, hashIp(clientIp(req.headers)), deps);
  if (!result.ok) return Response.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  return Response.json({ ref: result.ref, token: result.token });
}

function asFile(v: FormDataEntryValue | null, fallbackName: string): File | null {
  if (!(v instanceof Blob) || v.size === 0) return null;
  return v instanceof File ? v : new File([v], fallbackName, { type: (v as Blob).type });
}

export async function handleSign(req: Request, deps: RequestDeps): Promise<Response> {
  const form = await req.formData();
  if (String(form.get(HONEYPOT) ?? '').trim()) return Response.json({ ref: null, token: null });

  let payload: unknown;
  try {
    payload = JSON.parse(String(form.get('payload') ?? ''));
  } catch {
    return badRequest({ payload: ['Invalid request'] });
  }
  const parsed = signRequestSchema.safeParse(payload);
  if (!parsed.success) return badRequest(fieldErrors(parsed.error));

  const preview = asFile(form.get('preview'), 'preview.png');
  const fileError = preview ? validateUpload(preview, 'preview') : 'Missing sign preview';
  if (fileError) return badRequest({ file: [fileError] });

  return submit(req, { kind: 'sign', data: parsed.data, file: preview! }, deps);
}

export async function handleLogo(req: Request, deps: RequestDeps): Promise<Response> {
  const form = await req.formData();
  if (String(form.get(HONEYPOT) ?? '').trim()) return Response.json({ ref: null, token: null });

  const fields: Record<string, string> = {};
  form.forEach((v, k) => {
    if (typeof v === 'string' && k !== HONEYPOT) fields[k] = v;
  });
  const parsed = logoRequestSchema.safeParse(fields);
  if (!parsed.success) return badRequest(fieldErrors(parsed.error));

  const design = asFile(form.get('design'), 'logo');
  const fileError = design ? validateUpload(design, 'logo') : null;
  if (fileError) return badRequest({ file: [fileError] });

  return submit(req, { kind: 'logo', data: parsed.data, file: design }, deps);
}
