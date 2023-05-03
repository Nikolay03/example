import { ReactElement, useState } from 'react'
import { omit, prop } from 'ramda'
import { Check } from 'react-feather'
import { Button, Icon, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'

import InvoiceDetailModal, { TInvoiceDetail } from './InvoiceDetailModal'
import InvoicePayModal from './InvoicePayModal'

import * as API from '~/constants/api'
import { CURRENCY_UZB } from '~/constants/constants'
import { InvoiceStatuses } from '~/types/enums'
import { TBalanceInvoice } from '~/types/balance'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { useDateFormat, DATE_FORMATS } from '~/utils/date'
import { useToast } from '~/hooks/index'
import { useRequest } from '~/hooks/api'
import { useCreate } from '~/hooks/crud'
import { useRouterQuery } from '~/hooks/url'
import { useAuth } from '~/components/AuthProvider'
import { AccountContainer } from '~/components/PageComponents/Account'
import { TableOverflow } from '~/components/Table'
import { TableSkeleton } from '~/components/Skeletons'
import StatusTag from '~/components/StatusTag'
import Pagination from '~/components/Pagination'

const statusColors = {
  [InvoiceStatuses.PAID]: 'primary.500',
  [InvoiceStatuses.PENDING]: 'palette.common.orange',
  [InvoiceStatuses.CANCEL]: 'palette.common.red'
}

export default function BalanceInvoiceTable (): ReactElement {
  const { urlQuery } = useRouterQuery()

  const { t, translateData } = useTranslate()

  const { dateFormat } = useDateFormat()

  const { fetchUserInfo } = useAuth()

  const toast = useToast()

  const params = omit(['tab'], urlQuery)

  const { results, count, isLoading, refetch } = useRequest<TBalanceInvoice>(API.BALANCE_INVOICE_LIST, {
    disableUrlParams: true,
    params
  })

  const payInvoice = useCreate(API.BALANCE_INVOICE_PAY)

  const [detail, setDetail] = useState<TInvoiceDetail>(null)

  const {
    isOpen: isOpenDetail,
    onOpen: onOpenDetail,
    onClose: onCloseDetail
  } = useDisclosure()

  const {
    isOpen: isOpenPay,
    onOpen: onOpenPay,
    onClose: onClosePay
  } = useDisclosure()

  function onOpenDetailModal (data: TInvoiceDetail) {
    setDetail(data)
    onOpenDetail()
  }
  function onCloseDetailModal () {
    setDetail(null)
    onCloseDetail()
  }

  function onOpenPayModal (data: TInvoiceDetail) {
    setDetail(data)
    onOpenPay()
  }
  function onClosePayModal () {
    setDetail(null)
    onClosePay()
  }

  function onSubmitPayModal (invoice: number) {
    return payInvoice.create({ invoice })
      .then(() => {
        toast({
          title: t('account_balance_invoice_pay_success_title'),
          description: t('account_balance_invoice_pay_success_message'),
          status: 'success'
        })
      })
      .then(onClosePayModal)
      .then(fetchUserInfo)
      .then(() => refetch(params))
      .catch(({ detail }) => {
        toast({
          title: t('error_default_label'),
          description: detail,
          status: 'error'
        })
      })
  }

  if (isLoading) {
    return (
      <TableSkeleton
        columnCount={6}
        rowCount={4}
      />
    )
  }

  return (
    <AccountContainer>
      <TableOverflow>
        <Table>
          <Thead>
            <Tr>
              <Th>
                {t('account_balance_th_id')}
              </Th>
              <Th>
                {t('account_balance_th_date')}
              </Th>
              <Th>
                {t('account_balance_invoice_th_name')}
              </Th>
              <Th>
                {t('account_balance_invoice_th_price')}
              </Th>
              <Th>
                {t('account_balance_invoice_th_status')}
              </Th>
              <Th textAlign={'center'}>
                {t('account_balance_th_action')}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map(item => {
              const id = prop('id', item)
              const createdDate = dateFormat(prop('createdDate', item), DATE_FORMATS.DATETIME_FORMAT_SHORT_SIMPLE)
              const name = translateData(item, 'name')
              const price = Math.abs(Number(prop('price', item)))
              const priceCurrency = numberFormat(price, CURRENCY_UZB)
              const status = prop('status', item)
              const statusName = t(`account_balance_invoice_status_${status}`)
              const statusColor = statusColors[status]

              const data = {
                ...item,
                createdDate,
                price: priceCurrency,
                statusName,
                statusColor
              }

              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{createdDate}</Td>
                  <Td>{name}</Td>
                  <Td>{priceCurrency}</Td>
                  <Td>
                    <StatusTag color={statusColor}>
                      {statusName}
                    </StatusTag>
                  </Td>
                  <Td textAlign={'center'}>
                    {status === InvoiceStatuses.PAID && (
                      <Icon as={Check} boxSize={5} color={'primary.500'} />
                    )}
                    {status === InvoiceStatuses.PENDING && (
                      <Button minW={24} size={'xs'} onClick={() => onOpenPayModal(data)}>
                        {t('account_balance_invoice_pay')}
                      </Button>
                    )}
                    {status === InvoiceStatuses.CANCEL && (
                      <Button
                        borderColor={'gray.500'}
                        borderWidth={1}
                        minW={24}
                        size={'xs'}
                        variant={'white'}
                        onClick={() => onOpenDetailModal(data)}>
                        {t('account_balance_invoice_details')}
                      </Button>
                    )}
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableOverflow>

      <Pagination totalRecords={count} />

      <InvoiceDetailModal
        isOpen={isOpenDetail}
        onClose={onCloseDetailModal}
        detail={detail}
      />

      <InvoicePayModal
        isOpen={isOpenPay}
        onClose={onClosePayModal}
        detail={detail}
        isLoading={payInvoice.isLoading}
        onSubmit={onSubmitPayModal}
      />
    </AccountContainer>
  )
}
