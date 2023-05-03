import { ReactElement } from 'react'
import { omit } from 'ramda'
import { useController, useFormContext } from 'react-hook-form'
import { CheckboxGroup as ChakraCheckboxGroup, CheckboxGroupProps } from '@chakra-ui/react'

import FormControl from '../FormControl'

import { FormFieldProps } from '~/types/components'

type Props = FormFieldProps<CheckboxGroupProps>

function CheckboxGroup (props: Props): ReactElement {
  const { name, children, label, isRequired, rules, defaultValue, ...restProps } = props

  const { control } = useFormContext()
  const { field } = useController({
    name,
    control,
    defaultValue,
    rules
  })
  const inputProps = omit(['ref'], field)

  return (
    <FormControl
      id={name}
      label={label}
      isRequired={isRequired}>
      <ChakraCheckboxGroup {...inputProps} {...restProps}>
        {children}
      </ChakraCheckboxGroup>
    </FormControl>
  )
}

CheckboxGroup.defaultProps = {
  defaultValue: []
}

export default CheckboxGroup
