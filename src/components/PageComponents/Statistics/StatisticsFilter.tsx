/* eslint-disable max-len */
import { ReactElement } from 'react'
import { omit, prop } from 'ramda'
import { Box, Button, SimpleGrid, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { StatisticsListProvider } from './StatisticsListProvider'
import StatisticsCheckBoxList from './StatisticsCheckBoxList'

import { useTranslate } from '~/utils/translate'
import { Categories, useCategories, CategoryItem } from '~/components/Categories'
import * as CONST from '~/constants/constants'
import { DatePicker, HookForm, SelectField } from '~/components/HookForm'
import { filterSelectedEndDate } from '~/utils/datePicker'
import { useWizard } from '~/components/Utils/Contexts'
import * as API from '~/constants/api'
import * as ENUMS from '~/types/enums'
import { statisticsChartApi, statisticsChartSerializer } from '~/hooks/form/useSubmitStatistics'
import { TRefetchList } from '~/types/hooks'
import { useRouterQuery } from '~/hooks/url'

export const STATISTICS_CATEGORY_TWO = 'compareCategory'

type FormatDateValues = Record<string, Date>

interface Props {
  refetch: TRefetchList
  dateValues: FormatDateValues
}

export default function StatisticsFilter ({ refetch, dateValues }: Props): ReactElement {
  const { t } = useTranslate()

  const router = useRouter()
  const { routerQuery } = useRouterQuery()
  const { activeCategory: activeCategoryType, onSelectCategory } = useCategories()
  const {
    activeCategory: activeCategoryCompare, onSelectCategory: onSelectCategoryCompare
  } = useCategories(STATISTICS_CATEGORY_TWO)
  const isBazar = activeCategoryType === ENUMS.StatisticsCategoryTypes.BOZOR
  const isSupermarket = activeCategoryType === ENUMS.StatisticsCategoryTypes.SUPERMARKET

  const isCounryCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.COUNTRY
  const isBazarCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.REGION
  const isSupermarketCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.SUPERMARKETS

  const isCounryProductsCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.PRODUCTS
  const isBazarProductsCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
  const isSupermarketProductsCompare = activeCategoryCompare === ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS

  const { state, dispatch } = useWizard()
  function onSubmit (values) {
    dispatch(values)
    const api = statisticsChartApi({ type: activeCategoryType, compare: activeCategoryCompare })
    const params = statisticsChartSerializer({ type: activeCategoryType, compare: activeCategoryCompare, ...values })
    return refetch(params, api)
  }

  const compareFilterList = CONST.STATISTICS_COMPARE.list.filter(i => {
    if (isBazar) {
      return i.id !== ENUMS.StatisticsCompareTypes.SUPERMARKETS && i.id !== ENUMS.StatisticsCompareTypes.COUNTRY &&
      i.id !== ENUMS.StatisticsCompareTypes.PRODUCTS && i.id !== ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS
    }
    else if (isSupermarket) {
      return i.id !== ENUMS.StatisticsCompareTypes.REGION && i.id !== ENUMS.StatisticsCompareTypes.COUNTRY &&
        i.id !== ENUMS.StatisticsCompareTypes.PRODUCTS && i.id !== ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
    }
    else {
      return i.id !== ENUMS.StatisticsCompareTypes.REGION && i.id !== ENUMS.StatisticsCompareTypes.SUPERMARKETS &&
        i.id !== ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS && i.id !== ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
    }
  })
  return (
    <HookForm
      defaultValues={state}
      isPromise={false}
      onSubmit={onSubmit}
      render={({ onSubmitForm, watch, reset }) => {
        const startDate = watch('from')
        const startSecondDate = watch('secondFrom')
        const commodityGroupClassifier = watch('commodityGroupClassifier')?.name
        const country = watch('country')?.name
        const region = watch('region')?.name
        const superMarket = watch('superMarket')?.name
        function filterEndDate (date) {
          return filterSelectedEndDate(startDate, date, { allowSameDay: true })
        }

        function filterEndTime (date) {
          return filterSelectedEndDate(startDate, date)
        }

        function filterSecondEndDate (date) {
          return filterSelectedEndDate(startSecondDate, date, { allowSameDay: true })
        }

        function filterSecondEndTime (date) {
          return filterSelectedEndDate(startSecondDate, date)
        }

        return (
          <Box as={'form'} onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <SimpleGrid spacing={6} columns={{ base: 1, md: 3 }}>
                <Categories
                  boxProps={{ minHeight: { md: '325px' } }}
                  isLoading={false}
                >
                  {CONST.STATISTICS_CATEGORY.list.map(category => {
                    const id = String(prop('id', category))
                    const title = t(prop('name', category))
                    const isActive = id === activeCategoryType
                    const defaultValue = ENUMS.StatisticsCompareTypes.PRODUCTS
                    const defaultValueBazar = ENUMS.StatisticsCompareTypes.BAZAR_PRODUCTS
                    const defaultValueSuperMarket = ENUMS.StatisticsCompareTypes.SUPER_MARKET_PRODUCTS
                    const newValue = () => {
                      if (id === ENUMS.StatisticsCategoryTypes.BOZOR &&
                        ((isSupermarketCompare || isCounryCompare) || (isCounryProductsCompare || isSupermarketProductsCompare))) {
                        return {
                          [STATISTICS_CATEGORY_TWO]: defaultValueBazar
                        }
                      }
                      else if (id === ENUMS.StatisticsCategoryTypes.SUPERMARKET &&
                        ((isCounryCompare || isBazarCompare) || (isCounryProductsCompare || isBazarProductsCompare))) {
                        return {
                          [STATISTICS_CATEGORY_TWO]: defaultValueSuperMarket
                        }
                      }
                      else if ((id === ENUMS.StatisticsCategoryTypes.EXPORT || id === ENUMS.StatisticsCategoryTypes.IMPORT) &&
                        ((isSupermarketCompare || isBazarCompare) || (isSupermarketProductsCompare || isBazarProductsCompare))) {
                        return {
                          [STATISTICS_CATEGORY_TWO]: defaultValue
                        }
                      }
                      else {
                        return { ...routerQuery }
                      }
                    }
                    return (
                      <CategoryItem
                        key={id}
                        count={0}
                        isActive={isActive}
                        onClick={() => {
                          // @ts-ignore
                          router.replace({
                            pathname: router.pathname,
                            query: { ...newValue(), category: id }
                          }, null, { shallow: true })
                          reset(dateValues)
                        }}>
                        {title}
                      </CategoryItem>
                    )
                  })}
                </Categories>
                <Categories
                  boxProps={{ minHeight: { md: '325px' } }}
                  queryKey={STATISTICS_CATEGORY_TWO}
                  categoryTitle={t('statistics_category_two')}
                  isLoading={false}
                >
                  {compareFilterList.map(category => {
                    const id = String(prop('id', category))
                    const title = t(prop('name', category))
                    const isActive = id === activeCategoryCompare

                    return (
                      <CategoryItem
                        key={id}
                        count={0}
                        isActive={isActive}
                        onClick={() => {
                          // @ts-ignore
                          onSelectCategoryCompare(id)
                          reset(dateValues)
                        }}>
                        {title}
                      </CategoryItem>
                    )
                  })}
                </Categories>
                <Box
                  minHeight={{ md: '325px' }}
                  pt={6} px={4} pb={4}
                  alignSelf={'baseline'}
                  border={'1px solid'}
                  borderColor={'gray.100'}
                  borderRadius={{ base: 'lg', md: '2xl' }}
                  w={'full'}>
                  <Stack spacing={6}>
                    {(isCounryProductsCompare || activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD) &&
                      !isBazar && !isSupermarket && (
                      <SelectField
                        api={API.PRODUCT_TRADE_COUNTRY_LIST}
                        name={'country'}
                        label={t('input_country_label')}
                        parent={activeCategoryType}
                        params={{ type: activeCategoryType }}
                        size={'lg'}
                        isMultiLang={false}
                        isRequired={true}
                        rules={{ required: true }}
                      />
                    )}
                    {(isBazarProductsCompare || activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD) &&
                      isBazar && (
                      <SelectField
                        api={API.PRODUCT_TRADE_REGION_LIST}
                        name={'region'}
                        label={t('input_region_label')}
                        size={'lg'}
                        isMultiLang={false}
                        isRequired={true}
                        rules={{ required: true }}
                      />
                    )}
                    {(isSupermarketProductsCompare || activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD) &&
                      isSupermarket && (
                      <SelectField
                        api={API.PRODUCT_TRADE_SUPER_MARKET_LIST}
                        name={'superMarket'}
                        label={t('select_statistics_supermarket')}
                        size={'lg'}
                        isMultiLang={false}
                        isRequired={true}
                        rules={{ required: true }}
                      />
                    )}
                    {(isCounryCompare || activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD) && !isBazar && !isSupermarket && (
                      <SelectField
                        api={API.PRODUCT_TRADE_SELECT_LIST}
                        name={'commodityGroupClassifier'}
                        label={t('input_product_culture_label')}
                        size={'lg'}
                        isMultiLang={false}
                        parent={activeCategoryType}
                        isRequired={true}
                        rules={{ required: true }}
                        params={{ type: activeCategoryType }}
                      />
                    )}
                    {(activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD || isBazarCompare) && isBazar && (
                      <SelectField
                        api={API.PRODUCT_TRADE_MARKET_SELECT_LIST}
                        name={'commodityGroupClassifier'}
                        label={t('input_product_culture_label')}
                        size={'lg'}
                        isMultiLang={false}
                        isRequired={true}
                        rules={{ required: true }}
                      />
                    )}
                    {(activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD || isSupermarketCompare) && isSupermarket && (
                      <SelectField
                        api={API.PRODUCT_TRADE_SUPER_MARKET_SELECT_LIST}
                        name={'commodityGroupClassifier'}
                        label={t('input_product_culture_label')}
                        size={'lg'}
                        isMultiLang={false}
                        isRequired={true}
                        rules={{ required: true }}
                      />
                    )}

                    <DatePicker
                      name={'from'}
                      label={t('input_statistics_start_date_label')}
                      isRequired={true}
                      rules={{ required: true }}
                      size={'xl'}
                    />
                    <DatePicker
                      name={'to'}
                      label={t('input_statistics_end_date_label')}
                      isRequired={true}
                      filterDate={filterEndDate}
                      filterTime={filterEndTime}
                      size={'xl'}
                    />
                    {activeCategoryCompare === ENUMS.StatisticsCompareTypes.PERIOD && (
                      <>
                        <DatePicker
                          name={'secondFrom'}
                          label={t('input_statistics_second_start_date_label')}
                          isRequired={true}
                          rules={{ required: true }}
                          size={'xl'}
                        />
                        <DatePicker
                          name={'secondTo'}
                          label={t('input_statistics_second_end_date_label')}
                          isRequired={true}
                          filterDate={filterSecondEndDate}
                          filterTime={filterSecondEndTime}
                          size={'xl'}
                        />
                      </>
                    )}
                  </Stack>
                </Box>
              </SimpleGrid>
              <StatisticsListProvider
                type={activeCategoryType}
                compare={activeCategoryCompare}
              >
                {activeCategoryCompare !== ENUMS.StatisticsCompareTypes.PERIOD && (
                  <>
                    <StatisticsCheckBoxList
                      commodityGroupClassifier={commodityGroupClassifier}
                      country={country}
                      region={region}
                      superMarket={superMarket}
                      activeCategoryCompare={activeCategoryCompare}
                      activeCategoryType={activeCategoryType}
                    />
                  </>
                )}
              </StatisticsListProvider>
              <Button
                bg={'gray.500'}
                color={'white'}
                colorScheme={'gray'}
                alignSelf={'center'}
                size={'lg'}
                type={'submit'}
                _hover={{ bg: 'gray.600' }}
                _active={{ bg: 'gray.700' }}>
                {t('statistics_button_submit')}
              </Button>
            </Stack>
          </Box>
        )
      }}
    />
  )
}
