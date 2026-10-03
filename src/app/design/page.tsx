'use client';

import { useRef, useState } from 'react';
import { BACKINGS, FONTS, LOCATIONS, PRESET_SIZES, TUBE_COLORS, type SignSpec } from '@/config/signOptions';
import { builderFonts } from '@/config/fonts';
import { calculatePrice } from '@/lib/pricing';
import { signSpecSchema } from '@/lib/validation';
import ColorPicker from './components/ColorPicker';
import OptionGroup from './components/OptionGroup';
import SignPreview from './components/SignPreview';
import SignTextInput from './components/SignTextInput';
import SizePicker from './components/SizePicker';
import RequestForm from './RequestForm';

const initialSpec: SignSpec = {
  text: '',
  font: 'Pacifico',
  glowColor: 'Pink',
  tubeColor: 'White',
  size: { width: PRESET_SIZES[0].width, height: PRESET_SIZES[0].height },
  backing: 'Cut to Shape',
  location: 'inside',
};

export default function DesignPage() {
  const [spec, setSpec] = useState<SignSpec>(initialSpec);
  const [lit, setLit] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const set = <K extends keyof SignSpec>(k: K) => (v: SignSpec[K]) => setSpec((s) => ({ ...s, [k]: v }));
  const price = calculatePrice(spec);
  const ready = signSpecSchema.safeParse(spec).success;

  return (
    <main className="mx-auto mt-16 max-w-6xl px-4 pb-28">
      <h1 className="py-6 text-3xl font-bold text-white">Design your sign</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3 lg:sticky lg:top-20 lg:self-start">
          <SignPreview ref={previewRef} spec={spec} lit={lit} />
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={lit} onChange={(e) => setLit(e.target.checked)} className="accent-purple-500" />
            Lights on
          </label>
        </div>
        <div className="space-y-6">
          <SignTextInput value={spec.text} onChange={set('text')} />
          <OptionGroup label="Font" options={FONTS} value={spec.font} onChange={set('font')} columns={3}
            render={(f) => <span className={builderFonts[f].className}>{f}</span>} />
          <ColorPicker value={spec.glowColor} onChange={set('glowColor')} />
          <OptionGroup label="Tube color" hint="Color Matching makes the tube itself the glow color." options={TUBE_COLORS} value={spec.tubeColor} onChange={set('tubeColor')} />
          <SizePicker value={spec.size} onChange={set('size')} />
          <OptionGroup label="Backing" options={BACKINGS} value={spec.backing} onChange={set('backing')} />
          <OptionGroup label="Location" hint="Outdoor signs are weatherproofed (+10%)." options={LOCATIONS} value={spec.location} onChange={set('location')}
            render={(l) => (l === 'inside' ? 'Indoor' : 'Outdoor')} />
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 bg-gray-900/95 px-4 py-3 text-white">
        <span className="text-lg">Price: <strong>${price.toFixed(2)}</strong></span>
        <button
          type="button"
          disabled={!ready}
          onClick={() => setRequesting(true)}
          className="rounded bg-purple-600 px-5 py-2 font-semibold hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ready ? 'Request this sign' : 'Add your text to continue'}
        </button>
      </div>
      {requesting && <RequestForm spec={spec} previewRef={previewRef} onClose={() => setRequesting(false)} />}
    </main>
  );
}
