// `jose.jwtVerify()` will fail if `process.env.NEXT_PUBLIC_JWT_SECRET === undefined` (but not if
// `process.env.NEXT_PUBLIC_JWT_SECRET === ''`). See `authenticate()` in "authentication.ts".
export const JWT_SECRET = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)

export const PANEL_PATH = '/dashboard/'
export const LOGIN_PATH = '/dashboard/login/'
