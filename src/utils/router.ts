import { curry, path, prop } from 'ramda'

export const getParamFromRouter = curry((key, router) =>
  path(['query', key], router))

export const replaceRouterQuery = curry((newQuery, router) => {
  const pathname = prop('pathname', router)
  const query = prop('query', router)

  return router.replace({
    pathname,
    query: { ...query, ...newQuery }
  })
})
