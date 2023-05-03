import { ReactElement } from 'react'
import { HeadingProps } from '@chakra-ui/react'

import { SubTitle } from '~/components/Titles'

export default function ModalTitle (props: HeadingProps): ReactElement {
  return (
    <SubTitle
      as={'h3'}
      fontWeight={'bold'}
      textAlign={'center'}
      {...props}
    />
  )
}
