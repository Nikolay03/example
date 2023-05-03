import { ParsedUrlQuery } from 'querystring'

import { split } from 'ramda'
import { useRouter } from 'next/router'

import { searchToQuery } from '~/utils/url'

interface UseRouterQuery {
  routerQuery: ParsedUrlQuery
  urlQuery: Record<string, string>
}

export default function useRouterQuery (): UseRouterQuery {
  const { asPath, ...router } = useRouter()

  const [, search] = split('?', asPath)
  const query = searchToQuery(search)

  return {
    routerQuery: router.query,
    urlQuery: query
  }
}
