import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { useRouter } from 'next/router'
import { Box, Flex, Stack } from '@chakra-ui/react'

import { SEARCH_URL } from '~/constants/routes'
import { TProductGroupPopular } from '~/types/products'
import { useTranslate } from '~/utils/translate'
import { getNumberDeclination } from '~/utils/string'
import { Image } from '~/components/Images'

interface Props {
  data: TProductGroupPopular
}

export default function PopularCategoryCard (props: Props): ReactElement {
  const { data } = props

  const router = useRouter()

  const { t, translateData } = useTranslate()

  const id = prop('id', data)
  const parentId = prop('parentId', data)
  const productName = translateData(data, 'name')
  const productImage = path<string>(['image', 'file'], data)
  const count = prop('count', data)
  const countHumanize = getNumberDeclination(count, [
    t('trades_count_variant_1_text'),
    t('trades_count_variant_2_text'),
    t('trades_count_variant_3_text')
  ])

  function onFilterTrades () {
    return router.push({
      pathname: SEARCH_URL,
      query: {
        productCulture: parentId,
        productSpecies: id
      }
    })
  }

  return (
    <Flex
      align={'center'}
      bgColor={'gray.100'}
      borderRadius={'2xl'}
      cursor={'pointer'}
      p={4}
      transition={'all 200ms'}
      _hover={{ bgColor: 'gray.200' }}
      onClick={onFilterTrades}>
      <Image
        alt={productName}
        src={productImage}
        borderRadius={'lg'}
        flexShrink={0}
        h={16}
        w={16}
      />

      <Stack ml={4}>
        <Box fontSize={'lg'} fontWeight={'semibold'} noOfLines={2}>{productName}</Box>
        <Box color={'gray.500'}>{countHumanize}</Box>
      </Stack>
    </Flex>
  )
}
