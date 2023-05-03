import { ReactElement } from 'react'
import { equals, not } from 'ramda'

import RegFormPersonal from './RegFormPersonal'
import RegFormContact from './RegFormContact'
import RegFormAuth from './RegFormAuth'
import RegFormProducts from './RegFormProducts'

import { WizardFormProvider, useStepper } from '~/components/Utils/Contexts'
import { AuthFormContainer } from '~/components/PageComponents/Auth'

export default function RegistrationForm (): ReactElement {
  const { step } = useStepper()

  const showBgImage = not(equals(step, 4))

  return (
    <AuthFormContainer showBgImage={showBgImage}>
      <WizardFormProvider>
        {step === 1 && <RegFormPersonal />}
        {step === 2 && <RegFormContact />}
        {step === 3 && <RegFormAuth />}
        {step === 4 && <RegFormProducts />}
      </WizardFormProvider>
    </AuthFormContainer>
  )
}
