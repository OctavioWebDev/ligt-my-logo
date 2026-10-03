import { describe, expect, it } from 'vitest';
import { logoRequestSchema, signRequestSchema, validateUpload } from './validation';

const goodSign = {
  name: 'Ana',
  email: 'ana@x.com',
  spec: {
    text: 'Open Late',
    font: 'Pacifico',
    glowColor: 'Pink',
    tubeColor: 'White',
    size: { width: 13, height: 4 },
    backing: 'Cut to Shape',
    location: 'inside',
  },
};
const withSpec = (spec: Partial<typeof goodSign.spec>) => ({ ...goodSign, spec: { ...goodSign.spec, ...spec } });

const goodLogo = {
  customerType: 'business',
  description: 'Our cafe logo, about 2 feet wide',
  size: 'md',
  quantity: 2,
  deadline: '2026-11-01',
  firstName: 'Ana',
  lastName: 'Ruiz',
  email: 'ana@x.com',
  phone: '419-555-0100',
  promotions: false,
  smsNotifications: false,
  termsAccepted: true,
};

describe('signRequestSchema', () => {
  it('accepts a complete sign request', () => {
    expect(signRequestSchema.safeParse(goodSign).success).toBe(true);
  });

  it('rejects a bad email', () => {
    expect(signRequestSchema.safeParse({ ...goodSign, email: 'nope' }).success).toBe(false);
  });

  it('rejects whitespace-only text', () => {
    expect(signRequestSchema.safeParse(withSpec({ text: '   ' })).success).toBe(false);
  });

  it('rejects more than 3 lines', () => {
    expect(signRequestSchema.safeParse(withSpec({ text: 'a\nb\nc\nd' })).success).toBe(false);
  });

  it('allows 60 characters across lines but not 61', () => {
    expect(signRequestSchema.safeParse(withSpec({ text: 'x'.repeat(61) })).success).toBe(false);
    expect(signRequestSchema.safeParse(withSpec({ text: 'x'.repeat(30) + '\n' + 'y'.repeat(30) })).success).toBe(true);
  });

  it('rejects options that are not offered', () => {
    expect(signRequestSchema.safeParse(withSpec({ font: 'Comic Sans' as never })).success).toBe(false);
  });

  it('rejects sizes outside the allowed range', () => {
    expect(signRequestSchema.safeParse(withSpec({ size: { width: 200, height: 4 } })).success).toBe(false);
  });

  it('limits notes to 500 characters', () => {
    expect(signRequestSchema.safeParse({ ...goodSign, notes: 'n'.repeat(501) }).success).toBe(false);
  });
});

describe('logoRequestSchema', () => {
  it('requires accepting the terms', () => {
    expect(logoRequestSchema.safeParse({ ...goodLogo, termsAccepted: false }).success).toBe(false);
  });

  it('coerces form strings to numbers', () => {
    expect(logoRequestSchema.safeParse({ ...goodLogo, quantity: '3' }).data?.quantity).toBe(3);
  });

  it('coerces checkbox strings to booleans', () => {
    const parsed = logoRequestSchema.safeParse({ ...goodLogo, promotions: 'on', termsAccepted: 'on' });
    expect(parsed.data?.promotions).toBe(true);
    expect(parsed.data?.termsAccepted).toBe(true);
  });
});

describe('validateUpload', () => {
  it('accepts a PNG preview', () => {
    expect(validateUpload({ type: 'image/png', size: 1000 }, 'preview')).toBeNull();
  });

  it('rejects a non-PNG preview', () => {
    expect(validateUpload({ type: 'image/jpeg', size: 1000 }, 'preview')).not.toBeNull();
  });

  it('accepts a PDF logo and rejects a GIF', () => {
    expect(validateUpload({ type: 'application/pdf', size: 1000 }, 'logo')).toBeNull();
    expect(validateUpload({ type: 'image/gif', size: 1000 }, 'logo')).not.toBeNull();
  });

  it('rejects files over 10 MB', () => {
    expect(validateUpload({ type: 'image/png', size: 10 * 1024 * 1024 + 1 }, 'logo')).not.toBeNull();
  });
});
