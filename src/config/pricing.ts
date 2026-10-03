import type { Backing } from './signOptions';

export type PricingRates = {
  perSquareInch: number;
  outsideMultiplier: number;
  backing: Record<Backing, number>;
  rgbSurcharge: number;
  minimumPrice: number;
};

export const pricing: PricingRates = {
  perSquareInch: 0.6, // USD, applied to width × height in inches
  outsideMultiplier: 1.1, // +10% for outdoor signs
  backing: { 'Cut to Shape': 0, 'Full Board': 0, 'Hollow-Out': 0, Stand: 0 }, // flat USD add-ons
  rgbSurcharge: 0, // flat USD add-on when glow color is RGB
  minimumPrice: 0, // floor in USD
};
