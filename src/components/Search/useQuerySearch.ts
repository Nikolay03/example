import { useRouter } from 'next/router'

import { useRouterQuery } from '~/hooks/url'

interface UseQuerySearch {
  onSearch: (search: string) => Promise<boolean>
  search: string | undefined
}

export default function useQuerySearch (): UseQuerySearch {
  const router = useRouter()

  const { urlQuery } = useRouterQuery()

  function onSearch (search: string) {
    return router.replace({
      pathname: router.pathname,
      query: { ...router.query, search }
    }, null, { shallow: true })
  }

  return {
    onSearch,
    search: urlQuery.search
  }
}
