import { ReactElement } from 'react'

import { useTranslate } from '~/utils/translate'
import PageWrapper from '~/components/PageWrapper'
import { SimpleLayout } from '~/components/Layouts'
import { PageTitle } from '~/components/Titles'
import { AuthContainer } from '~/components/PageComponents/Auth'
import { LoginForm } from '~/components/PageForms'

export default function Login (): ReactElement {
  const { t } = useTranslate()

  return (
    <PageWrapper title={t('login_page_title')}>
      <SimpleLayout>
        <PageTitle mb={8}>
          {t('login_page_heading')}
        </PageTitle>

        <AuthContainer>
          <LoginForm />
        </AuthContainer>
      </SimpleLayout>
    </PageWrapper>
  )
}
