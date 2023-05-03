import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { sprintf } from 'sprintf-js'

import { UserShowcaseProps } from './UserShowcase'

import * as API from '~/constants/api'
import { TUserShowcase } from '~/types/showcase'
import { fetchDetailData } from '~/utils/fetch'

export { default } from './UserShowcase'

type GetServerSideProps = GetServerSidePropsResult<UserShowcaseProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { req } = ctx
  const { slug } = ctx.params

  try {
    const data = await fetchDetailData<TUserShowcase>(sprintf(API.SHOWCASE_USER_DETAIL, slug), {
      req
    })

    return {
      props: { data }
    }
  }

  catch (e) {
    return {
      props: {
        data: null
      }
    }
  }
}
