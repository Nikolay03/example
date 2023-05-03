import { ReactElement, useState } from 'react'
import { Props as RSProps } from 'react-select'
import { useController, useFormContext } from 'react-hook-form'
import { find, path, prop, propEq } from 'ramda'

import FormControl from '../FormControl'

import { SelectOption } from './selectTypes'

import { FormFieldProps, SelectProps } from '~/types/components'
import { useTranslate } from '~/utils/translate'
import { useAxiosRequest } from '~/hooks/api'
import { AsyncSelect } from '~/components/CustomSelect'

function getValueId (value: SelectProps | number) {
  if (!value) return value
  if (value instanceof Object) return prop('id', value)
  return value
}

interface Props extends FormFieldProps<SelectProps>, Omit<RSProps, 'name'> {
}

function AsyncSelectField<Option extends SelectOption> (props: Props): ReactElement {
  const {
    api,
    isMultiLang,
    isRequired,
    label,
    labelPath,
    name,
    multiLangKey,
    params,
    rules,
    ...restProps
  } = props

  const { translateData } = useTranslate()

  const request = useAxiosRequest()

  const [options, setOptions] = useState<SelectOption[]>([])

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: ''
  })

  const { ref, value, ...restField } = field
  const { error, invalid } = fieldState

  const valueId = getValueId(value)
  const selectedOption = find<SelectOption>(propEq('id', valueId), options)

  const listMapper = (results: Option[]): SelectOption[] => results.map(item => ({
    ...item,
    id: getValue(item),
    name: getLabel(item)
  }))

  function getValue (option: Option): number {
    return prop('id', option)
  }

  function getLabel (option: Option): string {
    if (isMultiLang) {
      return translateData(option, multiLangKey)
    }
    return path(labelPath, option)
  }

  function loadOptions (search) {
    return request.get(api, { pageSize: 100, search, ...params })
      .then(({ data }) => {
        const results: Option[] = prop('results', data) || []
        const newOptions = listMapper(results)
        setOptions(newOptions)

        return newOptions
      })
  }

  return (
    <FormControl
      id={name}
      error={error}
      isInvalid={invalid}
      isRequired={isRequired}
      label={label}>
      <AsyncSelect
        api={api}
        inputId={name}
        innerRef={ref}
        loadOptions={loadOptions}
        value={selectedOption}
        {...restProps}
        {...restField}
      />
    </FormControl>
  )
}

export default AsyncSelectField

AsyncSelectField.defaultProps = {
  labelPath: ['name'],
  multiLangKey: 'name'
}
