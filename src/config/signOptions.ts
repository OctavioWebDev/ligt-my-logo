export const FONTS = [
  'Allura', 'Cookie', 'Lobster', 'Monoton', 'Pacifico', 'Parisienne', 'Playball',
  'Ranchers', 'Righteous', 'Sacramento', 'Satisfy', 'Tangerine', 'Yellowtail',
] as const;
export type Font = (typeof FONTS)[number];

export const GLOW_COLORS = [
  { name: 'Gold', hex: '#FFD700' },
  { name: 'Pink', hex: '#FF69B4' },
  { name: 'Light Blue', hex: '#ADD8E6' },
  { name: 'Violet', hex: '#8F00FF' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Light Pink', hex: '#FFC0CB' },
  { name: 'Red', hex: '#FF0000' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Blue-Green', hex: '#0D98BA' },
  { name: 'Navy', hex: '#00008B' },
  { name: 'Lemon', hex: '#FAFA33' },
  { name: 'Cream', hex: '#FFFDD0' },
  { name: 'Light Green', hex: '#90EE90' },
  { name: 'RGB', hex: null },
] as const;
export type GlowColor = (typeof GLOW_COLORS)[number]['name'];
export const GLOW_COLOR_NAMES = GLOW_COLORS.map((c) => c.name) as unknown as readonly [GlowColor, ...GlowColor[]];

export const TUBE_COLORS = ['White', 'Color Matching'] as const;
export type TubeColor = (typeof TUBE_COLORS)[number];

export const BACKINGS = ['Cut to Shape', 'Full Board', 'Hollow-Out', 'Stand'] as const;
export type Backing = (typeof BACKINGS)[number];

export const LOCATIONS = ['inside', 'outside'] as const;
export type Location = (typeof LOCATIONS)[number];

export const PRESET_SIZES = [
  { label: 'Small', width: 10, height: 3 },
  { label: 'Medium', width: 13, height: 4 },
  { label: 'Large', width: 21, height: 6 },
] as const;

export const MIN_WIDTH = 10;
export const MAX_WIDTH = 118;
export const MIN_HEIGHT = 3;
export const MAX_HEIGHT = 37;

/** Custom sizes derive height from width, as the original builder did. */
export function heightForWidth(width: number): number {
  return Math.min(Math.max(3 + Math.floor((width - 10) / 3), MIN_HEIGHT), MAX_HEIGHT);
}

export type SignSpec = {
  text: string;
  font: Font;
  glowColor: GlowColor;
  tubeColor: TubeColor;
  size: { width: number; height: number };
  backing: Backing;
  location: Location;
};
