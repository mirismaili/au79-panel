import {DEFAULT_LOCALE_PARAM, LANGUAGES, LOCALE_PARAMS} from '@smart-i18n/next/config'
import {handleRequest} from '@smart-i18n/next/middleware-utils'
import Negotiator from 'negotiator'
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import LocaleParam = I18n.LocaleParam

export async function middleware(request: NextRequest) {
  const {pathname, search, hash} = request.nextUrl

  const {extendedHeaders, invalidLocaleParam} = handleRequest(request)
  if (invalidLocaleParam) {
    const inferredLocaleParam = inferLocale(request)
    const to = new URL(`/${inferredLocaleParam + pathname + search + hash}`, request.url)
    console.info(
      `The URL "%s" doesn't include a supported locale/language. Redirecting to: "%s"`,
      pathname,
      to.pathname,
    )
    return NextResponse.redirect(to)
  }

  return NextResponse.next({request: {headers: extendedHeaders}})
}

// https://nextjs.org/docs/app/building-your-application/routing/internationalization#routing-overview
function inferLocale(request: NextRequest) {
  const userSelectedLocaleParam = request.cookies.get('localeParam')?.value
  if (LOCALE_PARAMS.includes(userSelectedLocaleParam as LocaleParam)) return userSelectedLocaleParam
  // What `if (userSelectedLocaleParam && !LOCALE_PARAMS.includes(userSelectedLocaleParam))`?
  // Then incorrect `cookies.localeParam` will be fixed client-side (in `ClientI18nProvider`).

  const negotiator = new Negotiator({headers: {'accept-language': request.headers.get('accept-language') ?? undefined}})
  return negotiator.language(LANGUAGES as string[]) ?? DEFAULT_LOCALE_PARAM
}

export const config = {
  // Skip all paths that should not be internationalized. This skips the folders "api", "_next" and all files with an extension (e.g. "favicon.ico"):
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
