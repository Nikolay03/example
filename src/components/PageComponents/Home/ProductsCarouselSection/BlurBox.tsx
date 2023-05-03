import { Box, BoxProps } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'

interface Props extends BoxProps {
  children: ReactNode
}

const BlurBox = ({ children, ...props }: Props): ReactElement => {
  return (
    <Box
      pos={'relative'}
      overflow={'hidden'}
      {...props}
    >
      {children}
      <Box
        style={{
          overflow: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          margin: 0
        }}
        filter={'blur(1px)'}
        bgColor={'whiteAlpha.800'}
      />
    </Box>
  )
}

export default BlurBox
