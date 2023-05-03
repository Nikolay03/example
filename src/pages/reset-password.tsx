import { ReactElement } from 'react'
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

import { CHECK_TOKEN } from '~/constants/api'
import { ROOT_URL } from '~/constants/routes'
import { TObject } from '~/types/constants'
import request from '~/utils/request'
import { useTranslate } from '~/utils/translate'
import { ResetPassForm } from '~/components/PageForms/ResetPassForm'
import { SimpleLayout } from '~/components/Layouts'
import { PageTitle } from '~/components/Titles'
import PageWrapper from '~/components/PageWrapper'

export default function ResetPasswordPage (): ReactElement {
  const { t } = useTranslate()

  return (
    <PageWrapper title={t('login_reset_password')}>
      <SimpleLayout>
        <PageTitle mb={8}>
          {t('login_reset_password')}
        </PageTitle>

        <ResetPassForm />
      </SimpleLayout>
    </PageWrapper>
  )
}

export async function getServerSideProps (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<TObject>> {
  const { req } = ctx
  const { token } = ctx.query

  const response = await request({ req })
    .post<{ detail: boolean }>(CHECK_TOKEN, { token })
  const { data: { detail: success } } = response

  if (success) return { props: {} }

  return {
    redirect: {
      destination: ROOT_URL,
      permanent: false
    }
  }
}
