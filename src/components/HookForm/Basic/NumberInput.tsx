import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import {
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputFieldProps
} from '@chakra-ui/react'

import FormControl from '../FormControl'

import { FormFieldProps } from '~/types/components'

interface Props extends FormFieldProps<Omit<NumberInputFieldProps, 'size'>> {
  isDisabled?: boolean
  min?: number
  max?: number
  size?: string
  variant?: string
}

function NumberInput (props: Props): ReactElement {
  const {
    name,
    defaultValue,
    rules,
    label,
    isDisabled,
    isRequired,
    min,
    max,
    size,
    variant,
    ...restProps
  } = props

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue
  })

  const { ref, value, ...inputProps } = field
  const { invalid, error } = fieldState

  return (
    <FormControl
      id={name}
      error={error}
      isInvalid={invalid}
      isRequired={isRequired}
      label={label}>
      <ChakraNumberInput
        {...inputProps}
        isDisabled={isDisabled}
        min={min}
        max={max}
        size={size}
        value={value || ''}
        variant={variant}>
        <NumberInputField
          ref={ref}
          inputMode={'numeric'}
          {...restProps}
        />
      </ChakraNumberInput>
    </FormControl>
  )
}

NumberInput.defaultProps = {
  defaultValue: ''
}

export default NumberInput
