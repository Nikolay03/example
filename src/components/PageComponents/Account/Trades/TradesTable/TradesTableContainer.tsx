import { ReactElement } from 'react'

import { useTradesList } from '../TradesListProvider'

import TradesTable from './TradesTable'

import { AccountContainer } from '~/components/PageComponents/Account'
import { TableSkeleton } from '~/components/Skeletons'
import { TableOverflow } from '~/components/Table'
import Pagination from '~/components/Pagination'

export default function TradesTableContainer (): ReactElement {
  const { data } = useTradesList()
  const { results, count, isLoading } = data

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
        <TradesTable results={results} />
      </TableOverflow>

      <Pagination totalRecords={count} />
    </AccountContainer>
  )
}
