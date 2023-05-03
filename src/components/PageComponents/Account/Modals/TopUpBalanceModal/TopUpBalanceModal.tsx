import { ReactElement } from 'react'
import { Button, ModalProps, Stack } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { BalancePaymentTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useCreate } from '~/hooks/crud'
import { ModalDescription, PopModal } from '~/components/Modal'
import { HookForm, NumberInput, PaymentRadio } from '~/components/HookForm'

function redirectOnSuccess ({ link }: { link: string }) {
  window.location.replace(link)
}

export default function TopUpBalanceModal (props: Pick<ModalProps, 'isOpen' | 'onClose'>): ReactElement {
  const { isOpen, onClose } = props

  const { t } = useTranslate()

  const { isLoading, ...topUpBalance } = useCreate(API.TOP_UP_BALANCE)

  function onSubmit (values) {
    return topUpBalance.create(values)
      .then(redirectOnSuccess)
      .then(onClose)
  }

  return (
    <PopModal
      title={t('account_balance_top_up')}
      isOpen={isOpen}
      onClose={onClose}>
      <HookForm onSubmit={onSubmit}>
        <Stack spacing={6}>
          <ModalDescription>
            {t('account_balance_top_up_description')}
          </ModalDescription>

          <PaymentRadio
            name={'paymentType'}
            label={t('account_balance_top_up_choose_type')}
            defaultValue={BalancePaymentTypes.PAYME}
            isRequired={true}
          />

          <NumberInput
            name={'price'}
            label={t('input_balance_top_up_amount')}
            isRequired={true}
            size={'xl'}
            rules={{ required: true }}
          />

          <Button
            borderRadius={'xl'}
            isLoading={isLoading}
            size={'lg'}
            type={'submit'}>
            {t('account_balance_top_up')}
          </Button>
        </Stack>
      </HookForm>
    </PopModal>
  )
}
