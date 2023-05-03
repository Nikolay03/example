import { ReactElement } from 'react'
import { Box, useToken } from '@chakra-ui/react'

export default function DashedDivider (): ReactElement {
  const [colorGray] = useToken('colors', ['gray.500'])

  return (
    <Box
      borderBottomWidth={1}
      borderColor={colorGray}
      borderStyle={'dashed'}
      opacity={0.3}
      transform={'scaleX(1.5)'}
    />
  )
}
