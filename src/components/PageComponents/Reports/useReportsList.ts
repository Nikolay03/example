import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { REPORT_LIST } from '~/constants/api'
import { ReportCategories } from '~/types/enums'
import { TReport } from '~/types/reports'
import { TStateListData } from '~/types/state'
import { TObject } from '~/types/constants'
import { useRequest } from '~/hooks/api'
import useTabTitle, { UseTabTitleParams } from '~/components/Titles/useTabTitle'

interface UseReportListOptions<T> {
  api?: string
  initialData?: TStateListData<T>
  params?: TObject
  staticParams?: TObject
  tabOptions?: UseTabTitleParams<ReportCategories>
}

interface UseReportList<T> {
  results: T[]
  count: number
  isLoading: boolean
  category: string
  onChangeTab: (category: ReportCategories) => void
}

export default function useReportsList<T = TReport> (options: UseReportListOptions<T>): UseReportList<T> {
  const {
    api = REPORT_LIST,
    initialData,
    params = {},
    staticParams = {},
    tabOptions = {}
  } = options

  const { locale } = useRouter()

  const tabTitleData = useTabTitle<ReportCategories>({
    initialTab: ReportCategories.ANALYTICAL,
    ...tabOptions
  })

  const { results, count, isLoading, refetch } = useRequest<T>(api, {
    disableLocale: false,
    initialData,
    params: { ...params, ...staticParams, category: tabTitleData.tab }
  })

  useEffect(() => {
    tabTitleData.onChangeTab(ReportCategories.ANALYTICAL)
  }, [locale])

  function onChangeTab (newCategory: ReportCategories) {
    tabTitleData.onChangeTab(newCategory)

    refetch({ ...staticParams, category: newCategory, page: 1 })
  }

  return {
    results,
    count,
    isLoading,
    category: tabTitleData.tab,
    onChangeTab
  }
}
