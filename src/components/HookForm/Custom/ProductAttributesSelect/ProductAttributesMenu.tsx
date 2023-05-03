import { ReactElement } from 'react'
import { omit } from 'ramda'
import { components, MenuProps } from 'react-select'

import { TAttributeSelect } from './types'

type Props = MenuProps<TAttributeSelect, true>

export default function ProductAttributesMenu (props: Props): ReactElement {
  const { children, ...restProps } = omit(['innerProps'], props)

  return (
    <components.Menu innerProps={{}} {...restProps}>
      {children}
    </components.Menu>
  )
}
