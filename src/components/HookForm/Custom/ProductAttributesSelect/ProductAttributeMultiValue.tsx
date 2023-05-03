import { ReactElement } from 'react'
import { prop } from 'ramda'
import { components, MultiValueProps } from 'react-select'

import { TAttributeSelect } from './types'

import { useTranslate } from '~/utils/translate'

export default function ProductAttributeMultiValue (props: MultiValueProps<TAttributeSelect>): ReactElement {
  const { data } = props

  const { translateData } = useTranslate()

  const name = prop('name', data)
  const attribute = prop('attribute', data)
  const attributeName = translateData(attribute, 'value')

  return (
    <components.MultiValue {...props}>
      {`${name}: ${attributeName}`}
    </components.MultiValue>
  )
}
