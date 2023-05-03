import { ReactElement } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'

import ResetPassModal from './ResetPassModal'

import { useTranslate } from '~/utils/translate'
import { StepperProvider, WizardFormProvider } from '~/components/Utils/Contexts'

export default function ResetPass (): ReactElement {
  const { t } = useTranslate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <StepperProvider>
      <WizardFormProvider>
        <Button alignSelf={'center'} variant={'link'} onClick={onOpen}>
          {t('login_forgot_password')}
        </Button>

        <ResetPassModal
          isOpen={isOpen}
          onClose={onClose}
        />
      </WizardFormProvider>
    </StepperProvider>
  )
}
