import { Dispatch } from 'react'
import { curry, find, is, path, prop, propEq } from 'ramda'

import { GetOptions } from './useSearchField'

type DefaultOption = {
  id: string | number
  name: string
}

export type SelectState<T> = {
  options: DefaultOption & T
  isDirty: boolean
  isLoading: boolean
  query: string | null
}

export const getIdFromValue = inputValue => {
  if (is(Object, inputValue)) {
    return prop('id', inputValue)
  }
  return inputValue
}

export const getSelectedOption = (options, value, isStatic) => {
  const optionId = isStatic
    ? prop('id', value) || value
    : parseInt(prop('id', value) || value)
  const option = find(propEq('id', optionId))(options)
  return option || ''
}

export interface OnFetchDataOptions {
  getOptions: GetOptions
  getValue: (path: string[]) => number
  getText: (path: string[]) => string
}

export const onFetchData = (state: SelectState<any>, dispatch: Dispatch<any>, options: OnFetchDataOptions): void => {
  const { getOptions, getValue, getText } = options

  dispatch({ isLoading: true, isDirty: true })
  getOptions(state.query)
    .then(data => {
      const options = data?.map(item => {
        const id = getValue(item)
        const name = getText(item)
        return { ...item, id, name }
      })

      dispatch({ options, isLoading: false })
    })
}

export const defaultGetText = curry(<T> (text: string[], obj: T) => path(text, obj))
export const defaultGetValue = curry(<T> (value: string[], obj: T) => path(value, obj))
