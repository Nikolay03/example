import { Fragment, ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'

import ResetPassStep1 from './ResetPassStep1'
import ResetPassStep2 from './ResetPassStep2'
import ResetPassStep3 from './ResetPassStep3'

import { useTranslate } from '~/utils/translate'
import { useStepper } from '~/components/Utils/Contexts'
import { PopModal, ModalDescription } from '~/components/Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function ResetPassModal (props: Props): ReactElement {
  const { isOpen, onClose } = props

  const { t } = useTranslate()

  const { step, onResetStep } = useStepper()

  function onCloseModal () {
    onClose()
    onResetStep()
  }

  return (
    <PopModal
      title={t('login_reset_password')}
      isOpen={isOpen}
      onClose={onCloseModal}>
      <Stack spacing={6}>
        {step === 1 && (
          <Fragment>
            <ModalDescription>
              {t('login_reset_password_description')}
            </ModalDescription>
            <ResetPassStep1 onClose={onCloseModal} />
          </Fragment>
        )}
        {step === 2 && (
          <ResetPassStep2 />
        )}
        {step === 3 && (
          <ResetPassStep3 onClose={onCloseModal} />
        )}
      </Stack>
    </PopModal>
  )
}
