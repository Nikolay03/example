import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react'

import FormControl from '../FormControl'

import { FormFieldProps } from '~/types/components'
import DisabledWrapper from '~/components/HookForm/DisabledWrapper'

type Props = FormFieldProps<TextareaProps>

export default function Textarea (props: Props): ReactElement {
  const { name, label, isRequired, rules, isDisabled, ...restProps } = props

  const { control } = useFormContext()

  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: ''
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
        <ChakraTextarea
          ref={ref}
          value={value || ''}
          {...inputProps}
          {...restProps}
        />
      </FormControl>
    </DisabledWrapper>
  )
}
