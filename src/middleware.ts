import {authenticate} from '@/authentication'
import {LOGIN_PATH, PANEL_PATH, SIGNUP_PATH} from '@/constants'
import {DEFAULT_LOCALE_PARAM, LANGUAGES, LOCALE_PARAMS} from '@smart-i18n/next/config'
import {handleRequest} from '@smart-i18n/next/middleware-utils'
import Negotiator from 'negotiator'
import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {joinPaths, pathnameStartsWith} from '../utils/url'
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

  const localeParam = extendedHeaders.get('x-locale-param')!
  const localeFreePathname = extendedHeaders.get('x-locale-free-pathname')!

  const {redirect, setCookies} = await handleProtectedRoutes()

  const response = redirect ? NextResponse.redirect(redirect) : NextResponse.next({request: {headers: extendedHeaders}})

  setCookies?.(response)

  return response

  async function handleProtectedRoutes(): Promise<
    | {redirect: URL; setCookies?: (response: NextResponse) => void} // => Redirect
    | {redirect?: undefined; setCookies: (response: NextResponse) => void} // => Just clear the session
    | {redirect?: undefined; setCookies?: undefined} // => Do nothing
  > {
    if (!pathnameStartsWith(localeFreePathname, PANEL_PATH)) return {} // Do nothing

    const authenticationResult = await authenticate(request.cookies)

    if (pathnameStartsWith(localeFreePathname, LOGIN_PATH) || pathnameStartsWith(localeFreePathname, SIGNUP_PATH)) {
      if (!authenticationResult) return {} // Do nothing

      if (authenticationResult.data) return {redirect: new URL(joinPaths('/', localeParam, PANEL_PATH), request.url)}

      // if (authenticationResult.error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') // `error instanceof JWSSignatureVerificationFailed`
      return {setCookies: (response) => response.cookies.delete('session')}
    }

    if (authenticationResult?.data) return {} // Do nothing

    return {
      redirect: new URL(`/${localeParam}${LOGIN_PATH}`, request.url),
      setCookies: (response) => {
        if (authenticationResult) response.cookies.delete('session') // Clear existed invalid session
        response.cookies.set({
          name: 'storedUserPath',
          value: localeFreePathname + search + hash,
          maxAge: 60 * 60, // 1 hour
        })
      },
    }
  }
}

// https://nextjs.org/docs/app/building-your-application/routing/internationalization#routing-overview
function inferLocale(request: NextRequest) {
  const userSelectedLocaleParam = request.cookies.get('preferredLocaleParam')?.value
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
