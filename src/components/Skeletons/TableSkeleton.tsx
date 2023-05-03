import { ReactElement } from 'react'
import { range } from 'ramda'
import { Skeleton, Table, Thead, Tbody, Th, Tr, Td } from '@chakra-ui/react'

import { TableOverflow } from '~/components/Table'

interface Props {
  columnCount?: number
  rowCount?: number
}

function TableSkeleton (props: Props): ReactElement {
  const { columnCount, rowCount } = props

  const columns = range(0, columnCount)
  const rows = range(0, rowCount)

  return (
    <TableOverflow>
      <Table>
        <Thead>
          <Tr>
            {columns.map(col => (
              <Th key={col}>
                <Skeleton
                  startColor={'gray.400'}
                  endColor={'gray.500'}
                  h={4}
                  w={'80%'}
                />
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {rows.map(row => (
            <Tr key={row}>
              {columns.map(col => (
                <Td key={col}>
                  <Skeleton h={4} />
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableOverflow>
  )
}

TableSkeleton.defaultProps = {
  columnCount: 6,
  rowCount: 6
}

export default TableSkeleton
