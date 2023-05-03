import { ReactElement } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

type Props = {
  themeType?: 'azure'
} & BoxProps

export default function FooterNavTitle ({ themeType, ...props }: Props): ReactElement {
  const isAzure = themeType === 'azure'
  return (
    <Box
      fontSize={isAzure ? 'xl' : 'sm'}
      color={isAzure ? 'black' : 'none'}
      fontWeight={'bold'}
      textTransform={'uppercase'}
      mb={{ base: 6, md: 8 }}
      {...props}
    />
  )
}
