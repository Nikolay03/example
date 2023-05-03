import { join, path, pathOr, prop } from 'ramda'

import { DATE_FORMATS, formatFalsyDate } from '~/utils/date'
import * as ENUMS from '~/types/enums'
import { TProductGroupAttributeName, TProductGroupAttributeNameTrade } from '~/types/products'
import {
  STATISTICS_BY_COUNTRY, STATISTICS_BY_PERIOD, STATISTICS_BY_PRODUCT,
  STATISTICS_BY_REGION,
  STATISTICS_BY_SUPER_MARKET, STATISTICS_MARKET_BY_PERIOD,
  STATISTICS_MARKET_BY_PRODUCT, STATISTICS_PRODUCTS_BY_SUPER_MARKET, STATISTICS_SUPER_MARKET_BY_PERIOD
} from '~/constants/api'

interface StatisticsExportPayload {
  commodityGroupClassifier: TProductGroupAttributeNameTrade
  tab: string
  from: Date
  to: Date
}

interface StatisticsTradePayload {
  commodityGroupClassifier: TProductGroupAttributeName
  tab: string
  from: Date
  to: Date
}

interface StatisticsPayload {
  commodityGroupClassifier: TProductGroupAttributeNameTrade
  type: string
  from: Date
  to: Date
  secondFrom?: Date
  secondTo?: Date
}

interface StatisticsApiSwitch {
  type: string
  compare: string
}

export function statisticsExportSerializer (values: StatisticsExportPayload): any {
  const dateFormat = DATE_FORMATS.DATE_FORMAT_SERVER
  return {
    name: path(['commodityGroupClassifier', 'name'], values),
    type: path(['tab'], values),
    from: formatFalsyDate(prop('from', values), dateFormat),
    to: formatFalsyDate(prop('to', values), dateFormat)
  }
}

export function statisticsTradeSerializer (values: StatisticsTradePayload): any {
  return {
    commodity_group_classifier: path(['commodityGroupClassifier', 'id'], values),
    period_type: path(['periodType', 'id'], values)
  }
}

export function statisticsChartSerializer (values: StatisticsPayload): any {
  const dateFormat = DATE_FORMATS.DATE_FORMAT_SERVER
  const compare = path(['compare'], values)
  const type = path(['type'], values)
  const isBozor = type === ENUMS.StatisticsCategoryTypes.BOZOR
  const isSupermarket = type === ENUMS.StatisticsCategoryTypes.SUPERMARKET
  const isSupermarketCompare = compare === ENUMS.StatisticsCompareTypes.SUPERMARKETS
  const isBozorCompare = compare === ENUMS.StatisticsCompareTypes.REGION
  const isCounryCompare = compare === ENUMS.StatisticsCompareTypes.COUNTRY
  const otherValues = {
    type,
    from: formatFalsyDate(prop('from', values), dateFormat),
    to: formatFalsyDate(prop('to', values), dateFormat)
  }
  if (isCounryCompare) {
    return {
      name: path(['commodityGroupClassifier', 'name'], values),
      country_list: join('-', pathOr<string[]>([], ['countryList'], values)),
      ...otherValues
    }
  }
  else if (isBozorCompare) {
    return {
      name: path(['commodityGroupClassifier', 'name'], values),
      region_list: join('-', pathOr<string[]>([], ['countryList'], values)),
      ...otherValues
    }
  }
  else if (isSupermarketCompare) {
    return {
      name: path(['commodityGroupClassifier', 'name'], values),
      super_market_list: join('-', pathOr<string[]>([], ['countryList'], values)),
      ...otherValues
    }
  }
  else if (compare === ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS) {
    return {
      region: path(['region', 'name'], values),
      products_list: join('-', pathOr<string[]>([], ['productsList'], values)),
      ...otherValues
    }
  }
  else if (compare === ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS) {
    return {
      super_market: path(['superMarket', 'name'], values),
      products_list: join('-', pathOr<string[]>([], ['productsList'], values)),
      ...otherValues
    }
  }
  else if (compare === ENUMS.StatisticsCompareTypes.PRODUCTS) {
    return {
      country: path(['country', 'name'], values),
      products_list: join('-', pathOr<string[]>([], ['productsList'], values)),
      ...otherValues
    }
  }
  else if (compare === ENUMS.StatisticsCompareTypes.PERIOD && isBozor) {
    return {
      region: path(['region', 'name'], values),
      name: path(['commodityGroupClassifier', 'name'], values),
      second_from: formatFalsyDate(prop('secondFrom', values), dateFormat),
      second_to: formatFalsyDate(prop('secondTo', values), dateFormat),
      ...otherValues
    }
  }
  else if (compare === ENUMS.StatisticsCompareTypes.PERIOD && isSupermarket) {
    return {
      super_market: path(['superMarket', 'name'], values),
      name: path(['commodityGroupClassifier', 'name'], values),
      second_from: formatFalsyDate(prop('secondFrom', values), dateFormat),
      second_to: formatFalsyDate(prop('secondTo', values), dateFormat),
      ...otherValues
    }
  }
  else if (compare === ENUMS.StatisticsCompareTypes.PERIOD) {
    return {
      country: path(['country', 'name'], values),
      name: path(['commodityGroupClassifier', 'name'], values),
      second_from: formatFalsyDate(prop('secondFrom', values), dateFormat),
      second_to: formatFalsyDate(prop('secondTo', values), dateFormat),
      ...otherValues
    }
  }
  else {
    return { }
  }
}

export const statisticsChartApi = (props: StatisticsApiSwitch) => {
  const activeCategoryType = props.type
  const activeCategoryCompare = props.compare
  const isBozor = activeCategoryType === ENUMS.StatisticsCategoryTypes.BOZOR
  const isSupermarket = activeCategoryType === ENUMS.StatisticsCategoryTypes.SUPERMARKET

  const isSupermarketCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.SUPERMARKETS
  const isBozorCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.REGION
  const isCounryCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.COUNTRY
  return isCounryCompare
    ? STATISTICS_BY_COUNTRY
    : isBozorCompare
      ? STATISTICS_BY_REGION
      : activeCategoryCompare === ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
        ? STATISTICS_MARKET_BY_PRODUCT
        : isSupermarketCompare
          ? STATISTICS_BY_SUPER_MARKET
          : activeCategoryCompare === ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS
            ? STATISTICS_PRODUCTS_BY_SUPER_MARKET
            : activeCategoryCompare === ENUMS.StatisticsCompareTypes.PRODUCTS
              ? STATISTICS_BY_PRODUCT
              : activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD && isBozor
                ? STATISTICS_MARKET_BY_PERIOD
                : activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD && isSupermarket
                  ? STATISTICS_SUPER_MARKET_BY_PERIOD
                  : STATISTICS_BY_PERIOD
}
