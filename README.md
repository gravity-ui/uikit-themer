# @gravity-ui/gravity-themer &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/uikit-themer)](https://www.npmjs.com/package/@gravity-ui/uikit-themer) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit-themer/.github/workflows/ci.yml?label=CI&logo=github)](https://github.com/gravity-ui/uikit-themer/actions/workflows/ci.yml?query=branch:main)

A library for manipulating themes for the `@gravity-ui/uikit` library. Allows you to parse existing themes and generate new ones using a convenient API.

## Features

- 🎨 **Theme Generation** - create new themes for Gravity UI
- 📖 **Theme Parsing** - analyze existing themes in CSS and JSON formats
- 🔄 **Conversion** - transform between CSS and JSON formats
- 🎨 **Color Management** - work with private and utility colors
- ✍️ **Typography** - configure fonts and text styles
- 📏 **Borders** - manage border radius

## Installation

```shell
npm install @gravity-ui/gravity-themer
```

## Basic Usage

### Theme Generation

Theme generation functions require a complete theme object. For convenience, you can use `DEFAULT_THEME` and override the necessary parameters.

⚠️ **Note**: When modifying base colors, use `updateBaseColor` instead of direct manipulation to ensure private colors are properly regenerated.

```typescript
import { generateCSS, generateJSON, updateBaseColor, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Recommended: Use updateBaseColor for modifying colors
const themeWithCustomColors = updateBaseColor({
  theme: DEFAULT_THEME,
  colorToken: 'brand',
  value: {
    dark: '#007AFF',
    light: '#007AFF'
  }
});

// Generate CSS theme
const cssTheme = generateCSS({
  theme: themeWithCustomColors
});

// Generate JSON theme with typography changes
const jsonTheme = generateJSON({
  theme: {
    ...DEFAULT_THEME,
    typography: {
      ...DEFAULT_THEME.typography,
      fontFamilies: {
        ...DEFAULT_THEME.typography.fontFamilies,
        sans: {
          mainFont: 'SF Pro Text',
          fallbackFonts: ['Arial'],
        },
      }
    }
  }
});
```

### Parsing Existing Theme

```typescript
import { parseCSS, parseJSON } from '@gravity-ui/gravity-themer';

// Parse CSS theme to internal GravityTheme
const parsedCssTheme = parseCSS(cssString);

// Parse JSON theme to internal GravityTheme
const parsedJsonTheme = parseJSON(jsonString);
```

### Converting Between Formats

```typescript
import { convertCSStoJSON, convertJSONtoCSS } from '@gravity-ui/gravity-themer';

// Convert CSS to JSON
const jsonFromCss = convertCSStoJSON(cssTheme);

// Convert JSON to CSS
const cssFromJson = convertJSONtoCSS(jsonTheme);
```

## API Reference

### Default Theme

The library provides a `DEFAULT_THEME` constant that contains all the default values for a complete Gravity UI theme. This is the recommended starting point for creating custom themes.

⚠️ **Important**: When modifying `baseColors`, use the `updateBaseColor` function instead of direct manipulation to ensure private colors are properly regenerated.

```typescript
import { DEFAULT_THEME, updateBaseColor } from '@gravity-ui/gravity-themer';
import type { GravityTheme } from '@gravity-ui/gravity-themer';

// Recommended: Use updateBaseColor for base color changes
const customTheme: GravityTheme = updateBaseColor({
  theme: DEFAULT_THEME,
  colorToken: 'brand',
  value: {
    dark: '#FF3B30',
    light: '#FF3B30'
  }
});

// For other theme parts, direct modification is fine
const themeWithCustomTypography: GravityTheme = {
  ...customTheme,
  typography: {
    ...customTheme.typography,
    // typography modifications...
  }
};
```

### Color Utilities

```typescript
import {
  isColorCssVariable,
  isUtilityColorCssVariable,
  isPrivateColorCssVariable,
  parsePrivateColorCssVariable,
  createPrivateColorCssVariable,
  createUtilityColorCssVariable,
  getUtilityColorTypeFromCssVariable,
  updateBaseColor
} from '@gravity-ui/gravity-themer';

// Check CSS variable type
const isColor = isColorCssVariable('--g-color-base-brand');
const isUtility = isUtilityColorCssVariable('--g-color-text-primary');
const isPrivate = isPrivateColorCssVariable('--g-private-color-red-500');

// Parse private color variable
const {mainColorToken, privateColorToken} = parsePrivateColorCssVariable('--g-private-color-red-500');

// Create color variables
createPrivateColorCssVariable('brand', '200-solid') === '--g-color-private-brand-200-solid'
createUtilityColorCssVariable('text-link-visited') === '--g-color-text-link-visited'

// Get utility color type
getUtilityColorTypeFromCssVariable('--g-color-text-link-hover') === 'text-link-hover'
```

#### Updating Base Colors

⚠️ **Important**: Always use `updateBaseColor` when modifying base colors to ensure proper regeneration of private colors.

```typescript
import { updateBaseColor, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Update base color for a single theme variant
const updatedTheme = updateBaseColor({
  theme: DEFAULT_THEME,
  colorToken: 'brand',
  themeVariant: 'light',
  value: '#007AFF',
});

// Update base color for both theme variants
const updatedBothThemes = updateBaseColor({
  theme: DEFAULT_THEME,
  colorToken: 'brand',
  value: {
    light: '#007AFF',
    dark: '#0056CC',
  },
});

// Create a new color token
const newColorTheme = updateBaseColor({
  theme: DEFAULT_THEME,
  colorToken: 'custom-accent',
  value: {
    light: '#FF6B35',
    dark: '#FF8C5A',
  },
});
```

The `updateBaseColor` function:

- Updates the base color in `baseColors`
- Automatically regenerates corresponding private colors
- Maintains theme immutability (returns a new theme object)
- Handles both existing and new color tokens
- Supports updating single theme variant or both variants simultaneously

**Why use `updateBaseColor`?**

Direct modification of `baseColors` without regenerating private colors can lead to inconsistent themes. Private colors are calculated from base colors and are used throughout the UI components. The `updateBaseColor` function ensures that:

1. Base colors are properly updated
2. Private colors are regenerated with the new base color
3. The theme remains internally consistent
4. All color dependencies are maintained

### Typography

Working with fonts and text styles.

```typescript
import {
  isTextCssVariable,
  isFontCssVariable,
  createFontCssVariable,
  createTextCssVariable,
  getKeyFromCssFontVariable,
  parseTextCssVariable,
  generateCssFontFamily,
  TEXT_VARIANTS,
  TEXT_GROUP_PROPERTIES,
  TEXT_VARIANT_PROPERTIES
} from '@gravity-ui/gravity-themer';
import type {
  TypographyOptions,
  TextGroup,
  TextVariant,
  FontOptions
} from '@gravity-ui/gravity-themer';

// Check typography CSS variables
const isText = isTextCssVariable('--g-text-body-1-font-size');
const isFont = isFontCssVariable('--g-font-family-sans');

// Create typography variables
createFontCssVariable('additional') === '--g-font-family-additional';

createTextCssVariable({
    variant: 'body-1',
    property: 'font-size'
}) === '--g-text-body-1-font-size'

// Utilities
getKeyFromCssFontVariable('--g-font-family-sans') === 'sans'

parseTextCssVariable('--g-text-body-1-font-size') === {
    "group": "body",
    "variant": "body-1",
    "property": "font-size"
}

generateCssFontFamily({
    "mainFont": "SF Pro Text",
    "fallbackFonts": ["Arial", "sans-serif"]
}) === "'SF Pro Text', 'Arial', 'sans-serif'"

// Constants
console.log(TEXT_VARIANTS); // All available text variants
console.log(TEXT_GROUP_PROPERTIES); // Text group properties
console.log(TEXT_VARIANT_PROPERTIES); // Text variant properties
```

**Typography Types:**

- `TypographyOptions` - typography options
- `TextGroup` - text group (body, header, display, etc.)
- `TextVariant` - text variant
- `TextBodyVariant`, `TextCaptionVariant`, `TextHeaderVariant` - specific variants
- `FontOptions` - font options

### Borders

Working with border radius.

```typescript
import {
  isBorderRadiusCssVariable,
  createBorderRadiusCssVariable,
  BORDER_SIZES
} from '@gravity-ui/gravity-themer';
import type { BorderSize } from '@gravity-ui/gravity-themer';

// Check border radius variable
const isBorderRadius = isBorderRadiusCssVariable('--g-border-radius-m');

// Create border radius variable
const borderVar = createBorderRadiusCssVariable('m');

// Available border sizes
console.log(BORDER_SIZES); // ['xs', 's', 'm', 'l', 'xl']
```

### Working with JSON Themes

```typescript
import {
  generateJSON,
  parseJSON,
  isValueWithReference,
  isThemizedValueWithReference
} from '@gravity-ui/gravity-themer';
import type {
  JsonTheme,
  ThemizedValueWithReference,
  ValueWithReference
} from '@gravity-ui/gravity-themer';

// Check values with references
const hasRef = isValueWithReference(value);
const hasThemizedRef = isThemizedValueWithReference(value);
```

**JSON Types:**

- `JsonTheme` - JSON representation of theme
- `ThemizedValueWithReference` - value with themized reference
- `ValueWithReference` - value with reference

### Core Types

```typescript
import type {
  GravityTheme,
  PrivateColorOptions,
  PrivateColors,
  BaseColors,
  ThemizedColorOptions,
  ColorOptions,
  Theme
} from '@gravity-ui/gravity-themer';
```

- `GravityTheme` - main internal Gravity UI theme type
- `PrivateColorOptions` - private color options
- `PrivateColors` - private colors
- `BaseColors` - base colors
- `ThemizedColorOptions` - themized color options
- `ColorOptions` - general color options
- `Theme` - universal theme type (`light` | `dark`)

## Examples

### Creating a Custom Theme

```typescript
import { generateCSS, updateBaseColor, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Recommended: Use updateBaseColor to modify base colors
const themeWithCustomBrand = updateBaseColor({
  theme: DEFAULT_THEME,
  colorToken: 'brand',
  value: {
    dark: '#007AFF',
    light: '#007AFF'
  }
});

const customTheme = generateCSS({
  theme: {
    ...themeWithCustomBrand,
    typography: {
      ...themeWithCustomBrand.typography,
      fontFamilies: {
        ...themeWithCustomBrand.typography.fontFamilies,
        sans: {
          mainFont: 'SF Pro Text',
          fallbackFonts: ['Arial'],
        },
      },
      variants: {
        ...themeWithCustomBrand.typography.variants,
        'body-1': {
          'font-size': '13px',
          'line-height': '18px',
        }
      }
    }
  }
});
```

### Parsing and Modifying Existing Theme

```typescript
import { parseCSS, generateCSS, updateBaseColor } from '@gravity-ui/gravity-themer';

// Parse existing theme
const existingTheme = parseCSS(cssString);

// Recommended: Use updateBaseColor to modify brand color
const modifiedTheme = updateBaseColor({
  theme: existingTheme,
  colorToken: 'brand',
  value: {
    dark: '#FF3B30',
    light: '#FF3B30'
  }
});

// Generate new CSS
const newCSS = generateCSS({theme: modifiedTheme});
```

### Working with Specific Theme Parts

```typescript
import { generateCSS, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Override only typography
const typographyOnlyTheme = generateCSS({
  theme: {
    ...DEFAULT_THEME,
    typography: {
      ...DEFAULT_THEME.typography,
      fontFamilies: {
        ...DEFAULT_THEME.typography.fontFamilies,
        'custom-font': {
          mainFont: 'SF Pro Text',
          fallbackFonts: ['Arial'],
        },
      },
      groups: {
        ...DEFAULT_THEME.typography.groups,
        body: {
          'font-family': 'custom-font',
          'font-weight': 400,
        },
      }
    }
  }
});
```
