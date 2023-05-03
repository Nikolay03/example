import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Heading, Stack, Text } from '@chakra-ui/react'

import { TRADES_DETAIL_URL } from '~/constants/routes'
import { TTradesOther } from '~/types/trades'
import { getUserReputation } from '~/utils/get'
import { useTranslate } from '~/utils/translate'
import { Image } from '~/components/Images'
import { MoreButton } from '~/components/Buttons'

interface Props {
  data: TTradesOther
}

export default function TradesSimilarCard (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const id = prop('id', data)
  const image = path<string>(['image', 'file'], data)
  const user = prop('user', data)
  const commodityGroupClassifier = prop('commodityGroupClassifier', data)
  const productName = translateData(commodityGroupClassifier, 'name')

  const detailUrl = sprintf(TRADES_DETAIL_URL, id)
  const userRating = getUserReputation(user)
  const userRatingLabel = t('rating_individual_label', {
    rating: userRating
  })

  return (
    <Stack align={'center'} direction={'row'} spacing={4}>
      <Image
        alt={productName}
        src={image}

        borderRadius={'xl'}
        minW={'150px'}
        h={'110px'}
      />

      <Stack align={'baseline'}>
        <Heading
          as={'h3'}
          fontSize={'xl'}
          title={productName}
          noOfLines={2}>
          {productName}
        </Heading>

        <Text color={'gray.500'}>{userRatingLabel}</Text>

        <MoreButton href={detailUrl}>
          {t('button_more_details')}
        </MoreButton>
      </Stack>
    </Stack>
  )
}
