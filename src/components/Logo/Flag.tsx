import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

const FlagSecondaryColor = () => (
  <Box bgColor={'#d43240'} h={'2px'} />
)

export default function Flag (): ReactElement {
  const flagMainHeight = { base: '10px', xl: '12px' }

  return (
    <Box minW={'2px'} w={'2px'}>
      <Box bgColor={'#50b0e2'} h={flagMainHeight} />
      <FlagSecondaryColor />
      <Box bgColor={'palette.common.lightGray'} h={flagMainHeight} />
      <FlagSecondaryColor />
      <Box bgColor={'#7ebc3f'} h={flagMainHeight} />
    </Box>
  )
}
