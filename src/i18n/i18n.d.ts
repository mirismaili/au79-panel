// noinspection JSUnusedGlobalSymbols

/**
 * This file overrides (or just extends) '@smart-i18n/next/default-types' (that is declared in `tsconfig.json`).
 */

import type dictionary from './dictionary.json'
declare global {
  declare namespace I18n {
    /** Should be ⊂ ISO 639-1 codes: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes */
    type Lang = 'fa' | 'en'
    /** Should be ⊂ `Intl.UnicodeBCP47LocaleIdentifier` */
    type LocaleCode = 'fa-IR' | 'fa-AF' | 'en-US'
    /** Should be ⊂ `Lang | LocaleCode` */
    type LocaleParam = Lang | LocaleCode // Should be ⊂ `Lang | LocaleCode`
    /**
     * The locale/language that doesn't need translation. But is the base locale/language that the keys of the
     * dictionary/dictionaries are provided in it.
     *
     * It should be ∈ `Lang | LocaleCode`
     */
    type BaseLocaleCode = 'en' // Should be ∈ `Lang | LocaleCode`
    type Translatable = keyof typeof dictionary
  }
}
