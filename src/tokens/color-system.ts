/**
 * Color System Tokens mapped from tokens/Design-tokens.css
 * Single Source of Truth for ObiFit Color Palette
 */

export const colors = {
  primary: 'var(--primary-color)',
  onPrimary: 'var(--on-primary-color)',
  primaryContainer: 'var(--primary-container-color)',
  onPrimaryContainer: 'var(--on-primary-container-color)',
  secondary: 'var(--secondary-color)',
  onSecondary: 'var(--on-secondary-color)',
  secondaryContainer: 'var(--secondary-container-color)',
  onSecondaryContainer: 'var(--on-secondary-container-color)',
  tertiary: 'var(--tertiary-color)',
  onTertiary: 'var(--on-tertiary-color)',
  tertiaryContainer: 'var(--tertiary-container-color)',
  onTertiaryContainer: 'var(--on-tertiary-container-color)',
  error: 'var(--error-color)',
  onError: 'var(--on-error-color)',
  background: 'var(--background-color)',
  onBackground: 'var(--on-background-color)',
  surface: 'var(--surface-color)',
  onSurface: 'var(--on-surface-color)',
  surfaceVariant: 'var(--surface-variant-color)',
  onSurfaceVariant: 'var(--on-surface-variant-color)',
  outline: 'var(--outline-color)',
  outlineVariant: 'var(--outline-variant-color)',
  surfaceContainerLow: 'var(--surface-container-low-color)',
  surfaceContainer: 'var(--surface-container-color)',
  surfaceContainerHigh: 'var(--surface-container-high-color)',
} as const;

export type ColorToken = keyof typeof colors;
