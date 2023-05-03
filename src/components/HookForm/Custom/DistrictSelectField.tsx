import { ReactElement } from 'react'
import { prop } from 'ramda'
import { useFormContext } from 'react-hook-form'

import * as API from '~/constants/api'
import { SelectDefaultProps } from '~/types/components'
import { SelectField } from '~/components/HookForm'

interface Props extends SelectDefaultProps {
  isChild?: boolean
  parentName?: string
  isDefaultDisabled?: boolean
}

export default function DistrictSelectField (props: Props): ReactElement {
  const { isChild, parentName, isDefaultDisabled, ...restProps } = props

  const { watch } = useFormContext()

  const parent = isChild ? watch(parentName) : null
  const parentId = prop('id', parent)
  const params = { region: parentId, isActive: true }

  return (
    <SelectField
      api={API.DISTRICT_LIST}
      isMultiLang={true}
      parent={parentId}
      params={params}
      isDisabled={isDefaultDisabled && !parentId}
      {...restProps}
    />
  )
}
