import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { sprintf } from 'sprintf-js'

import { TradeDetailProps } from './TradeDetail'

import { TRADE_DETAIL } from '~/constants/api'
import { TTrades } from '~/types/trades'
import { fetchDetailData } from '~/utils/fetch'

export { default } from './TradeDetail'

type GetServerSideProps = GetServerSidePropsResult<TradeDetailProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { params, req } = ctx

  const { slug } = params

  try {
    const data = await fetchDetailData<TTrades>(sprintf(TRADE_DETAIL, slug), {
      req
    })

    return {
      props: {
        data
      }
    }
  }
  catch (e) {
    return {
      notFound: true
    }
  }
}
