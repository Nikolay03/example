import { ReactElement } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

export default function SectionTitleWrap (props: FlexProps): ReactElement {
  return (
    <Flex
      align={'center'}
      justify={'space-between'}
      mb={8}
      {...props}
    />
  )
}
