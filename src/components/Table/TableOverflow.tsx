import { ReactElement } from 'react'
import styled from '@emotion/styled'
import { Box, BoxProps, ThemeComponentProps } from '@chakra-ui/react'

const Overflow = styled(Box)`
  overflow-x: auto;
  overflow-y: hidden;
`

const OverflowDefault = styled(Overflow)`
  & th:first-of-type, & td:first-of-type {
    padding-left: unset;
  }
  & th:last-child, & td:last-child {
    padding-right: unset;
  }
  & tbody tr:last-child td {
    border-bottom: none;
    padding-bottom: unset;
  }
`

const OverflowClickable = styled(Overflow)`
  & tbody tr:last-child td {
    border-bottom: none;
  }
  & tbody tr {
    cursor: pointer;
    transition: background-color 200ms;
    &:hover {
      background-color: ${(props: ThemeComponentProps) => props.theme.colors.gray[100]};
    }
  }
`

interface Props extends BoxProps {
  isClickable?: boolean
}

export default function TableOverflow (props: Props): ReactElement {
  const { children, isClickable, ...restProps } = props

  if (isClickable) {
    return (
      <OverflowClickable>
        {children}
      </OverflowClickable>
    )
  }

  return (
    <OverflowDefault {...restProps}>
      {children}
    </OverflowDefault>
  )
}
