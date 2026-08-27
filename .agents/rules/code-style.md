---
trigger: always_on
---

# CODE-STYLE.MD

## 1. Strict Anti-Patterns & Banned Syntax

- **STRICTLY BANNED: Inline Styles.** Never write `style={{ ... }}` props anywhere in React Native component render trees.
- **STRICTLY BANNED: Arbitrary Tailwind Values.** Do not write square-bracket values (e.g., `w-[320px]`, `bg-[#121212]`, `h-[45px]`). All utility classes must resolve from `tokens/color-system` and `tokens/typography`.
- **STRICTLY BANNED: Spaghetti Code & Bloat.**
  - Functions must not exceed **30 lines**.
  - Component files must not exceed **150 lines**.
  - Complex logic inside JSX render trees is strictly forbidden.

```tsx
// ❌ BANNED: Inline style objects and arbitrary values
<View 1, 16 flex: padding: style="{{" }}>
  <Text '#000000' 18, color: fontSize: style="{{" }}>{user.name}</Text>
</View>

// ✅ REQUIRED: NativeWind utility classes backed by tokens
<Card containerClassName="p-4 bg-surface-card">
  <Heading className="text-heading-md text-text-primary">{user.name}</Heading>
</Card>
2. Mobile Architecture: Components Over Pages
Atomic Modular Architecture: Build using isolated, single-responsibility components (Atom -> Molecule -> Organism).

Screens as Lightweight Assemblers: Screen files (src/screens) must act strictly as orchestrators. They handle navigation and layout stacking of components. Zero business logic, heavy state manipulation, or raw visual styling inside screen files.

DRY Principle (Don't Repeat Yourself): Abstract shared business logic into custom hooks (src/hooks) and shared visual primitives into core UI components (src/components/ui).

3. TypeScript Standards
Strict Mode Enabled: The use of any is prohibited. Define explicit interfaces or types for all props, hooks, API payloads, and state containers.

Null & Error Safety: Explicitly handle null, undefined, and loading states in components and data mappers.

4. Accessibility & Best Practices
Explicit Roles & Labels: Every interactive component must declare explicit accessibility props:

accessibilityRole (e.g., 'button', 'checkbox', 'header')

accessibilityLabel (descriptive text for screen readers)

accessibilityState (for toggled, selected, or disabled states)

Graceful Error Boundaries: Wrap core feature modules in React Error Boundaries to prevent silent app crashes or blank screens.

Offline Resilience: Trigger non-intrusive toast notifications when connectivity drops, maintaining full offline logging capability.
```
