import { ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'

import StepTradesInfo from './StepTradesInfo'
import StepTransferInfo from './StepTransferInfo'
import StepProductInfo from './StepProductInfo'

import { TObject } from '~/types/constants'
import { useTranslate } from '~/utils/translate'
import { WizardFormProvider, useModal, useStepper } from '~/components/Utils/Contexts'
import { ModalDescription, PopModal } from '~/components/Modal'
import Stepper from '~/components/Stepper'

interface Props {
  isUpdate?: boolean
  initialState?: TObject
}

export default function TradesCreateModal (props: Props): ReactElement {
  const { isUpdate, initialState } = props

  const { t } = useTranslate()

  const { isOpen, onClose } = useModal()

  const { step } = useStepper()

  const title = isUpdate
    ? t('trades_update_modal_title')
    : t('trades_create_modal_title')

  return (
    <PopModal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      size={'5xl'}>
      <Stack mb={10} spacing={8}>
        {!isUpdate && (
          <ModalDescription>
            {t('trades_create_description')}
          </ModalDescription>
        )}

        <Stepper bgColor={'gray.100'} borderColor={'gray.200'} />
      </Stack>

      <WizardFormProvider
        initialState={initialState}
        isUpdate={isUpdate}>
        {step === 1 && <StepTradesInfo />}
        {step === 2 && <StepTransferInfo />}
        {step === 3 && <StepProductInfo />}
      </WizardFormProvider>
    </PopModal>
  )
}
