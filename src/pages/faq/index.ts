import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { FaqProps } from './Faq'

import { FAQ_CATEGORY_LIST } from '~/constants/api'
import { TFaqGrouped } from '~/types/faq'
import { fetchData } from '~/utils/fetch'

export { default } from './Faq'

type GetServerSideProps = GetServerSidePropsResult<FaqProps>

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSideProps> {
  const { locale, query, req } = ctx

  const { category } = query

  const faqData = await fetchData<TFaqGrouped>(FAQ_CATEGORY_LIST, {
    req,
    language: locale,
    category
  })

  return {
    props: {
      faqData
    }
  }
}
