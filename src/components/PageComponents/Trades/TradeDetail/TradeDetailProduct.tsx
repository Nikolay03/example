import { ReactElement, useState } from 'react'
import { isEmpty, not, path, prop } from 'ramda'
import { Box, SimpleGrid, Stack, Text, Image as ChakraImage } from '@chakra-ui/react'

import TradeDocument from './TradeDocument'

import { TTrades } from '~/types/trades'
import { TFile } from '~/types/files'
import { getCommodityProductName } from '~/utils/get'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { DashedDivider, DetailValue } from '~/components/Misc'
import { SubTitle } from '~/components/Titles'
import { Image } from '~/components/Images'
import { PopModal } from '~/components/Modal'

interface Props {
  data: TTrades
}

export default function TradeDetailProduct (props: Props): ReactElement {
  const { data } = props

  const { t, translateData } = useTranslate()

  const product = prop('commodityGroupClassifier', data)
  const productName = translateData(product, 'name')
  const parentProduct = prop('parent', product)
  const parentProductName = translateData(parentProduct, 'name')
  const formedProductName = getCommodityProductName(productName, parentProductName)
  const description = prop('description', data)

  const manufacturerCountry = prop('manufacturerCountry', data)
  const qualityStandard = path(['qualityStandard', 'name'], data)
  const manufacturerCountryName = translateData(manufacturerCountry, 'name')

  const price = prop('price', data)
  const currency = prop('currency', data)
  const currencyName = translateData(currency, 'designation')
  const priceContent = numberFormat(price, currencyName)

  const volume = prop('volume', data)
  const measurement = prop('measurement', data)
  const measurementName = translateData(measurement, 'name')
  const measurementDesignation = translateData(measurement, 'designation') || ''
  const volumeContent = `${numberFormat(volume, measurementDesignation)} (${measurementName})`

  const attributes = prop('attributes', data) || []
  const hasAttributes = not(isEmpty(attributes))
  const attributesContent = (
    <Stack spacing={6}>
      {attributes.map(attr => {
        const attrId = prop('id', attr)
        const attrName = translateData(prop('commodityName', attr), 'name')
        const attrValue = translateData(attr, 'value')

        return (
          <DetailValue
            key={attrId}
            label={attrName}
            value={attrValue}
          />
        )
      })}
    </Stack>
  )

  const documents = prop('documents', data) || []
  const hasDocuments = not(isEmpty(documents))
  const documentsContent = (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
      {documents.map(doc => (
        <TradeDocument key={doc.id} file={doc} />
      ))}
    </SimpleGrid>
  )

  return (
    <Box overflow={'hidden'}>
      <Stack spacing={8}>
        <DashedDivider />
        <Stack spacing={6}>
          <Box>
            <SubTitle>{formedProductName}</SubTitle>
            <Text>{description}</Text>
          </Box>

          <Stack spacing={6}>
            <DetailValue
              label={t('trades_detail_producing_country_label')}
              value={manufacturerCountryName}
            />
            <DetailValue
              label={t('trades_detail_product_price_label', {
                measurementShort: measurementDesignation,
                measurementLong: measurementName
              })}
              value={priceContent}
            />
            <DetailValue
              label={t('trades_detail_product_volume_label')}
              value={volumeContent}
            />
            {qualityStandard && (
              <DetailValue
                label={t('trades_detail_producing_quality_standard_label')}
                value={qualityStandard}
              />
            )}
          </Stack>
        </Stack>

        {hasAttributes && (
          <DetailValue
            label={t('trades_detail_product_attributes_label')}
            value={attributesContent}
            variant={'block'}
            fontWeight={'semibold'}
          />
        )}

        {hasDocuments && (
          <DetailValue
            label={t('trades_detail_product_documents_label')}
            value={documentsContent}
            variant={'block'}
            fontWeight={'semibold'}
          />
        )}
      </Stack>
    </Box>
  )
}
