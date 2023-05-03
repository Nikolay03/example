import { ReactElement } from 'react'

import * as API from '~/constants/api'
import { SelectDefaultProps } from '~/types/components'
import { SelectField } from '~/components/HookForm'

export default function CountrySelectField (props: SelectDefaultProps): ReactElement {
  return (
    <SelectField
      api={API.COUNTRY_LIST}
      isMultiLang={true}
      params={{ isActive: true }}
      {...props}
    />
  )
}
