import {createConfig} from '@smart-i18n/next/init'
import dictionary from './dictionary.json'

export default createConfig({
  I18N_MODEL: {
    // the keys are ISO 639-1 codes: https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
    fa: {
      // Put default locale-code of this language/localeParam ("fa") as the first item of the array. That will be set as
      // locale-code if an alone language-code found in URL ("fa" localeParam => "fa-IR" localeCode). See the
      // instantiations of `Locale` class.
      localeCodes: ['fa-IR', 'fa-AF'],
      name: 'فارسی',
      label: 'فا',
    },
    en: {
      localeCodes: ['en-US'],
      name: 'English',
      label: 'EN',
    },
  },
  getLocaleParams: (LANGUAGES, LOCALE_CODES) => [...LANGUAGES, ...LOCALE_CODES],
  DEFAULT_LOCALE_PARAM: 'fa',
  BASE_LOCALE_CODE: 'en',
  dictionary,
})
