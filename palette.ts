import type {CustomTheme} from 'daisyui'
import themes from 'daisyui/src/theming/themes'
import type {DefaultColors} from 'tailwindcss/types/generated/colors' // Don't `import colors from 'tailwindcss/colors'`. Just `import type` from 'tailwindcss' package. Otherwise, you need to put it in `dependencies` (instead of `devDependencies`)

type Gray = DefaultColors['gray']

/**
 * @see [How to customize an existing theme?](https://daisyui.com/docs/themes/#-7)
 * @see [List of all daisyUI color names](https://daisyui.com/docs/colors/#-2)
 * @see [How to extend default daisyUI color
 *   names?](https://github.com/saadeghi/daisyui/discussions/653#discussioncomment-2438428)
 */
const PALETTES = {
  light: {
    ...themes.light,
    'primary': '#1976d2',
    // // Other theme-colors should be provided as CSS variables: // See the above link.
    // '--secondary-text': hexColorToRgbString('#9ca3af' satisfies Gray['400']),
    '--scrollbar-color': hexColorToRgbString('#d1d5db' satisfies Gray['300']),
    '--scrollbar-color-hover': hexColorToRgbString('#9ca3af' satisfies Gray['400']),
  },
  dark: {
    ...themes.dark,
    'primary': '#a5c8ff',
    // // Other theme-colors should be provided as CSS variables: // See the above link.
    // '--secondary-text': hexColorToRgbString('#9ca3af' satisfies Gray['400']),
    '--scrollbar-color': hexColorToRgbString('#4b5563' satisfies Gray['600']),
    '--scrollbar-color-hover': hexColorToRgbString('#6b7280' satisfies Gray['500']),
  },
} satisfies CustomTheme

export default PALETTES

/**
 * @example
 * hexColorToRgbString('#123546') // => '18 52 86'
 */
function hexColorToRgbString(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b].join(' ')
}

export type ColorName =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'base-100'
  | 'base-200'
  | 'base-300'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
export type ContentColorName =
  | 'primary-content'
  | 'secondary-content'
  | 'accent-content'
  | 'neutral-content'
  | 'base-content'
  | 'info-content'
  | 'success-content'
  | 'warning-content'
  | 'error-content'
export type AllColorName = ColorName | ContentColorName // Should be `keyof ValueOf<CustomTheme>`. But it's just `string` now!
