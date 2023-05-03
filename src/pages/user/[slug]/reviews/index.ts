import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { UserReviewsData, UserReviewsProps } from './UserReviews'

import { TRADE_USER_REVIEWS } from '~/constants/api'
import { fetchDetailData } from '~/utils/fetch'

export { default } from './UserReviews'

type GetServerSideProps = GetServerSidePropsResult<UserReviewsProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { query, params, req } = ctx

  const { page } = query
  const { slug } = params

  const api = TRADE_USER_REVIEWS

  const reviewData = await fetchDetailData<UserReviewsData>(TRADE_USER_REVIEWS, {
    req,
    page,
    toUser: slug
  })

  return {
    props: {
      api,
      data: reviewData
    }
  }
}
