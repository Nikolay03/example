import { useState, useCallback } from 'react'
import { prop } from 'ramda'
import { useRouter } from 'next/router'

import { useRouterQuery } from '~/hooks/url'

export interface UseTabTitleParams<T> {
  initialTab: T
  withQuery?: boolean
  queryKey?: string
}

interface UseTabTitle<T> {
  tab: T
  onChangeTab: (value: T) => void
}

export default function useTabTitle<T extends string> (params: UseTabTitleParams<T>): UseTabTitle<T> {
  const { initialTab, withQuery, queryKey = 'tab' } = params

  const router = useRouter()

  const { urlQuery, routerQuery } = useRouterQuery()

  const [tab, setTab] = useState<T>(initialTab)

  if (withQuery) {
    const onChangeTab = (value: T): void => {
      router.replace({
        pathname: router.pathname,
        query: { ...routerQuery, page: 1, [queryKey]: value }
      }, null, { shallow: true })
    }

    return {
      // @ts-ignore
      tab: prop(queryKey, urlQuery) || initialTab,
      onChangeTab
    }
  }

  const onChangeTab = useCallback((value: T): void => {
    setTab(value)
  }, [])
  return {
    tab,
    onChangeTab
  }
}
