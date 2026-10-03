import { describe, expect, it } from 'vitest';
import { logoReq, signReq } from '@/server/testFixtures';
import { confirmationView, isRefFormat } from './confirmation';

describe('confirmationView', () => {
  it('shows the ref, summary, price and promise for a sign', () => {
    expect(confirmationView(signReq, 'AF-1042')).toEqual({
      heading: 'Request AF-1042 received',
      summary: expect.stringContaining('Open Late'),
      price: '$219.60',
      promise: "We'll email your quote within 24 hours.",
    });
  });

  it('has no price for a logo request', () => {
    expect(confirmationView(logoReq, 'AF-1043').price).toBeNull();
  });

  it('shows a generic page for an unknown or honeypot ref', () => {
    expect(confirmationView(null, 'AF-9999').heading).toBe('Request received');
    expect(confirmationView(null, 'received')).toEqual({
      heading: 'Request received', summary: null, price: null, promise: "We'll email your quote within 24 hours.",
    });
  });

  it('never exposes contact details', () => {
    const view = JSON.stringify(confirmationView(signReq, 'AF-1042'));
    expect(view).not.toContain(signReq.email);
    expect(view).not.toContain(signReq.phone!);
  });
});

describe('isRefFormat', () => {
  it('only accepts AF- references', () => {
    expect(isRefFormat('AF-1042')).toBe(true);
    expect(isRefFormat('received')).toBe(false);
    expect(isRefFormat("AF-1' OR 1=1")).toBe(false);
  });
});
