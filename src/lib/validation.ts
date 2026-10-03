import { z } from 'zod';
import {
  BACKINGS,
  FONTS,
  GLOW_COLOR_NAMES,
  LOCATIONS,
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_HEIGHT,
  MIN_WIDTH,
  TUBE_COLORS,
} from '@/config/signOptions';

export const MAX_SIGN_LINES = 3;
export const MAX_SIGN_CHARS = 60;
export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

const optionalText = (max: number) =>
  z.preprocess((v) => (typeof v === 'string' && v.trim() === '' ? undefined : v), z.string().trim().max(max).optional());

// HTML checkboxes send "on"; JSON sends booleans. "false" must stay false.
const checkbox = z.preprocess((v) => v === true || v === 'on' || v === 'true', z.boolean());

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(100),
  email: z.string().trim().email('Please enter a valid email'),
  phone: optionalText(30),
  notes: optionalText(500),
});

export const signSpecSchema = z.object({
  text: z
    .string()
    .trim()
    .min(1, 'Please enter the text for your sign')
    .refine((t) => t.split('\n').length <= MAX_SIGN_LINES, `Up to ${MAX_SIGN_LINES} lines`)
    .refine((t) => t.replace(/\n/g, '').length <= MAX_SIGN_CHARS, `Up to ${MAX_SIGN_CHARS} characters`),
  font: z.enum(FONTS),
  glowColor: z.enum(GLOW_COLOR_NAMES),
  tubeColor: z.enum(TUBE_COLORS),
  size: z.object({
    width: z.number().int().min(MIN_WIDTH).max(MAX_WIDTH),
    height: z.number().int().min(MIN_HEIGHT).max(MAX_HEIGHT),
  }),
  backing: z.enum(BACKINGS),
  location: z.enum(LOCATIONS),
});

export const signRequestSchema = contactSchema.extend({ spec: signSpecSchema });

export const logoRequestSchema = z.object({
  customerType: z.enum(['individual', 'business']),
  description: z.string().trim().min(1, 'Please describe your project').max(2000),
  size: z.enum(['sm', 'md', 'lg']),
  quantity: z.coerce.number().int().min(1).max(1000),
  deadline: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a valid date').optional(),
  ),
  firstName: z.string().trim().min(1, 'Please enter your first name').max(50),
  lastName: z.string().trim().min(1, 'Please enter your last name').max(50),
  email: z.string().trim().email('Please enter a valid email'),
  phone: optionalText(30),
  promotions: checkbox,
  smsNotifications: checkbox,
  termsAccepted: checkbox.pipe(z.literal(true, { errorMap: () => ({ message: 'Please accept the terms' }) })),
});

export type SignRequestInput = z.infer<typeof signRequestSchema>;
export type LogoRequestInput = z.infer<typeof logoRequestSchema>;

const ALLOWED_TYPES = {
  preview: ['image/png'],
  logo: ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'],
} as const;

/** Returns an error message, or null when the file is acceptable. */
export function validateUpload(file: { type: string; size: number }, kind: 'preview' | 'logo'): string | null {
  if (!(ALLOWED_TYPES[kind] as readonly string[]).includes(file.type)) {
    return kind === 'preview' ? 'Preview must be a PNG image' : 'Upload a PNG, JPG, SVG or PDF file';
  }
  if (file.size > MAX_UPLOAD_BYTES) return 'File must be 10 MB or smaller';
  return null;
}
