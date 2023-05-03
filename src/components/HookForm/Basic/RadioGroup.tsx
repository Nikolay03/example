import { ReactElement } from 'react'
import { omit } from 'ramda'
import { useController, useFormContext } from 'react-hook-form'
import { RadioGroup as ChakraRadioGroup, RadioGroupProps } from '@chakra-ui/react'

import FormControl from '../FormControl'

import { FormFieldProps } from '~/types/components'

type Props = FormFieldProps<RadioGroupProps>

export default function RadioGroup (props: Props): ReactElement {
  const { name, children, label, isRequired, ...restProps } = props

  const { control } = useFormContext()

  const { field } = useController({
    name,
    control,
    defaultValue: ''
  })

  const inputProps = omit(['ref'], field)

  return (
    <FormControl
      id={name}
      label={label}
      isRequired={isRequired}>
      <ChakraRadioGroup {...inputProps} {...restProps}>
        {children}
      </ChakraRadioGroup>
    </FormControl>
  )
}
