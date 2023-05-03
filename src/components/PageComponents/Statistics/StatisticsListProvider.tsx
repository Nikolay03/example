/* eslint-disable max-len */
import { createContext, ReactElement, ReactNode, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { prop } from 'ramda'

import * as API from '~/constants/api'
import { UseList, useList } from '~/hooks/crud'
import { TObject } from '~/types/constants'
import * as ENUMS from '~/types/enums'
import { TProductGroupAttributeNameTrade } from '~/types/products'
import { DATE_FORMATS, formatFalsyDate } from '~/utils/date'

type TTradesListContext = {
  data: UseList<TProductGroupAttributeNameTrade>
  fetchStatistics: (params?: TObject) => void
}

const StatisticsListContext = createContext<TTradesListContext>({
  data: null,
  fetchStatistics: null
})

interface Props {
  children: ReactNode
  type: string
  compare?: string
}

export function StatisticsListProvider (props: Props): ReactElement {
  const { children, type, compare } = props
  const { watch } = useFormContext()
  const commodityGroupClassifier = watch('commodityGroupClassifier')?.name
  const country = watch('country')?.name
  const region = watch('region')?.name
  const superMarket = watch('superMarket')?.name
  const from = formatFalsyDate(watch('from'), DATE_FORMATS.DATE_FORMAT_SERVER)
  const to = formatFalsyDate(watch('to'), DATE_FORMATS.DATE_FORMAT_SERVER)
  const { query: { page, ordering } } = useRouter()

  const isProductsMarketList = compare === ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
  const isProductsSuperMarketList = compare === ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS
  const isProductsList = compare === ENUMS.StatisticsCompareTypes.PRODUCTS

  const isCountryList = compare === ENUMS.StatisticsCompareTypes.COUNTRY
  const isRegionList = compare === ENUMS.StatisticsCompareTypes.REGION
  const isSuperMarketList = compare === ENUMS.StatisticsCompareTypes.SUPERMARKETS

  const countryList = useList<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_COUNTRY_LIST, null, false)
  const regionList = useList<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_REGION_LIST, null, false)
  const superMarketList = useList<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_SUPER_MARKET_LIST, null, false)

  const productsList = useList<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_SELECT_LIST, null, false)
  const productsMarketList = useList<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_MARKET_SELECT_LIST, null, false)
  const productsSuperMarketList = useList<TProductGroupAttributeNameTrade>(API.PRODUCT_TRADE_SUPER_MARKET_SELECT_LIST, null, false)

  function fetchStatistics (params?: TObject) {
    console.warn(params)
    // products
    if (isProductsMarketList && params?.region) {
      return productsMarketList.getList({
        pageSize: 100,
        ...params
      })
    }
    else if (isProductsSuperMarketList && params?.superMarket) {
      return productsSuperMarketList.getList({
        pageSize: 100,
        ...params
      })
    }
    else if (isProductsList && country) {
      return productsList.getList({
        pageSize: 100,
        ...params
      })
    }
    // zones
    else if (params?.product) {
      if (isCountryList) {
        return countryList.getList({
          pageSize: 100,
          ...params
        })
      }
      else if (isRegionList) {
        return regionList.getList({
          pageSize: 100,
          ...params
        })
      }
      else if (isSuperMarketList) {
        return superMarketList.getList({
          pageSize: 100,
          ...params
        })
      }
    }
    return null
  }

  useEffect(() => {
    fetchStatistics({
      page,
      ordering,
      product: commodityGroupClassifier,
      country,
      region,
      superMarket,
      type,
      from,
      to
    })
  }, [compare, page, ordering, commodityGroupClassifier, country, region, superMarket, type, from, to])

  // @ts-ignore
  const valueData: {[key in ENUMS.StatisticsCompareTypes]} = {
    [ENUMS.StatisticsCompareTypes.COUNTRY]: countryList,
    [ENUMS.StatisticsCompareTypes.REGION]: regionList,
    [ENUMS.StatisticsCompareTypes.SUPERMARKETS]: superMarketList,

    [ENUMS.StatisticsCompareTypes.PRODUCTS]: productsList,
    [ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS]: productsMarketList,
    [ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS]: productsSuperMarketList

  }
  const currentTabData = valueData[compare]
  return (
    <StatisticsListContext.Provider value={{ data: currentTabData, fetchStatistics }}>
      {children}
    </StatisticsListContext.Provider>
  )
}

export function useStatisticsList (): TTradesListContext {
  return useContext(StatisticsListContext)
}
