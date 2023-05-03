import { ReactElement, useState } from 'react'
import { omit, prop } from 'ramda'
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'

import TransactionDetailModal from './TransactionDetailModal'

import * as API from '~/constants/api'
import { CURRENCY_UZB } from '~/constants/constants'
import { TBalanceTransaction } from '~/types/balance'
import { numberFormat, toNumber } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { useDateFormat, DATE_FORMATS } from '~/utils/date'
import { useRequest } from '~/hooks/api'
import { useRouterQuery } from '~/hooks/url'
import { AccountContainer } from '~/components/PageComponents/Account'
import { TableSkeleton } from '~/components/Skeletons'
import { TableOverflow } from '~/components/Table'
import Pagination from '~/components/Pagination'

export default function BalanceTransactionsTable (): ReactElement {
  const { urlQuery } = useRouterQuery()

  const { t, translateData } = useTranslate()

  const { dateFormat } = useDateFormat()

  const { results, count, isLoading } = useRequest<TBalanceTransaction>(API.BALANCE_TRANSACTION_LIST, {
    disableUrlParams: true,
    params: omit(['tab'], urlQuery)
  })

  const [detail, setDetail] = useState<TBalanceTransaction>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()

  function onOpenModal (data: TBalanceTransaction) {
    setDetail(data)
    onOpen()
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
                {t('account_balance_trans_th_detail')}
              </Th>
              <Th>
                {t('account_balance_trans_th_accrual')}
              </Th>
              <Th>
                {t('account_balance_trans_th_debit')}
              </Th>
              <Th>
                {t('account_balance_th_action')}
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {results.map(item => {
              const id = prop('id', item)
              const createdDate = dateFormat(prop('createdDate', item), DATE_FORMATS.DATETIME_FORMAT_SHORT_SIMPLE)
              const price = prop('price', item)
              const priceNumber = toNumber(price)
              const accrual = priceNumber > 0 ? price : 0
              const debit = priceNumber < 0 ? Math.abs(priceNumber) : 0
              const invoice = prop('invoice', item)
              const comment = prop('comment', item)
              const details = invoice ? translateData(invoice, 'name') : comment

              return (
                <Tr key={id}>
                  <Td>{id}</Td>
                  <Td>{createdDate}</Td>
                  <Td>{details}</Td>
                  <Td>{numberFormat(accrual, CURRENCY_UZB)}</Td>
                  <Td>{numberFormat(debit, CURRENCY_UZB)}</Td>
                  <Td>
                    <Button
                      borderColor={'gray.500'}
                      borderWidth={1}
                      minW={24}
                      size={'xs'}
                      variant={'white'}
                      onClick={() => onOpenModal({ ...item, createdDate, price })}>
                      {t('account_balance_invoice_details')}
                    </Button>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableOverflow>

      <Pagination totalRecords={count} />

      <TransactionDetailModal
        detail={detail}
        isOpen={isOpen}
        onClose={onClose}
      />
    </AccountContainer>
  )
}
