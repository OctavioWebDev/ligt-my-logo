export const STATUSES = ['new', 'quoted', 'won', 'lost'] as const;
export type Status = (typeof STATUSES)[number];
export const STATUS_LABELS: Record<Status, string> = { new: 'New', quoted: 'Quoted', won: 'Won', lost: 'Lost' };
export const isStatus = (v: unknown): v is Status => (STATUSES as readonly unknown[]).includes(v);
