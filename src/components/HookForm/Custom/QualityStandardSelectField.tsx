import { ReactElement } from 'react'

import * as API from '~/constants/api'
import { SelectDefaultProps } from '~/types/components'
import { SelectField } from '~/components/HookForm'

export default function QualityStandardSelectField (props: SelectDefaultProps): ReactElement {
  return (
    <SelectField
      api={API.QUALITY_STANDARD_LIST}
      isMultiLang={false}
      params={{ isActive: true }}
      {...props}
    />
  )
}
