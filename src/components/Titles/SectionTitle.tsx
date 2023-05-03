import { ReactElement } from 'react'
import { HeadingProps } from '@chakra-ui/react'

import Title from './Title'

export default function SectionTitle (props: HeadingProps): ReactElement {
  return (
    <Title
      position={'relative'}
      pl={4}
      pr={2}
      _before={{
        backgroundColor: 'primary.500',
        borderRadius: '50px',
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        width: '4px'
      }}
      {...props}
    />
  )
}
