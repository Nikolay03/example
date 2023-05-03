import { ReactElement } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react'

import FormControl from '../FormControl'

import { FormFieldProps } from '~/types/components'

type Props = FormFieldProps<CheckboxProps>

export default function Checkbox (props: Props): ReactElement {
  const { name, children, isRequired, ...restProps } = props

  const { control } = useFormContext()

  const { field } = useController({
    name,
    control,
    defaultValue: false
  })

  return (
    <FormControl id={name} isRequired={isRequired}>
      <ChakraCheckbox isChecked={field.value} {...field} {...restProps}>
        {children}
      </ChakraCheckbox>
    </FormControl>
  )
}
