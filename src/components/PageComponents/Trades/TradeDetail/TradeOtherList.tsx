import { ReactElement } from 'react'
import { isEmpty, prop } from 'ramda'
import { Box, SimpleGrid } from '@chakra-ui/react'

import TradesSimilarCard from '../TradesSimilarCard'

import { TTrades } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { SubTitle } from '~/components/Titles'

interface Props {
  data: TTrades
}

export default function TradeOtherList (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const product = prop('commodityGroupClassifier', data)
  const productName = translateData(product, 'name')
  const otherBargains = prop('otherBargains', data) || []

  if (isEmpty(otherBargains)) {
    return null
  }

  return (
    <Box>
      <SubTitle>
        {t('trades_other_title', { productName })}
      </SubTitle>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={6}>
        {otherBargains.map(trade => (
          <TradesSimilarCard key={trade.id} data={trade} />
        ))}
      </SimpleGrid>
    </Box>
  )
}
