import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { sprintf } from 'sprintf-js'

import { TradeWinnerProps } from './TradeWinner'

import { TRADE_PARTICIPANTS_LIST, TRADE_DETAIL } from '~/constants/api'
import { TTrades, TTradesParticipantWinner } from '~/types/trades'
import { fetchData, fetchDetailData } from '~/utils/fetch'

export { default } from './TradeWinner'

type GetServerSideProps = GetServerSidePropsResult<TradeWinnerProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { req, params, query } = ctx

  const { slug } = params
  const { page } = query

  try {
    const data = await fetchData<TTradesParticipantWinner>(TRADE_PARTICIPANTS_LIST, {
      req,
      bargain: slug,
      page
    })

    // when list is empty check if user is organizer of this bargain
    if (!data.results.length) {
      const tradeDetail = await fetchDetailData<TTrades>(sprintf(TRADE_DETAIL, slug), { req })

      if (tradeDetail?.isOrganizer) {
        return {
          props: { data }
        }
      }

      // return 404 if user has no permissions
      return {
        notFound: true
      }
    }

    return {
      props: { data }
    }
  }
  catch (e) {
    return {
      notFound: true
    }
  }
}
