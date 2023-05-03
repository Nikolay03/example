import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { sprintf } from 'sprintf-js'

import * as API from '~/constants/api'
import { HomePageProps } from '~/components/PageComponents/Home'
import {
  TProductBanner, TProductGroupAttributeName, TProductGroupAttributeNameTrade
} from '~/types/products'
import { fetchData, fetchDetailData } from '~/utils/fetch'
import { TNews } from '~/types/news'
import { TUserReputation } from '~/types/reputations'
import { TStaticPage } from '~/types/static'

export { default } from '~/components/PageComponents/Home'

type GetServerSideProps = GetServerSidePropsResult< HomePageProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { locale: language, req } = ctx

  const bannerList = await fetchData<TProductBanner>(API.BANNER_LIST, {
    req,
    pageSize: 4
  })

  const productsList = await fetchData<TProductBanner>(API.BANNER_PRODUCTS_LIST, {
    req,
    pageSize: 8
  })

  const newsData = await fetchData<TNews>(API.NEWS_LIST, {
    req,
    language,
    pageSize: 3
  })

  const reputationData = await fetchData<TUserReputation>(API.USERS_REPUTATION_LIST, {
    req,
    pageSize: 10
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
      newsData,
      bannerList,
      productsList,
      reputationData,
      statisticsProductsData,
      statisticsExportProductsData,
      aboutData
    }
  }
}
