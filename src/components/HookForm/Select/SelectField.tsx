import { ReactElement } from 'react'
import { Props as RSProps } from 'react-select'

import { defaultGetText, defaultGetValue } from './utils'
import { useSearchField } from './useSearchField'
import SelectFieldBase from './SelectFieldBase'

import { SelectProps } from '~/types/components'
import { useTranslate } from '~/utils/translate'

interface Props extends SelectProps, Omit<RSProps, 'name'> {
  onSuccess?: (list) => void
}

function SelectField (props: Props): ReactElement {
  const {
    api,
    params,
    isMultiLang,
    itemText,
    itemValue,
    multiLangKey,
    detailApi,
    pageSize,
    onSuccess,
    ...restProps
  } = props

  const { translateData } = useTranslate()

  const { getOption, getOptions } = useSearchField({ detailApi, api, params, pageSize, onSuccess })

  function getTextMultiLang (value) {
    return translateData(value, multiLangKey)
  }

  const getText = isMultiLang ? getTextMultiLang : defaultGetText(itemText)
  return (
    <SelectFieldBase
      getText={getText}
      getValue={defaultGetValue(itemValue)}
      getOptions={getOptions}
      getOption={getOption}
      {...restProps}
    />
  )
}

SelectField.defaultProps = {
  itemText: ['name'],
  itemValue: ['id'],
  multiLangKey: 'name',
  pageSize: 100
}

export default SelectField
