# @gravity-ui/gravity-themer &middot; [![npm package](https://img.shields.io/npm/v/@gravity-ui/gravity-themer)](https://www.npmjs.com/package/@gravity-ui/gravity-themer) [![CI](https://img.shields.io/github/actions/workflow/status/gravity-ui/uikit-themer/.github/workflows/ci.yml?label=CI&logo=github)](https://github.com/gravity-ui/uikit-themer/actions/workflows/ci.yml?query=branch:main)

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

```typescript
import { generateCSS, generateJSON, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Generate CSS theme using DEFAULT_THEME as base
const cssTheme = generateCSS({
  ...DEFAULT_THEME,
  baseColors: {
    ...DEFAULT_THEME.baseColors,
    brand: {
      dark: { value: '#007AFF' },
      light: { value: '#007AFF' }
    }
  }
});

// Generate JSON theme
const jsonTheme = generateJSON({
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

```typescript
import { DEFAULT_THEME } from '@gravity-ui/gravity-themer';
import type { GravityTheme } from '@gravity-ui/gravity-themer';

// Use DEFAULT_THEME as base for your custom theme
const customTheme: GravityTheme = {
  ...DEFAULT_THEME,
  // Override specific parts
  baseColors: {
    ...DEFAULT_THEME.baseColors,
    brand: {
      dark: { value: '#FF3B30' },
      light: { value: '#FF3B30' }
    }
  }
};
```

### Working with Private Colors

Private colors are internal theme colors used to generate the final palette.

```typescript
import { generatePrivateColors } from '@gravity-ui/gravity-themer';
import type { PrivateColorToken, PrivateSolidColorToken } from '@gravity-ui/gravity-themer';

// Generate private colors
const privateColors = generatePrivateColors({
  // private colors configuration
});
```

**Types:**

- `PrivateColorToken` - private color token
- `PrivateSolidColorToken` - solid private color token  
- `AnyPrivateColorToken` - any type of private color

### Color Utilities

```typescript
import {
  isColorCssVariable,
  isUtilityColorCssVariable,
  isPrivateColorCssVariable,
  parsePrivateColorCssVariable,
  createPrivateColorCssVariable,
  createUtilityColorCssVariable,
  getUtilityColorTypeFromCssVariable
} from '@gravity-ui/gravity-themer';

// Check CSS variable type
const isColor = isColorCssVariable('--g-color-base-brand');
const isUtility = isUtilityColorCssVariable('--g-color-text-primary');
const isPrivate = isPrivateColorCssVariable('--g-private-color-red-500');

// Parse private color variable
const {mainColorToken, privateColorToken} = parsePrivateColorCssVariable('--g-private-color-red-500');

// Create color variables
const privateVar = createPrivateColorCssVariable('red', '500');
const utilityVar = createUtilityColorCssVariable('text', 'primary');

// Get utility color type
const colorType = getUtilityColorTypeFromCssVariable('--g-color-text-primary');
```

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
const fontVar = createFontCssVariable('family', 'sans');
const textVar = createTextCssVariable('body-1', 'font-size');

// Utilities
const fontKey = getKeyFromCssFontVariable('--g-font-family-sans');
const textParsed = parseTextCssVariable('--g-text-body-1-font-size');
const fontFamily = generateCssFontFamily(['Arial', 'sans-serif']);

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
import { generateCSS, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

const customTheme = generateCSS({
  ...DEFAULT_THEME,
  baseColors: {
    ...DEFAULT_THEME.baseColors,
    brand: {
      dark: { value: '#007AFF' },
      light: { value: '#007AFF' }
    }
  },
  typography: {
    ...DEFAULT_THEME.typography,
    fontFamilies: {
      ...DEFAULT_THEME.typography.fontFamilies,
      sans: {
        mainFont: 'SF Pro Text',
        fallbackFonts: ['Arial'],
      },
    },
    variants: {
      ...DEFAULT_THEME.typography.variants,
      'body-1': {
        'font-size': '13px',
        'line-height': '18px',
      }
    }
  }
});
```

### Parsing and Modifying Existing Theme

```typescript
import { parseCSS, generateCSS, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Parse existing theme
const existingTheme = parseCSS(cssString);

// Modify brand color
const modifiedTheme = {
  ...existingTheme,
  baseColors: {
    ...existingTheme.baseColors,
    brand: {
      dark: { value: '#FF3B30' },
      light: { value: '#FF3B30' }
    }
  }
};

// Generate new CSS
const newCSS = generateCSS(modifiedTheme);
```

### Working with Specific Theme Parts

```typescript
import { generateCSS, DEFAULT_THEME } from '@gravity-ui/gravity-themer';

// Override only typography
const typographyOnlyTheme = generateCSS({
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
});
```
