import { ReactElement, ReactNode } from 'react'
import { Tag, TagProps, useToken } from '@chakra-ui/react'

import hexToRgba from '~/utils/hexToRgba'

interface Props extends TagProps {
  children: ReactNode
  color?: string
}

function StatusTag (props: Props): ReactElement {
  const { children, color, ...restProps } = props

  const colorFromTheme = useToken('colors', color)

  const textColor = colorFromTheme
  const bgColor = hexToRgba(colorFromTheme, '0.08')

  return (
    <Tag
      bgColor={bgColor}
      color={textColor}
      fontSize={'sm'}
      lineHeight={'none'}
      py={'6px'}
      size={'sm'}
      {...restProps}>
      {children}
    </Tag>
  )
}

StatusTag.defaultProps = {
  color: 'gray.500'
}

export default StatusTag
