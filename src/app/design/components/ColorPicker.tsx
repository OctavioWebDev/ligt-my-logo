'use client';

import { GLOW_COLORS, type GlowColor } from '@/config/signOptions';

export default function ColorPicker({ value, onChange }: { value: GlowColor; onChange: (c: GlowColor) => void }) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-lg font-medium text-white">Glow color: <span className="text-gray-300">{value}</span></legend>
      <div className="flex flex-wrap gap-2">
        {GLOW_COLORS.map((c) => (
          <button
            key={c.name}
            type="button"
            title={c.name}
            aria-label={c.name}
            aria-pressed={c.name === value}
            onClick={() => onChange(c.name)}
            className={`h-9 w-9 rounded-full border-2 ${c.name === value ? 'border-white ring-2 ring-purple-500' : 'border-gray-600'}`}
            style={{ background: c.hex ?? 'conic-gradient(red, yellow, lime, cyan, blue, magenta, red)' }}
          />
        ))}
      </div>
    </fieldset>
  );
}
