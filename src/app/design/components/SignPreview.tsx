'use client';

import { forwardRef } from 'react';
import { builderFonts } from '@/config/fonts';
import { GLOW_COLORS, type SignSpec } from '@/config/signOptions';

type Props = { spec: SignSpec; lit: boolean };

const SignPreview = forwardRef<HTMLDivElement, Props>(function SignPreview({ spec, lit }, ref) {
  const hex = GLOW_COLORS.find((c) => c.name === spec.glowColor)?.hex ?? null;
  const isRgb = hex === null;
  const glow = isRgb ? '#ff00ff' : hex;
  const textColor = spec.tubeColor === 'Color Matching' && !isRgb ? glow : '#ffffff';
  const shadow = lit ? `0 0 6px ${glow}, 0 0 14px ${glow}, 0 0 28px ${glow}, 0 0 48px ${glow}` : 'none';

  return (
    <div ref={ref} className="flex aspect-[16/9] w-full items-center justify-center rounded-lg bg-gray-950 p-6">
      <p
        className={`${builderFonts[spec.font].className} whitespace-pre-line text-center text-4xl leading-tight md:text-6xl ${isRgb && lit ? 'rgb-glow' : ''}`}
        style={{ color: textColor, textShadow: shadow }}
      >
        {spec.text || 'Your text here'}
      </p>
    </div>
  );
});

export default SignPreview;
