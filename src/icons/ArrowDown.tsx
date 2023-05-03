/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function ArrowDown (props: IconProps): ReactElement {
  return (
    <Icon width={'5px'} height={'9px'} viewBox={'0 0 5 9'} fill={'currentColor'} {...props}>
      <path d={'M4.85343 6.3965C4.65818 6.20125 4.34168 6.20125 4.14643 6.3965L3.24993 7.293V0.5C3.24993 0.224 3.02593 0 2.74993 0C2.47393 0 2.24993 0.224 2.24993 0.5V7.293L1.35344 6.3965C1.15819 6.20125 0.841437 6.20125 0.646437 6.3965C0.451188 6.59175 0.451188 6.90825 0.646437 7.1035L2.39643 8.8535C2.49418 8.95125 2.62193 9 2.74993 9C2.87793 9 3.00568 8.95125 3.10343 8.8535L4.85343 7.1035C5.04868 6.90825 5.04868 6.59175 4.85343 6.3965Z'} />
    </Icon>
  )
}
