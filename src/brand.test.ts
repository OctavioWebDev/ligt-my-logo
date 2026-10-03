import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const OLD_BRAND = /scotty|sbled|light my logo/i;

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return sourceFiles(full);
    return /\.(tsx?|jsx?|css)$/.test(name) && !/\.test\.tsx?$/.test(name) ? [full] : [];
  });
}

describe('branding', () => {
  it('never mentions the previous business', () => {
    const offenders = sourceFiles(path.join(__dirname)).filter((f) => OLD_BRAND.test(readFileSync(f, 'utf8')));
    expect(offenders).toEqual([]);
  });

  it('does not ship the previous business photos or logo', () => {
    const publicDir = path.join(__dirname, '..', 'public');
    const leftovers = ['pictures', 'videos', 'logo/SBLEDSLogo.png'].filter((p) => {
      try { statSync(path.join(publicDir, p)); return true; } catch { return false; }
    });
    expect(leftovers).toEqual([]);
  });
});
