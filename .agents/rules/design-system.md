---
trigger: always_on
---

### `tokens/DESIGN-SYSTEM-RULES.md`

```markdown
# Design System Enforcement & Token Rules

## Core Rule: Single Source of Truth

All design tokens—including colors, typography, spacing, radius, and elevation—are defined centrally in:
`tokens/Design-tokens.css`

---

## Token Usage & Tailwind Fallback Protocol

### 1. Primary Styling Rule (Token-First)

- All component styles must map directly to tokens configured from `tokens/Design-tokens.css`.
- Use token-backed utility classes (e.g., `bg-surface-card`, `text-primary`, `p-token-md`) over standard Tailwind defaults.

---

### 2. Tailwind Fallback Policy (Exception-Only)

- Generic Tailwind CSS / NativeWind utility classes (e.g., `p-4`, `items-center`, `flex-row`) are permitted **ONLY when a required value or token is missing** from `tokens/Design-tokens.css`.
- If a missing token is used repeatedly, it must be formally added to `tokens/Design-tokens.css` rather than hardcoded in components.

---

### 3. Strictly Banned Practices

- **Inline Styles:** `style={{ ... }}` is strictly forbidden for design properties.
- **Arbitrary Values:** Raw hex codes or arbitrary values (e.g., `bg-[#E16C38]`, `p-[13px]`, `w-[310px]`) are prohibited.
- **Hardcoded Elevation & Fonts:** Manual shadow calculations or custom font calls outside `tokens/Design-tokens.css` are not allowed.

---

## Token Reference Mapping

| Token Category | CSS Source (`tokens/Design-tokens.css`) | Permitted Component Usage                              | Fallback Condition                                           |
| :------------- | :-------------------------------------- | :----------------------------------------------------- | :----------------------------------------------------------- |
| **Colors**     | `--color-surface-*`, `--color-text-*`   | Token classes (`bg-surface-primary`, `text-text-main`) | Standard Tailwind colors if token is absent                  |
| **Typography** | `--font-body-*`, `--font-heading-*`     | Token classes (`text-body-md`, `font-heading-lg`)      | Default Tailwind font sizes if token is absent               |
| **Spacing**    | `--spacing-xs` through `--spacing-xl`   | Token spacing (`p-token-sm`, `gap-token-md`)           | Utility classes (`p-4`, `gap-2`) if missing from token file  |
| **Elevation**  | `--elevation-low`, `--elevation-high`   | `shadow-elevation-low`, `shadow-elevation-high`        | Default `shadow-sm` / `shadow-md` if missing from token file |
| **Radius**     | `--radius-card`, `--radius-button`      | `rounded-card`, `rounded-button`                       | Tailwind radius (`rounded-lg`) if missing from token file    |

---

## Updated Component Verification Checklist

- [ ] Properties leverage tokens declared in `tokens/Design-tokens.css`.
- [ ] Standard Tailwind utilities are used **only** as fallbacks for missing design system tokens.
- [ ] Zero arbitrary values (`[#...]`, `[...px]`) or inline `style={{}}` attributes exist in the file.
- [ ] Interactive touch targets maintain a minimum size of `44x44px`.
```
