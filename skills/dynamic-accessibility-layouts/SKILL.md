# SKILL: Dynamic Accessibility & Font Scaling Engine

## Context & Objectives

Guarantee layout stability, touch usability, and WCAG AA compliance across varied device screen sizes and system font accessibility settings.

## Execution Rules

1. **Touch Target Enforcement:**
   - Every pressable element must have a minimum hit target of `44px x 44px` enforced via NativeWind utilities (`min-h-[44px] min-w-[44px]`) or `hitSlop` props.

2. **Fluid Font Scaling:**
   - Design card layouts and containers using flexible bounds (`flex-shrink`, flex wrapping) to prevent text truncation or visual clipping when system font scale exceeds 100%.

3. **Contrast Compliance:**
   - All text and background class pairs from `tokens/color-system` must maintain a contrast ratio of at least **4.5:1** for body text and **3:1** for large headers.
