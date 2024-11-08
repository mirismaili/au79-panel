import {jwtVerify} from 'jose'
import type {JOSEError} from 'jose/errors'
import type {RequestCookies} from 'next/dist/compiled/@edge-runtime/cookies'
import {cookies} from 'next/headers'
import {JWT_SECRET} from './constants'

export async function authenticate(readonlyRequestCookies?: Omit<RequestCookies, 'set' | 'clear' | 'delete'>) {
  const jwt = (readonlyRequestCookies ?? (await cookies())).get('session')?.value
  if (!jwt) return
  return await jwtVerify<Session>(jwt, JWT_SECRET).then(
    ({payload}) => ({data: payload}) as {data: typeof payload; error?: undefined},
    (error) => {
      if (error.name === 'DataError' && error.message === 'Zero-length key is not supported') throw error // Probably, `JWT_SECRET === undefined`
      return {error} as {data?: undefined; error: JOSEError}
    },
  )
}

type Session = {user: string}
