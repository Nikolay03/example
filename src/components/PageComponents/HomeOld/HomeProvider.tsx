import { createContext, ReactElement, ReactNode, useContext } from 'react'

import { TStateListData } from '~/types/state'
import { TProductGroupAttributeName, TProductGroupAttributeNameTrade, TProductGroupPopular } from '~/types/products'
import { TTradesTable } from '~/types/trades'
import { TUserReputation } from '~/types/reputations'
import { TNews } from '~/types/news'
import { TStaticPage } from '~/types/static'

export interface HomePageProps {
  popularProductsData: TStateListData<TProductGroupPopular>
  tradeData: TStateListData<TTradesTable>
  reputationData: TStateListData<TUserReputation>
  newsData: TStateListData<TNews>
  aboutData: TStaticPage
  statisticsProductsData: TStateListData<TProductGroupAttributeName>
  statisticsExportProductsData: TStateListData<TProductGroupAttributeNameTrade>
}

const HomeContext = createContext<HomePageProps>({
  popularProductsData: null,
  newsData: null,
  reputationData: null,
  tradeData: null,
  aboutData: null,
  statisticsProductsData: null,
  statisticsExportProductsData: null
})

interface HomeProviderProps extends HomePageProps {
  children: ReactNode
}

function HomeProvider (props: HomeProviderProps): ReactElement {
  const { children, ...restProps } = props

  return (
    <HomeContext.Provider value={restProps}>
      {children}
    </HomeContext.Provider>
  )
}

export function useHomeData (): HomePageProps {
  return useContext(HomeContext)
}

export default HomeProvider
