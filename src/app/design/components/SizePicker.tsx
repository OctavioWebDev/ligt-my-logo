'use client';

import { heightForWidth, MAX_WIDTH, MIN_WIDTH, PRESET_SIZES } from '@/config/signOptions';

type Size = { width: number; height: number };

export default function SizePicker({ value, onChange }: { value: Size; onChange: (s: Size) => void }) {
  const preset = PRESET_SIZES.find((p) => p.width === value.width && p.height === value.height);
  return (
    <fieldset className="space-y-3">
      <legend className="text-lg font-medium text-white">Size: <span className="text-gray-300">{value.width}″ × {value.height}″</span></legend>
      <div className="grid grid-cols-3 gap-2">
        {PRESET_SIZES.map((p) => (
          <button
            key={p.label}
            type="button"
            aria-pressed={preset?.label === p.label}
            onClick={() => onChange({ width: p.width, height: p.height })}
            className={`rounded border px-3 py-2 text-white ${preset?.label === p.label ? 'border-purple-500 bg-purple-700' : 'border-gray-500 hover:bg-purple-600/40'}`}
          >
            {p.label} {p.width}×{p.height}
          </button>
        ))}
      </div>
      <label className="block text-sm text-gray-300">
        Custom width (inches)
        <input
          type="range"
          min={MIN_WIDTH}
          max={MAX_WIDTH}
          value={value.width}
          onChange={(e) => {
            const width = Number(e.target.value);
            onChange({ width, height: heightForWidth(width) });
          }}
          className="mt-2 w-full accent-purple-500"
        />
      </label>
    </fieldset>
  );
}
