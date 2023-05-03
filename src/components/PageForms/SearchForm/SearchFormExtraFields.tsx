import { Fragment, ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { Box } from '@chakra-ui/react'

import * as API from '~/constants/api'
import * as CONST from '~/constants/constants'
import { useTranslate } from '~/utils/translate'
import {
  GeoSelectField,
  RangeSlider,
  SelectField,
  StaticSelectField
} from '~/components/HookForm'

interface Props {
  maxPrice: number
  maxVolume: number
}

export default function SearchFormExtraFields (props: Props): ReactElement {
  const { maxPrice, maxVolume } = props

  const { t } = useTranslate()

  const { watch } = useFormContext()

  const productCulture = watch('productCulture')
  const productSpecies = watch('productSpecies')

  return (
    <Fragment>
      <SelectField
        api={API.PRODUCT_GROUP_CLASS_LIST}
        name={'productCulture'}
        label={t('input_product_culture_label')}
        size={'lg'}
        variant={'outline'}
        isMultiLang={true}
        params={{ levelSpecial: 1 }}
      />

      <SelectField
        api={API.PRODUCT_GROUP_CLASS_LIST}
        name={'productSpecies'}
        label={t('input_product_species_label')}
        size={'lg'}
        variant={'outline'}
        isMultiLang={true}
        params={{ levelSpecial: 2, parent: productCulture?.id }}
        parent={productCulture?.id}
        isDisabled={!productCulture}
      />

      <SelectField
        api={API.PRODUCT_GROUP_CLASS_LIST}
        name={'productVariety'}
        label={t('input_product_variety_label')}
        size={'lg'}
        variant={'outline'}
        isMultiLang={true}
        params={{ levelSpecial: 3, parent: productSpecies?.id }}
        parent={productSpecies?.id}
        isDisabled={!productSpecies}
      />

      <GeoSelectField
        kind={'country'}
        name={'manufacturerCountry'}
        label={t('input_origin_country_label')}
        size={'lg'}
        variant={'outline'}
      />

      <RangeSlider
        name={'prices'}
        label={t('input_price_label')}
        size={'lg'}
        min={0}
        max={maxPrice}
        valueSuffix={CONST.CURRENCY_UZB}
      />

      <RangeSlider
        name={'salesVolume'}
        label={t('input_sales_volume_label')}
        size={'lg'}
        min={0}
        max={maxVolume}
      />

      <StaticSelectField
        name={'incoterms'}
        list={CONST.TRADES_INCOTERMS.list}
        label={t('input_incoterms_label')}
        size={'lg'}
        variant={'outline'}
      />

      {/* space placeholder */}
      <Box display={{ base: 'none', md: 'block' }} />

      <GeoSelectField
        kind={'country'}
        name={'locationCountry'}
        label={t('input_product_location_label')}
        placeholder={t('input_location_country_placeholder')}
        size={'lg'}
        variant={'outline'}
      />

      <GeoSelectField
        kind={'region'}
        name={'locationRegion'}
        placeholder={t('input_location_region_placeholder')}
        size={'lg'}
        variant={'outline'}
        isChild={true}
        isDefaultDisabled={true}
        parentName={'locationCountry'}
      />

      <GeoSelectField
        kind={'district'}
        name={'locationDistrict'}
        placeholder={t('input_location_district_placeholder')}
        size={'lg'}
        variant={'outline'}
        isChild={true}
        isDefaultDisabled={true}
        parentName={'locationRegion'}
      />
    </Fragment>
  )
}
