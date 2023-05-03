import { RegisterOptions } from 'react-hook-form'

import { TObject, TSelectListItem } from '~/types/constants'

export type TTab = {
  value: string
  title: string
}

export type FormFieldProps<P = TObject> = P & {
  name: string
  defaultValue?: any
  label?: string
  isRequired?: boolean
  isDisabled?: boolean
  rules?: RegisterOptions
}

export interface SelectDefaultProps extends FormFieldProps {
  size?: string
  variant?: string
}

export interface SelectProps extends SelectDefaultProps {
  api: string
  detailApi?: string
  isMultiLang?: boolean,
  labelPath?: string[]
  multiLangKey?: string
  params?: TObject,
  pageSize?: number,
  parent?: string | number
}

export interface StaticSelectProps extends SelectDefaultProps {
  list: TSelectListItem[]
}
