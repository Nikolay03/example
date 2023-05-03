/* eslint-disable max-len */
import { ReactElement } from 'react'
import { path, prop } from 'ramda'
import { Box, Text, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import TradesStatus from '../../Trades/TradesStatus'

import { Image } from '~/components/Images'
import { TProductBanner } from '~/types/products'
import { useTranslate } from '~/utils/translate'
import ProductsCardActions from '~/components/PageComponents/Home/ProductsSection/ProductsCardActions'
import { numberFormat } from '~/utils/number'
import { TRADES_URL } from '~/constants/routes'
import Link from '~/components/Link'

interface Props {
  data: TProductBanner
}

export default function ProductsCard (props: Props): ReactElement {
  const { data } = props
  const { translateData, t } = useTranslate()
  const router = useRouter()
  const measurement = prop('measurement', data)
  const measurementName = translateData(measurement, 'name')
  const commodityGroupClassifier = prop('commodityGroupClassifier', data)
  const deliveryRegion = path(['deliveryDistrict', 'region'], data)
  const deliveryRegionName = translateData(deliveryRegion, 'name')
  const deliveryDistrict = path(['deliveryDistrict'], data)
  const id = path(['id'], data)
  const deliveryDistrictName = translateData(deliveryDistrict, 'name')
  const commodityGroupClassifierParentImage = path(['commodityGroupClassifier', 'parent', 'image', 'file'], data) as string
  const commodityGroupClassifierName = translateData(commodityGroupClassifier, 'name')
  const price = prop('price', data)
  const detailUrl = `${TRADES_URL}/${id}`
  return (
    <Box bg={'gray.100'}
      _hover={{
        '& .ProductsCardActions': {
          display: 'flex'
        }
      }}
    >
      <Image
        alt={commodityGroupClassifierName}
        src={commodityGroupClassifierParentImage}
        h={{ base: '170px', md: '250px', lg: '400px' }}
        sx={{
          '& > div': {
            width: '100%',
            height: '100%'
          }
        }}
      >
        <Box
          position={'absolute'}
          top={0} left={0} right={0} bottom={0}
          className={'ProductsCardActions'}
          display={'none'}
          transition={'all 200ms'}
        >
          <ProductsCardActions data={data} />
        </Box>
      </Image>
      <Box p={{ base: '12px', md: '20px' }}>
        <Flex mb={2}>
          <Text
            as={Link}
            href={detailUrl}
            fontSize={{ base: 'sm', md: '2xl', xl: '3xl' }}
            lineHeight={'38px'}
            cursor={'pointer'}
            _hover={{ color: 'primary.500' }}
          >
            {commodityGroupClassifierName}
          </Text>
        </Flex>

        <Text fontSize={{ base: 'xs', md: 'lg' }} color={'gray.450'} noOfLines={4} mb={2} lineHeight={'base'}>
          {deliveryRegionName}, {deliveryDistrictName}
        </Text>

        <Text noOfLines={4} color={{ base: 'primary.500', lg: 'palette.common.darkGray' }} fontSize={{ base: 'sm', md: '2xl' }}>
          {t('home_product_cost')} {numberFormat(price)} / {measurementName}
        </Text>
      </Box>
    </Box>
  )
}
