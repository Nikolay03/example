import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Input, InputProps } from '@chakra-ui/react'

import DisabledWrapper from '../DisabledWrapper'
import FormControl from '../FormControl'

import { FormFieldProps } from '~/types/components'
import { innNumberParse } from '~/utils/fieldParsers'

export default function InnInput (props: FormFieldProps<InputProps>): ReactElement {
  const { name, label, isDisabled, isRequired, ...restProps } = props

  const { register, control, setValue } = useFormContext()

  const input = register(name, {
    required: true,
    minLength: 11
  })

  const { fieldState } = useController({
    name,
    control,
    defaultValue: ''
  })

  const { invalid, error } = fieldState

  return (
    <DisabledWrapper isDisabled={isDisabled}>
      <FormControl
        id={name}
        label={label}
        error={error}
        isInvalid={invalid}
        isRequired={isRequired}>
        <Input
          {...input}
          {...restProps}
          maxLength={11}
          onChange={event => {
            const value = innNumberParse(event.target.value)
            setValue(name, value)
          }}
        />
      </FormControl>
    </DisabledWrapper>
  )
}
