import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { StatisticsProps } from './Statistics'

import { fetchData } from '~/utils/fetch'
import { TProductGroupAttributeNameTrade } from '~/types/products'
import * as API from '~/constants/api'

export { default } from './Statistics'

type GetServerSideProps = GetServerSidePropsResult<StatisticsProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { req } = ctx

  const statisticsExportProductsData = await fetchData<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_SELECT_LIST,
    {
      req,
      pageSize: 1,
      level_special: 2
    })

  return {
    props: {
      statisticsExportProductsData
    }
  }
}
