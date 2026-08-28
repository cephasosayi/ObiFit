/**
 * ObiFit Design System Tokens (Inspired by @[Inspiration] & @[Mannequin])
 * Ultra-Premium Dark Aesthetic, Electric Crimson Red, High-Energy Lime, and Muscle Glow Orange
 */

export const colors = {
  // Brand & Accent Colors
  primary: '#F72545', // Electric Neon Crimson Red
  onPrimary: '#FFFFFF',
  primaryContainer: '#2B0E13',
  onPrimaryContainer: '#FFD7DC',

  accentLime: '#CCFF00', // High-Energy Electric Lime
  onAccentLime: '#000000',
  
  neonOrange: '#FF5500', // Muscle Glow & Rest Timer Neon Orange
  onNeonOrange: '#FFFFFF',

  // Dark Theme Studio Backgrounds & Surfaces
  background: '#0B0B0E',
  onBackground: '#F4F4F6',
  surface: '#121216',
  onSurface: '#F4F4F6',
  surfaceVariant: '#1A1A20',
  onSurfaceVariant: '#A0A0B0',
  
  surfaceContainerLow: '#141418',
  surfaceContainer: '#1B1B22',
  surfaceContainerHigh: '#24242E',
  surfaceContainerHighest: '#30303D',

  // Outlines & Utility
  outline: '#3E3E4C',
  outlineVariant: '#2A2A36',
  error: '#FF453A',
} as const;

export type ColorToken = keyof typeof colors;
