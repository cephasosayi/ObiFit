/**
 * Design System Color Tokens (ObiFit Single Source of Truth)
 * Directly extracted from Tokens/design-tokens.json
 */

export const colors = {
  // Brand & Primary
  primary: '#F72545', // hsl(356, 94%, 56%)
  onPrimary: '#FFFFFF',
  primaryContainer: '#E13845',
  onPrimaryContainer: '#FFDAD6',

  // Secondary & Tertiary
  secondary: '#8C4A45',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#3C2D2B',
  onSecondaryContainer: '#FFDAD6',

  tertiary: '#E5A93C',
  onTertiary: '#1F1300',
  tertiaryContainer: '#453000',
  onTertiaryContainer: '#FFDF9E',

  // Dark Theme Surfaces & Backgrounds
  background: '#121214',
  onBackground: '#EAE0DF',
  surface: '#121214',
  onSurface: '#EAE0DF',
  surfaceVariant: '#382E2D',
  onSurfaceVariant: '#D8C2C0',
  surfaceContainerLow: '#1A1A1E',
  surfaceContainer: '#222226',
  surfaceContainerHigh: '#2B2B30',
  surfaceContainerHighest: '#36363C',

  // Borders & Outlines
  outline: '#857371',
  outlineVariant: '#4F4342',
  error: '#FF5449',
} as const;

export type ColorToken = keyof typeof colors;
