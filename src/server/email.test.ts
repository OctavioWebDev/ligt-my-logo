import { describe, expect, it } from 'vitest';
import { renderCustomerEmail, renderOwnerEmail } from './email';
import { logoReq, signReq } from './testFixtures';

describe('renderOwnerEmail', () => {
  it('puts the type, ref and price in the subject', () => {
    expect(renderOwnerEmail(signReq, 'https://x').subject).toBe('New sign request AF-1042: $219.60');
    expect(renderOwnerEmail(logoReq, 'https://x').subject).toBe('New logo request AF-1043');
  });

  it('links to the admin detail page', () => {
    expect(renderOwnerEmail(signReq, 'https://x').html).toContain('https://x/admin/requests/AF-1042');
  });

  it('never puts the private Blob URL in the email, and says the design is attached', () => {
    const { html } = renderOwnerEmail(signReq, 'https://x');
    expect(html).not.toContain('blob.example');
    expect(html).toContain('attached');
  });

  it('escapes customer-supplied text', () => {
    const { html } = renderOwnerEmail(signReq, 'https://x');
    expect(html).toContain('Ana &lt;Ruiz&gt;');
    expect(html).not.toContain('Ana <Ruiz>');
  });
});

describe('renderCustomerEmail', () => {
  it('confirms the ref and states the quote promise', () => {
    const { subject, html } = renderCustomerEmail(signReq);
    expect(subject).toBe('We got your request AF-1042');
    expect(html).toContain("We'll email your quote within 24 hours.");
    expect(html).toContain('$219.60');
  });

  it('never mentions the old brand', () => {
    expect(renderCustomerEmail(signReq).html).not.toMatch(/scotty|light my logo/i);
  });
});
