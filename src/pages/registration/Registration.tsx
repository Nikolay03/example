import { ReactElement } from 'react'

import { useTranslate } from '~/utils/translate'
import PageWrapper from '~/components/PageWrapper'
import { SimpleLayout } from '~/components/Layouts'
import { PageTitle } from '~/components/Titles'
import { AuthContainer } from '~/components/PageComponents/Auth'
import { StepperProvider } from '~/components/Utils/Contexts'
import Stepper from '~/components/Stepper'
import { RegistrationForm } from '~/components/PageForms'

export default function Registration (): ReactElement {
  const { t } = useTranslate()

  const steps = [
    {
      id: 1,
      key: 'personal',
      title: t('reg_step_personal')
    },
    {
      id: 2,
      key: 'contacts',
      title: t('reg_step_contacts')
    },
    {
      id: 3,
      key: 'auth',
      title: t('reg_step_auth')
    },
    {
      id: 4,
      key: 'products',
      title: t('reg_step_products')
    }
  ]

  return (
    <PageWrapper title={t('reg_page_title')}>
      <SimpleLayout>
        <PageTitle mb={10}>
          {t('reg_page_title')}
        </PageTitle>

        <AuthContainer>
          <StepperProvider steps={steps}>
            <Stepper />
            <RegistrationForm />
          </StepperProvider>
        </AuthContainer>
      </SimpleLayout>
    </PageWrapper>
  )
}
