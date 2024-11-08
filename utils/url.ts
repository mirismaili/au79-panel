export const pathnameStartsWith = (pathname: string, subPathname: string) =>
  subPathname.endsWith('/')
    ? pathname === subPathname.slice(0, -1) || pathname.startsWith(subPathname)
    : pathname === subPathname || pathname.startsWith(subPathname + '/')

/**
 * Note: Only the first `path` can be absolute!
 * @example
 * joinPaths('a', 'b', 'c') === 'a/b/c'
 * joinPaths('/', 'b', 'c') === '/b/c'
 * joinPaths('a', 'b', '/') === 'a/b/'
 * joinPaths('a', 'b/', '/') === 'a/b/'
 * joinPaths('a/', 'b', 'c') === 'a/b/c'
 * joinPaths('/', 'b/', 'c/') === '/b/c/'
 * joinPaths('a/b', 'c/d') === 'a/b/c/d'
 * joinPaths('/a/b/', '', 'c') === '/a/b/c'
 * joinPaths('/a/b/', undefined, 'c') === '/a/b/c'
 * joinPaths(false, undefined, 'c') === 'c'
 * joinPaths(undefined, '/a') === '/a'
 * joinPaths('https://example.com', 'api') === 'https://example.com/api'
 * joinPaths('https://example.com/', 'api') === 'https://example.com/api'
 * joinPaths('https://example.com/api', 'v2') === 'https://example.com/api/v2'
 * joinPaths('https://example.com/api/', 'v2') === 'https://example.com/api/v2'
 */
export const joinPaths = (...paths: [string | undefined | false, ...(string | undefined | false)[]]) => {
  const subPaths = paths.filter(Boolean) as string[]
  return subPaths
    .reduce(
      (path: string, subPath) =>
        `${path.endsWith('/') ? path.slice(0, -1) : path}/${subPath.startsWith('/') ? subPath.slice(1) : subPath}`,
      subPaths[0]!.startsWith('/') ? '//' : '',
    )
    .slice(1)
}
