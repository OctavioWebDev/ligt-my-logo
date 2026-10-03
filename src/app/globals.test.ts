import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

describe('globals.css', () => {
  it('loads no fonts from Google at runtime (next/font self-hosts them, and html-to-image would fetch each one)', () => {
    const css = readFileSync(path.join(__dirname, 'globals.css'), 'utf8');
    expect(css).not.toMatch(/fonts\.googleapis\.com/);
  });
});
