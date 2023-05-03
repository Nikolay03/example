import { Checkbox, SimpleGrid } from '@chakra-ui/react'
import { isEmpty, prop } from 'ramda'

import { useStatisticsList } from './StatisticsListProvider'

import { CheckboxGroup } from '~/components/HookForm'
import MailingListSkeleton from '~/components/PageComponents/Account/Mailing/MailingListSkeleton'
import * as ENUMS from '~/types/enums'
import { TableEmptyData } from '~/components/Table'
import { useTranslate } from '~/utils/translate'

interface Props {
  activeCategoryCompare: string
  activeCategoryType: string
  commodityGroupClassifier?: string
  country?: string
  region?: string
  superMarket?: string
}
const StatisticsCheckBoxList = ({
  activeCategoryCompare,
  activeCategoryType,
  commodityGroupClassifier,
  region,
  superMarket,
  country
}: Props) => {
  const { data } = useStatisticsList()
  const { t } = useTranslate()
  const results = prop('results', data) || []
  const countryCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.COUNTRY
  const regionCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.REGION
  const superMarketCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.SUPERMARKETS

  const productsCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.PRODUCTS
  const bazarProductsCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
  const superMarketProductsCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS

  const supermarket = activeCategoryType === ENUMS.StatisticsCategoryTypes.SUPERMARKET
  const bozor = activeCategoryType === ENUMS.StatisticsCategoryTypes.BOZOR
  const exportType = activeCategoryType === ENUMS.StatisticsCategoryTypes.EXPORT
  const importType = activeCategoryType === ENUMS.StatisticsCategoryTypes.IMPORT

  const isLoading = prop('isLoading', data) && (
    ((exportType || importType) && country) ||
    (bozor && region) ||
    (superMarket && supermarket)
  )

  if (!(commodityGroupClassifier || country || region || superMarket || commodityGroupClassifier)) {
    return (
      <TableEmptyData>{t('statistics_empty_text', {
        type: productsCompare
          ? t('country_none_text')
          : bazarProductsCompare
            ? t('input_region_label')
            : superMarketProductsCompare
              ? t('supermarket_none_text')
              : t('product_none_text')
      })}</TableEmptyData>
    )
  }
  else if (isLoading) {
    return (
      <MailingListSkeleton />
    )
  }
  else if (isEmpty(results)) {
    return (
      <TableEmptyData />
    )
  }
  else if ((productsCompare && country) || (bazarProductsCompare && region) ||
    (superMarketProductsCompare && superMarket)) {
    return (
      <CheckboxGroup
        name={'productsList'}
      >
        <SimpleGrid spacing={6} columns={{ base: 1, sm: 2, md: 3 }}>
          {results.map(item => {
            const id = prop('id', item)
            const name = prop('name', item)
            return (
              <Checkbox key={name} value={String(name)}>
                {name}
              </Checkbox>
            )
          })}
        </SimpleGrid>
      </CheckboxGroup>
    )
  }
  else if ((countryCompare || regionCompare || superMarketCompare) && commodityGroupClassifier) {
    return (
      <CheckboxGroup
        name={'countryList'}
      >
        <SimpleGrid spacing={6} columns={{ base: 1, sm: 2, md: 3 }}>
          {results.map(item => {
            const name = prop('name', item)
            return (
              <Checkbox key={name} value={String(name)}>
                {name}
              </Checkbox>
            )
          })}
        </SimpleGrid>
      </CheckboxGroup>
    )
  }
  return null
}

export default StatisticsCheckBoxList
