'use client';

import { MAX_SIGN_CHARS, MAX_SIGN_LINES } from '@/lib/validation';

export default function SignTextInput({ value, onChange }: { value: string; onChange: (t: string) => void }) {
  const chars = value.replace(/\n/g, '').length;
  return (
    <label className="block space-y-2">
      <span className="text-lg font-medium text-white">Your text</span>
      <textarea
        rows={MAX_SIGN_LINES}
        value={value}
        placeholder="Type your sign text"
        onChange={(e) => {
          const next = e.target.value;
          if (next.split('\n').length > MAX_SIGN_LINES) return;
          if (next.replace(/\n/g, '').length > MAX_SIGN_CHARS) return;
          onChange(next);
        }}
        className="block w-full resize-none rounded border border-gray-500 bg-transparent p-3 text-white"
      />
      <span className="block text-right text-xs text-gray-400">{chars}/{MAX_SIGN_CHARS} · up to {MAX_SIGN_LINES} lines</span>
    </label>
  );
}
