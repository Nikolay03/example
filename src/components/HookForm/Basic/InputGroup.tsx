import { ReactElement, ReactNode } from 'react'
import {
  InputElementProps,
  InputGroup as ChakraInputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'

export interface InputGroupProps {
  children: ReactNode
  leftElement?: ReactElement
  rightElement?: ReactElement
  elementProps?: InputElementProps
}

export default function InputGroup (props: InputGroupProps): ReactElement {
  const { children, leftElement, rightElement, elementProps } = props

  const elementStyles = {
    h: 'full'
  }

  return (
    <ChakraInputGroup>
      {leftElement && (
        <InputLeftElement {...elementProps} {...elementStyles}>
          {leftElement}
        </InputLeftElement>
      )}

      {children}

      {rightElement && (
        <InputRightElement {...elementProps} {...elementStyles}>
          {rightElement}
        </InputRightElement>
      )}
    </ChakraInputGroup>
  )
}
