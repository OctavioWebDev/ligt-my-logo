import type { QuoteRequest } from '@prisma/client';
import { Resend } from 'resend';
import { siteConfig } from '@/config/site';
import { formatPrice, summarize } from '@/lib/format';

const TEST_SENDER = `${siteConfig.name} <onboarding@resend.dev>`;

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function row(label: string, value: string | null | undefined): string {
  return value ? `<tr><td style="padding:4px 12px 4px 0;color:#666">${label}</td><td>${escapeHtml(value)}</td></tr>` : '';
}

function detailRows(req: QuoteRequest): string {
  return Object.entries(req.details as Record<string, unknown>)
    .map(([k, v]) => row(k, typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)))
    .join('');
}

function imageBlock(req: QuoteRequest): string {
  if (!req.imageUrl) return '';
  const url = escapeHtml(req.imageUrl);
  return /\.(png|jpe?g)$/i.test(new URL(req.imageUrl).pathname)
    ? `<p><img src="${url}" alt="Design" style="max-width:100%;border-radius:8px"></p>`
    : `<p><a href="${url}">Download the uploaded file</a></p>`;
}

export function renderOwnerEmail(req: QuoteRequest, adminUrl: string): { subject: string; html: string } {
  const subject =
    req.type === 'sign'
      ? `New sign request ${req.ref}: ${formatPrice(req.priceCents)}`
      : `New logo request ${req.ref}`;
  const link = `${adminUrl}/admin/requests/${req.ref}`;
  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <p>${escapeHtml(summarize(req))}</p>
    ${imageBlock(req)}
    <table>
      ${row('Name', req.name)}${row('Email', req.email)}${row('Phone', req.phone)}
      ${row('Notes', req.notes)}${req.priceCents !== null ? row('Price', formatPrice(req.priceCents)) : ''}
      ${detailRows(req)}
    </table>
    <p><a href="${escapeHtml(link)}">Open ${escapeHtml(req.ref)} in the admin page</a></p>`;
  return { subject, html };
}

export function renderCustomerEmail(req: QuoteRequest): { subject: string; html: string } {
  const subject = `We got your request ${req.ref}`;
  const html = `
    <h2>Thanks, ${escapeHtml(req.name)}!</h2>
    <p>We received your ${req.type === 'sign' ? 'sign' : 'logo'} request <strong>${escapeHtml(req.ref)}</strong>.</p>
    <p>${escapeHtml(summarize(req))}</p>
    ${req.priceCents !== null ? `<p>Price: <strong>${formatPrice(req.priceCents)}</strong></p>` : ''}
    <p>${siteConfig.quotePromise}</p>
    <p>— ${siteConfig.name}</p>`;
  return { subject, html };
}

function client(): Resend {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY is not set');
  return new Resend(key);
}

async function send(to: string, { subject, html }: { subject: string; html: string }, from: string): Promise<void> {
  const { error } = await client().emails.send({ from, to, subject, html });
  if (error) throw new Error(`${error.name}: ${error.message}`);
}

function adminBaseUrl(): string {
  const host = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  return host ? `https://${host}` : 'http://localhost:3000';
}

export async function sendOwnerNotification(req: QuoteRequest): Promise<void> {
  const to = process.env.NOTIFY_EMAIL;
  if (!to) throw new Error('NOTIFY_EMAIL is not set');
  await send(to, renderOwnerEmail(req, adminBaseUrl()), process.env.RESEND_FROM || TEST_SENDER);
}

/** Customer emails need a verified sending domain, so they are off until RESEND_FROM is set. */
export async function sendCustomerConfirmation(req: QuoteRequest): Promise<void> {
  const from = process.env.RESEND_FROM;
  if (!from) return;
  await send(req.email, renderCustomerEmail(req), from);
}
