import { Fragment, ReactElement } from 'react'
import { prop } from 'ramda'
import { ModalProps, Stack } from '@chakra-ui/react'

import PriceDetail from './PriceDetail'

import { CURRENCY_UZB } from '~/constants/constants'
import { TBalanceTransaction } from '~/types/balance'
import { useTranslate } from '~/utils/translate'
import { numberFormat, toNumber } from '~/utils/number'
import { PopModal } from '~/components/Modal'
import { DetailValue } from '~/components/Misc'

interface Props extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  detail: TBalanceTransaction
}

export default function TransactionDetailModal (props: Props): ReactElement {
  const { isOpen, onClose, detail } = props

  const { t, translateData } = useTranslate()

  const price = toNumber(prop('price', detail))
  const pricePositive = Math.abs(price)
  const isDebit = price < 0

  const invoice = prop('invoice', detail)
  const invoiceId = prop('id', invoice)
  const createdDate = prop('createdDate', detail)
  const comment = prop('comment', detail)
  const details = invoice ? translateData(invoice, 'name') : comment
  const paymentType = prop('paymentType', invoice)

  const title = isDebit
    ? t('account_balance_trans_detail_debit_title')
    : t('account_balance_trans_detail_accrual_title')

  const priceTitle = isDebit
    ? t('account_balance_trans_detail_debit_amount')
    : t('account_balance_trans_detail_accrual_amount')

  return (
    <PopModal
      title={title}
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
                label={t('account_balance_trans_th_detail')}
                value={details}
                fontWeight={'semibold'}
              />
              {paymentType && (
                <DetailValue
                  label={t('account_balance_trans_th_payment_type')}
                  value={paymentType}
                  fontWeight={'semibold'}
                />
              )}
            </Stack>

            <PriceDetail
              label={priceTitle}
              price={numberFormat(pricePositive, CURRENCY_UZB)}
            />
          </Fragment>
        )}
      </Fragment>
    </PopModal>
  )
}
