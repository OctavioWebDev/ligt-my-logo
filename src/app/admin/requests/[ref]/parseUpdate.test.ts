import { describe, expect, it } from 'vitest';
import { parseUpdate } from './parseUpdate';

const fd = (o: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(o)) f.set(k, v);
  return f;
};

describe('parseUpdate', () => {
  it('accepts a known status and a note', () => {
    expect(parseUpdate(fd({ status: 'quoted', adminNote: 'quoted $220 on 10/5' }))).toEqual({ status: 'quoted', adminNote: 'quoted $220 on 10/5' });
  });

  it('stores an empty note as null', () => {
    expect(parseUpdate(fd({ status: 'won', adminNote: '  ' }))).toEqual({ status: 'won', adminNote: null });
  });

  it('rejects an unknown status', () => {
    expect(parseUpdate(fd({ status: 'shipped', adminNote: '' }))).toBeNull();
  });

  it('rejects a note over 2000 characters', () => {
    expect(parseUpdate(fd({ status: 'new', adminNote: 'x'.repeat(2001) }))).toBeNull();
  });
});
