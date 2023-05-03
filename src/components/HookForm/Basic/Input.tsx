import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Input as ChakraInput, InputProps } from '@chakra-ui/react'

import DisabledWrapper from '../DisabledWrapper'
import FormControl from '../FormControl'

import InputGroup, { InputGroupProps } from './InputGroup'

import { FormFieldProps } from '~/types/components'

interface Props extends FormFieldProps<InputProps>, Omit<InputGroupProps, 'children'> {}

function Input (props: Props): ReactElement {
  const {
    name,
    defaultValue,
    label,
    isDisabled,
    isRequired,
    leftElement,
    rightElement,
    elementProps,
    rules,
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
    <DisabledWrapper isDisabled={isDisabled}>
      <FormControl
        id={name}
        error={error}
        isInvalid={invalid}
        isRequired={isRequired}
        label={label}>
        <InputGroup
          leftElement={leftElement}
          rightElement={rightElement}
          elementProps={elementProps}>
          <ChakraInput
            ref={ref}
            value={value || ''}
            {...inputProps}
            {...restProps}
          />
        </InputGroup>
      </FormControl>
    </DisabledWrapper>
  )
}

Input.defaultProps = {
  defaultValue: ''
}

export default Input
