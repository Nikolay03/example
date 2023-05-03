import { ReactElement } from 'react'
import { Th, Thead, Tr } from '@chakra-ui/react'

import tableHeaderData from './tableHeaderData'

import { useTranslate } from '~/utils/translate'
import { TableSortingLabel } from '~/components/Table'

export default function TradesTableSortingHead (): ReactElement {
  const { t } = useTranslate()

  return (
    <Thead>
      <Tr>
        {tableHeaderData.map((item, index) => {
          if (item.name) {
            return (
              <Th key={index} isNumeric={item.isNumeric}>
                <TableSortingLabel
                  name={item.name}
                  label={t(item.label)}
                />
              </Th>
            )
          }
          return (
            <Th key={index} isNumeric={item.isNumeric}>
              {t(item.label)}
            </Th>
          )
        })}
      </Tr>
    </Thead>
  )
}
