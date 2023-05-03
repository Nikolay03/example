import { ReactElement } from 'react'
import { prop, path } from 'ramda'
import { Box, Button, Flex, Stack } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { numberFormat } from '~/utils/number'
import BlurBox from '~/components/PageComponents/Home/ProductsCarouselSection/BlurBox'
import { TProductBanner } from '~/types/products'
import Link from '~/components/Link/Link'
import { TRADES_URL } from '~/constants/routes'

interface Props {
  data: TProductBanner
}

export default function ProductsCarouselCard (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const price = prop('price', data)
  const measurement = prop('measurement', data)
  const commodityGroupClassifier = prop('commodityGroupClassifier', data)
  const commodityGroupClassifierParent = path(['commodityGroupClassifier', 'parent'], data)
  const measurementName = translateData(measurement, 'name')
  const commodityGroupClassifierName = translateData(commodityGroupClassifier, 'name')
  const commodityGroupClassifierParentName = translateData(commodityGroupClassifierParent, 'name')

  return (
    <Box pos={'relative'}>
      <Flex justify={'space-between'}>
        <BlurBox mb={20} maxW={'659px'} ml={'1px'}>
          <Box p={70} pos={'relative'} zIndex={1}>
            <Stack spacing={6}>
              <Box
                fontSize={{ base: '2rem', md: '4xl' }}
                fontWeight={'bold'}
              >
                {t('product_carousel_description')}
              </Box>
              <Button size={'lg'} as={Link} href={TRADES_URL}>{t('product_carousel_button')}</Button>
            </Stack>
          </Box>
        </BlurBox>
        <BlurBox maxW={'392px'} h={'min-content'} alignSelf={'end'}>
          <Box p={8} pos={'relative'} zIndex={1}>
            <Stack spacing={6}>
              <Box
                fontSize={'3xl'}
                fontWeight={'bold'}
              >
                {commodityGroupClassifierName} - {commodityGroupClassifierParentName}
              </Box>
              <Box
                fontWeight={'semibold'}
              >
                {t('home_product_cost')} {numberFormat(price)}/{measurementName}
              </Box>
            </Stack>
          </Box>
        </BlurBox>
      </Flex>
    </Box>
  )
}
