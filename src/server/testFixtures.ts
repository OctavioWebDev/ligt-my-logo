import type { QuoteRequest } from '@prisma/client';

export const signReq: QuoteRequest = {
  id: 42,
  ref: 'AF-1042',
  type: 'sign',
  status: 'new',
  name: 'Ana <Ruiz>',
  email: 'ana@x.com',
  phone: '419-555-0100',
  notes: 'For the back wall',
  details: {
    text: 'Open Late',
    font: 'Pacifico',
    glowColor: 'Pink',
    tubeColor: 'White',
    size: { width: 13, height: 4 },
    backing: 'Cut to Shape',
    location: 'inside',
  },
  priceCents: 21960,
  imageUrl: 'https://blob.example/requests/AF-1042/preview.png',
  adminNote: null,
  emailError: null,
  ipHash: 'h',
  viewToken: 'secret-token',
  createdAt: new Date('2026-10-02T12:00:00Z'),
  updatedAt: new Date('2026-10-02T12:00:00Z'),
};

export const logoReq: QuoteRequest = {
  ...signReq,
  id: 43,
  ref: 'AF-1043',
  type: 'logo',
  notes: 'Our cafe logo',
  details: { customerType: 'business', size: 'md', quantity: 2, deadline: '2026-11-01', promotions: false, smsNotifications: false },
  priceCents: null,
  imageUrl: 'https://blob.example/requests/AF-1043/logo.pdf',
};
