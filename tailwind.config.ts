import type {Config as DaisyUIConfig} from 'daisyui'
import daisyui from 'daisyui'
import type {Config} from 'tailwindcss'
import PALETTES from './palette'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: [
    'variant',
    ['@media(prefers-color-scheme:dark){&:not([data-theme=light] *)}', '&:is([data-theme=dark] *)'],
  ],
  theme: {
    extend: {
      /**
       * Transform daisyUI css-variables to tailwind colors (specially, handle the opacity of color).
       * @see https://github.com/saadeghi/daisyui/discussions/653#discussioncomment-2438428
       * @example
       * {background: 'rgb(var(--background) / <alpha-value>)', shaded: 'rgb(var(--shaded) / <alpha-value>)'}
       */
      colors: Object.fromEntries(
        Object.keys(PALETTES.light)
          .filter((colorNameOrCssVar) => colorNameOrCssVar.startsWith('--'))
          // https://tailwindcss.com/docs/customizing-colors#using-css-variables
          .map((colorNameAsCssVar) => [colorNameAsCssVar.slice(2), `rgb(var(${colorNameAsCssVar}) / <alpha-value>)`]),
      ),
    },
  },
  plugins: [daisyui],
  daisyui: {
    /** @see [How to customize an existing theme?](https://daisyui.com/docs/themes/#-7) */
    themes: [{light: PALETTES.light}, {dark: PALETTES.dark}] as const,
    logs: false,
  } satisfies DaisyUIConfig,
}
export default config
