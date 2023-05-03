import { ReactElement } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export interface RowProps extends FlexProps {
  spacing?: number
}

export default function Row (props: RowProps): ReactElement {
  const { spacing, ...restProps } = props

  if (spacing) {
    const sidePadding = spacing / 2 / 4
    const sx = {
      '& > div': {
        px: `${sidePadding}em`,
        _first: { pl: 'unset' },
        _last: { pr: 'unset' }
      }
    }

    return (
      <Flex direction={'row'} sx={sx} {...restProps} />
    )
  }

  return (
    <Flex {...restProps} />
  )
}
