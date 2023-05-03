import { ReactElement } from 'react'
import { Stack, StackProps } from '@chakra-ui/react'

export default function StatCard (props: StackProps): ReactElement {
  return (
    <Stack bgColor={'white'} borderRadius={'2xl'} px={6} py={4} {...props} />
  )
}
