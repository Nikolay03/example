import { ReactElement } from 'react'
import { Th, Thead, Tr } from '@chakra-ui/react'

import tableHeaderData from './tableHeaderData'

import { useTranslate } from '~/utils/translate'

export default function TradesTableSimpleHead (): ReactElement {
  const { t } = useTranslate()

  return (
    <Thead>
      <Tr>
        {tableHeaderData.map((item, index) => (
          <Th key={index} isNumeric={item.isNumeric}>
            {t(item.label)}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
}
