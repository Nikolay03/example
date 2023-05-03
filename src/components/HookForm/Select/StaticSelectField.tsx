import { ReactElement } from 'react'
import { Props as RSProps } from 'react-select'
import { useController, useFormContext } from 'react-hook-form'
import { find, prop, propEq } from 'ramda'

import FormControl from '../FormControl'
import DisabledWrapper from '../DisabledWrapper'

import { FormFieldProps, StaticSelectProps } from '~/types/components'
import { TSelectListItem } from '~/types/constants'
import { useTranslate } from '~/utils/translate'
import { Select } from '~/components/CustomSelect'

interface Props extends FormFieldProps<StaticSelectProps>, Omit<RSProps, 'name'> {
}

export default function StaticSelectField (props: Props): ReactElement {
  const {
    list,
    isRequired,
    label,
    name,
    rules,
    ...restProps
  } = props

  const { t } = useTranslate()

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: ''
  })

  const { ref, value, ...restField } = field
  const { error, invalid } = fieldState

  const valueId = prop('id', value) || value
  const selectedOption = find<TSelectListItem>(propEq('id', valueId), list)

  function getOptionLabel (option: TSelectListItem) {
    const name = prop('name', option)
    return t(name) || name
  }

  return (
    <DisabledWrapper isDisabled={restProps.isDisabled}>
      <FormControl
        id={name}
        error={error}
        isInvalid={invalid}
        isRequired={isRequired}
        label={label}>
        <Select
          getOptionLabel={getOptionLabel}
          inputId={name}
          innerRef={ref}
          options={list}
          value={selectedOption}
          {...restProps}
          {...restField}
        />
      </FormControl>
    </DisabledWrapper>
  )
}
