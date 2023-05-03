import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

export interface ColProps extends BoxProps {
  span?: number
}

export default function Col (props: ColProps): ReactElement {
  const { span, ...restProps } = props

  const maxColumnsCount = 24
  const flexBasisValue = (span / maxColumnsCount) * 100
  const flexBasis = span ? `${flexBasisValue}%` : 'unset'

  return (
    <Box
      flexGrow={1}
      flexBasis={flexBasis}
      {...restProps}
    />
  )
}
