'use client';

type Props<T extends string> = {
  label: string;
  hint?: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  render?: (v: T) => React.ReactNode;
  columns?: 2 | 3 | 4;
};

export default function OptionGroup<T extends string>({ label, hint, options, value, onChange, render, columns = 2 }: Props<T>) {
  const cols = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4' }[columns];
  return (
    <fieldset className="space-y-2">
      <legend className="text-lg font-medium text-white">{label}</legend>
      {hint && <p className="text-sm text-gray-400">{hint}</p>}
      <div className={`grid gap-2 ${cols}`}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={o === value}
            onClick={() => onChange(o)}
            className={`rounded border px-3 py-2 text-center text-white transition ${
              o === value ? 'border-purple-500 bg-purple-700' : 'border-gray-500 hover:bg-purple-600/40'
            }`}
          >
            {render ? render(o) : o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
