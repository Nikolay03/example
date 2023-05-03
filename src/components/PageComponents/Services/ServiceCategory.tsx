import { ReactElement } from 'react'
import { Tag, TagProps } from '@chakra-ui/react'

export default function ServiceCategory (props: TagProps): ReactElement {
  return (
    <Tag
      bgColor={'gray.100'}
      color={'gray.500'}
      fontSize={'sm'}
      fontWeight={'normal'}
      {...props}
    />
  )
}
