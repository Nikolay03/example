import { ReactElement, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'
import {
  FormControl as ChakraFormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react'

import useFieldError from './useFieldError'

type ChildrenFunc = (isInvalid: boolean) => ReactElement

interface Props {
  id: string
  children: ReactNode | ChildrenFunc
  error?: FieldError
  isDisabled?: boolean
  isInvalid?: boolean
  isRequired?: boolean
  label?: string
}

export default function FormControl (props: Props): ReactElement {
  const {
    id,
    children,
    error,
    isDisabled,
    isInvalid,
    isRequired,
    label
  } = props

  const errorMessage = useFieldError(error)

  return (
    <ChakraFormControl
      id={id}
      isDisabled={isDisabled}
      isRequired={isRequired}
      isInvalid={isInvalid}>
      {label && (
        <FormLabel>{label}</FormLabel>
      )}

      {typeof children === 'function' ? children(isInvalid) : children}

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </ChakraFormControl>
  )
}
