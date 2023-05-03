import { ReactElement } from 'react'
import { prop } from 'ramda'
import { useFormContext } from 'react-hook-form'

import * as API from '~/constants/api'
import { SelectDefaultProps } from '~/types/components'
import { SelectField } from '~/components/HookForm'

type GeoKinds = 'country' | 'region' | 'district'

interface Props extends SelectDefaultProps {
  kind: GeoKinds
  isChild?: boolean
  parentName?: string
  isDefaultDisabled?: boolean
}

const endPoints: {[keys in GeoKinds]} = {
  country: API.COUNTRY_LIST,
  region: API.REGION_LIST,
  district: API.DISTRICT_LIST
}

export default function GeoSelectField (props: Props): ReactElement {
  const { kind, isChild, parentName, isDefaultDisabled, ...restProps } = props

  const { watch } = useFormContext()

  const parent = isChild ? watch(parentName) : null
  const parentId = prop('id', parent)

  const params: {[keys in GeoKinds]} = {
    country: null,
    region: { country: parentId, isActive: true },
    district: { region: parentId, isActive: true }
  }

  return (
    <SelectField
      api={endPoints[kind]}
      isMultiLang={true}
      parent={parentId}
      params={params[kind]}
      isDisabled={isDefaultDisabled && !parentId}
      {...restProps}
    />
  )
}
