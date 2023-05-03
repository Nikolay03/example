import { ReactElement } from 'react'
import { prop } from 'ramda'
import { useFormContext } from 'react-hook-form'

import * as API from '~/constants/api'
import { SelectDefaultProps } from '~/types/components'
import { SelectField } from '~/components/HookForm'

interface Props extends SelectDefaultProps {
  isChild?: boolean
  parentName?: string
}

export default function RegionSelectField (props: Props): ReactElement {
  const { isChild, parentName, ...restProps } = props

  const { watch } = useFormContext()

  const parent = isChild ? watch(parentName) : null
  const parentId = prop('id', parent)

  return (
    <SelectField
      api={API.REGION_LIST}
      isMultiLang={true}
      parent={parentId}
      params={{ country: parentId, isActive: true }}
      {...restProps}
    />
  )
}
