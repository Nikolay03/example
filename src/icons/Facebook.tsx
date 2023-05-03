/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function Facebook (props: IconProps): ReactElement {
  return (
    <Icon boxSize={6} viewBox={'0 0 24 24'} {...props}>
      <path fill={'#3C5A9A'} d={'M13.6,23V13h3.2l0.5-3.9h-3.7V6.6c0-1.1,0.3-1.9,1.9-1.9l2,0V1.2C17.2,1.1,16,1,14.6,1 c-2.9,0-4.8,1.8-4.8,5.2v2.9H6.5V13h3.3v10L13.6,23z'} />
    </Icon>
  )
}
