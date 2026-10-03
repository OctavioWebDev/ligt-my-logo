import type { Prisma, QuoteRequest } from '@prisma/client';
import { calculatePrice } from '@/lib/pricing';
import type { LogoRequestInput, SignRequestInput } from '@/lib/validation';
import type { NewRequestRow } from './requestStore';

export const SUBMISSIONS_PER_HOUR = 5;

export type RequestDeps = {
  nextRef: () => Promise<string>;
  insertRequest: (row: NewRequestRow) => Promise<QuoteRequest>;
  countRecentByIp: (ipHash: string, since: Date) => Promise<number>;
  setEmailError: (ref: string, message: string) => Promise<void>;
  uploadFile: (ref: string, file: File) => Promise<string>;
  notifyOwner: (req: QuoteRequest) => Promise<void>;
  confirmCustomer: (req: QuoteRequest) => Promise<void>;
  now: () => Date;
  newToken: () => string;
};

export type SubmitInput =
  | { kind: 'sign'; data: SignRequestInput; file: File }
  | { kind: 'logo'; data: LogoRequestInput; file: File | null };

function toRow(input: SubmitInput, ref: string, ipHash: string, imageUrl: string | null, viewToken: string): NewRequestRow {
  if (input.kind === 'sign') {
    const { name, email, phone, notes, spec } = input.data;
    return {
      ref, type: 'sign', name, email, phone: phone ?? null, notes: notes ?? null,
      details: spec as Prisma.InputJsonValue,
      priceCents: Math.round(calculatePrice(spec) * 100),
      imageUrl, ipHash, viewToken,
    };
  }
  const { firstName, lastName, email, phone, description, customerType, size, quantity, deadline, promotions, smsNotifications } = input.data;
  return {
    ref, type: 'logo', name: `${firstName} ${lastName}`, email, phone: phone ?? null, notes: description,
    details: { customerType, size, quantity, deadline: deadline ?? null, promotions, smsNotifications },
    priceCents: null, imageUrl, ipHash, viewToken,
  };
}

/** Saves a validated request, then emails. An email failure is recorded, never thrown. */
export async function createRequest(
  input: SubmitInput,
  ipHash: string,
  deps: RequestDeps,
): Promise<{ ok: true; ref: string; token: string } | { ok: false; status: 429 }> {
  const since = new Date(deps.now().getTime() - 3600_000);
  if ((await deps.countRecentByIp(ipHash, since)) >= SUBMISSIONS_PER_HOUR) return { ok: false, status: 429 };

  const ref = await deps.nextRef();
  const imageUrl = input.file ? await deps.uploadFile(ref, input.file) : null;
  const token = deps.newToken();
  const saved = await deps.insertRequest(toRow(input, ref, ipHash, imageUrl, token));

  const errors: string[] = [];
  for (const [label, send] of [['owner', deps.notifyOwner], ['customer', deps.confirmCustomer]] as const) {
    try {
      await send(saved);
    } catch (e) {
      errors.push(`${label}: ${e instanceof Error ? e.message : String(e)}`);
    }
  }
  if (errors.length) {
    console.error(`Email failed for ${ref}`, errors);
    await deps.setEmailError(ref, errors.join('; ')).catch((e) => console.error('setEmailError failed', e));
  }
  return { ok: true, ref, token };
}
