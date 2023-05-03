import { ReactElement } from 'react'
import { defaultTo, map, path, pipe, split } from 'ramda'

import { StaticSelectProps } from '~/types/components'
import { useETPData } from '~/components/Utils/Contexts'
import { StaticSelectField } from '~/components/HookForm'

export default function VatSelectField (props: Omit<StaticSelectProps, 'list'>): ReactElement {
  const { name, ...restProps } = props

  const { configData } = useETPData()

  const vatList = pipe(
    path(['data', 'VAT']),
    defaultTo(''),
    split(','),
    map(value => ({ id: value, name: value }))
  )(configData)

  return (
    <StaticSelectField
      name={name}
      list={vatList}
      {...restProps}
    />
  )
}
