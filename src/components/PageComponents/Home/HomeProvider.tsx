import { createContext, ReactElement, ReactNode, useContext } from 'react'

import { TStateListData } from '~/types/state'
import {
  TProductBanner, TProductGroupAttributeName, TProductGroupAttributeNameTrade
} from '~/types/products'
import { TNews } from '~/types/news'
import { TUserReputation } from '~/types/reputations'
import { TStaticPage } from '~/types/static'

export interface HomePageProps {
  bannerList: TStateListData<TProductBanner>
  productsList: TStateListData<TProductBanner>
  newsData: TStateListData<TNews>
  statisticsProductsData: TStateListData<TProductGroupAttributeName>
  statisticsExportProductsData: TStateListData<TProductGroupAttributeNameTrade>
  reputationData: TStateListData<TUserReputation>
  aboutData: TStaticPage
}

const HomeContext = createContext<HomePageProps>({
  productsList: null,
  newsData: null,
  bannerList: null,
  statisticsProductsData: null,
  statisticsExportProductsData: null,
  reputationData: null,
  aboutData: null
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
