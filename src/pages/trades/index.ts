import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { TradesProps } from './Trades'

import { TRADE_PUBLIC_LIST } from '~/constants/api'
import { TTradesTable } from '~/types/trades'
import { fetchData } from '~/utils/fetch'

export { default } from './Trades'

type GetServerSideProps = GetServerSidePropsResult<TradesProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { query, req } = ctx

  const { page, search } = query

  const api = TRADE_PUBLIC_LIST

  const tradeData = await fetchData<TTradesTable>(api, {
    req,
    page,
    search
  })

  return {
    props: {
      api,
      tradeData
    }
  }
}
