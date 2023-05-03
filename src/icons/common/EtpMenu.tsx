/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function EtpMenu (props: IconProps): ReactElement {
  return (
    <Icon boxSize={6} fill={'currentColor'} viewBox={'0 0 24 24'} {...props}>
      <path d={'M3,5.7c0-0.5,0.4-0.9,0.9-0.9H21v1.8H3.9C3.4,6.6,3,6.2,3,5.7z'} />
      <path d={'M6.6,12c0-0.5,0.4-0.9,0.9-0.9H21v1.8H7.5C7,12.9,6.6,12.5,6.6,12z'} />
      <path d={'M3,18.3c0-0.5,0.4-0.9,0.9-0.9H21v1.8H3.9C3.4,19.2,3,18.8,3,18.3z'} />
    </Icon>
  )
}
