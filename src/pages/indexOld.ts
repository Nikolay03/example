import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { sprintf } from 'sprintf-js'

import * as API from '~/constants/api'
import { HomePageProps } from '~/components/PageComponents/HomeOld'
import { TProductGroupAttributeName, TProductGroupAttributeNameTrade, TProductGroupPopular } from '~/types/products'
import { TTradesTable } from '~/types/trades'
import { TUserReputation } from '~/types/reputations'
import { TNews } from '~/types/news'
import { TStaticPage } from '~/types/static'
import { fetchData, fetchDetailData } from '~/utils/fetch'

export { default } from '~/components/PageComponents/HomeOld'

type GetServerSideProps = GetServerSidePropsResult<HomePageProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { locale: language, req } = ctx
  const popularProductsData = await fetchData<TProductGroupPopular>(API.PRODUCT_GROUP_POPULAR, {
    req,
    pageSize: 9
  })
  const tradeData = await fetchData<TTradesTable>(API.TRADE_PUBLIC_LIST, {
    req,
    pageSize: 10
  })
  const reputationData = await fetchData<TUserReputation>(API.USERS_REPUTATION_LIST, {
    req,
    pageSize: 10
  })
  const newsData = await fetchData<TNews>(API.NEWS_LIST, {
    req,
    language,
    pageSize: 3
  })
  const aboutData = await fetchDetailData<TStaticPage>(sprintf(API.STATIC_PAGE_DETAIL, 'about_home'), {
    req
  })
  const statisticsProductsData = await fetchData<TProductGroupAttributeName>(API.PRODUCT_SELECT_LIST, {
    req,
    pageSize: 1,
    search: 'Виноград',
    level_special: 2
  })
  const statisticsExportProductsData = await fetchData<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_SELECT_LIST, {
    req,
    pageSize: 1,
    level_special: 2
  })

  return {
    props: {
      popularProductsData,
      tradeData,
      reputationData,
      statisticsProductsData,
      statisticsExportProductsData,
      newsData,
      aboutData
    }
  }
}
