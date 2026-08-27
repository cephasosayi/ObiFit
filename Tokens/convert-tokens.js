const fs = require('fs');
const path = require('path');

/**
 * Script to convert design-tokens.json into usable CSS custom properties (variables).
 */

function formatVarName(key) {
  // Replace dots with hyphens for clean CSS variable names (e.g. spacing-0.5 -> spacing-0-5)
  const sanitized = key.replace(/\./g, '-');
  return `--${sanitized}`;
}

function convertTokensToCSS(tokens) {
  const cssLines = [];

  cssLines.push('/**');
  cssLines.push(' * Auto-generated CSS Design Tokens');
  cssLines.push(' * Source: Tokens/design-tokens.json');
  cssLines.push(' * Generated on: ' + new Date().toISOString());
  cssLines.push(' */');
  cssLines.push('');

  // 1. Root variables (Light theme colors + Typography + Spacing + Radius + Shadows + Elevation)
  cssLines.push(':root {');

  // Colors - Light
  if (tokens.color && tokens.color.light) {
    cssLines.push('  /* Color Tokens - Light Theme */');
    for (const [key, value] of Object.entries(tokens.color.light)) {
      cssLines.push(`  ${formatVarName(key)}: ${value};`);
    }
    cssLines.push('');
  }

  // Typography
  if (tokens.typography) {
    cssLines.push('  /* Typography Tokens */');
    for (const [key, value] of Object.entries(tokens.typography)) {
      const formattedVal = typeof value === 'string' && !value.includes('rem') && !value.includes('em') && !value.includes('px') && isNaN(value)
        ? `"${value}"`
        : value;
      cssLines.push(`  ${formatVarName(key)}: ${formattedVal};`);
    }
    cssLines.push('');
  }

  // Spacing
  if (tokens.spacing) {
    cssLines.push('  /* Spacing Tokens */');
    for (const [key, value] of Object.entries(tokens.spacing)) {
      cssLines.push(`  ${formatVarName(key)}: ${value};`);
    }
    cssLines.push('');
  }

  // Border Radius
  if (tokens.borderRadius) {
    cssLines.push('  /* Border Radius Tokens */');
    for (const [key, value] of Object.entries(tokens.borderRadius)) {
      cssLines.push(`  ${formatVarName(key)}: ${value};`);
    }
    cssLines.push('');
  }

  // Shadows
  if (tokens.shadows) {
    cssLines.push('  /* Shadow Tokens */');
    for (const [key, value] of Object.entries(tokens.shadows)) {
      cssLines.push(`  ${formatVarName(key)}: ${value};`);
    }
    cssLines.push('');
  }

  // Elevation
  if (tokens.elevation) {
    cssLines.push('  /* Elevation Tokens */');
    for (const [key, value] of Object.entries(tokens.elevation)) {
      cssLines.push(`  ${formatVarName(key)}: ${value};`);
    }
  }

  cssLines.push('}');
  cssLines.push('');

  // 2. Dark Theme Color Tokens
  if (tokens.color && tokens.color.dark) {
    const darkColorLines = [];
    darkColorLines.push('  /* Color Tokens - Dark Theme Overrides */');
    for (const [key, value] of Object.entries(tokens.color.dark)) {
      darkColorLines.push(`  ${formatVarName(key)}: ${value};`);
    }

    // Media query for system dark mode preference
    cssLines.push('@media (prefers-color-scheme: dark) {');
    cssLines.push('  :root {');
    cssLines.push(...darkColorLines);
    cssLines.push('  }');
    cssLines.push('}');
    cssLines.push('');

    // Explicit class & data-attribute overrides for manual dark mode toggling
    cssLines.push('[data-theme="dark"], .dark {');
    cssLines.push(...darkColorLines);
    cssLines.push('}');
    cssLines.push('');
  }

  return cssLines.join('\n');
}

function main() {
  const args = process.argv.slice(2);
  const inputPath = args[0] || path.join(__dirname, 'design-tokens.json');
  const outputPath = args[1] || path.join(__dirname, 'tokens.css');

  console.log(`Reading design tokens from: ${inputPath}`);

  try {
    const rawData = fs.readFileSync(inputPath, 'utf8');
    const tokens = JSON.parse(rawData);

    const cssContent = convertTokensToCSS(tokens);

    fs.writeFileSync(outputPath, cssContent, 'utf8');
    console.log(`Successfully generated CSS tokens at: ${outputPath}`);
  } catch (error) {
    console.error('Error converting design tokens:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { convertTokensToCSS, formatVarName };
