import { Fragment, ReactElement } from 'react'
import { prop } from 'ramda'
import { Button, ModalProps, Stack } from '@chakra-ui/react'

import { TInvoiceDetail } from './InvoiceDetailModal'
import PriceDetail from './PriceDetail'

import { useTranslate } from '~/utils/translate'
import { PopModal } from '~/components/Modal'
import { DetailValue } from '~/components/Misc'

interface Props extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  isLoading: boolean
  onSubmit: (invoice: number) => Promise<void>
  detail?: TInvoiceDetail
}

export default function InvoicePayModal (props: Props): ReactElement {
  const { isOpen, onClose, onSubmit, isLoading, detail } = props

  const { t, translateData } = useTranslate()

  const invoiceId = prop('id', detail)
  const createdDate = prop('createdDate', detail)
  const price = prop('price', detail)
  const name = translateData(detail, 'name')

  return (
    <PopModal
      title={t('account_balance_invoice_pay_title')}
      isOpen={isOpen}
      onClose={onClose}>
      <Fragment>
        {detail && (
          <Fragment>
            <Stack spacing={6}>
              <DetailValue
                label={t('account_balance_trans_th_invoice_number')}
                value={invoiceId}
                fontWeight={'semibold'}
              />
              <DetailValue
                label={t('account_balance_th_date')}
                value={createdDate}
                fontWeight={'semibold'}
              />
              <DetailValue
                label={t('account_balance_invoice_th_name')}
                value={name}
                fontWeight={'semibold'}
              />
            </Stack>

            <Stack spacing={10}>
              <PriceDetail
                label={t('account_balance_trans_detail_debit_amount')}
                price={price}
              />

              <Button
                alignSelf={'center'}
                isLoading={isLoading}
                size={'lg'}
                onClick={onSubmit.bind(null, invoiceId)}>
                {t('account_balance_invoice_pay_title')}
              </Button>
            </Stack>
          </Fragment>
        )}
      </Fragment>
    </PopModal>
  )
}
