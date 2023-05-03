import { Fragment, ReactElement } from 'react'
import { prop } from 'ramda'
import { ModalProps, Stack } from '@chakra-ui/react'

import PriceDetail from './PriceDetail'

import { TBalanceInvoice } from '~/types/balance'
import { useTranslate } from '~/utils/translate'
import InvoiceCancelled from '~/icons/modals/InvoiceCancelled'
import { PopModal, ModalTitle } from '~/components/Modal'
import { DetailValue } from '~/components/Misc'
import StatusTag from '~/components/StatusTag'

export type TInvoiceDetail = TBalanceInvoice & {
  statusName: string
  statusColor: string
}

interface Props extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  detail?: TInvoiceDetail
}

export default function InvoiceDetailModal (props: Props): ReactElement {
  const { isOpen, onClose, detail } = props

  const { t, translateData } = useTranslate()

  const invoiceId = prop('id', detail)
  const createdDate = prop('createdDate', detail)
  const price = prop('price', detail)
  const statusName = prop('statusName', detail)
  const statusColor = prop('statusColor', detail)
  const name = translateData(detail, 'name')

  return (
    <PopModal
      isOpen={isOpen}
      onClose={onClose}>
      <Fragment>
        {detail && (
          <Fragment>
            <Stack spacing={9}>
              <Stack align={'center'} spacing={5}>
                <InvoiceCancelled />

                <ModalTitle>
                  {t('account_balance_invoice_detail_title')}
                </ModalTitle>
              </Stack>

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
                  label={t('account_balance_invoice_th_status')}
                  value={<StatusTag color={statusColor}>{statusName}</StatusTag>}
                  fontWeight={'semibold'}
                />
                <DetailValue
                  label={t('account_balance_invoice_th_name')}
                  value={name}
                  fontWeight={'semibold'}
                />
              </Stack>
            </Stack>

            <PriceDetail
              label={t('account_balance_invoice_total_amount')}
              price={price}
            />
          </Fragment>
        )}
      </Fragment>
    </PopModal>
  )
}
