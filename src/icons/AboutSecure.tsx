/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function AboutSecure (props: IconProps): ReactElement {
  return (
    <Icon boxSize={12} viewBox={'0 0 48 48'} fill={'currentColor'} {...props}>
      <path d={'M24.0001 0L4.36377 8.72725V21.8182C4.36377 33.9382 12.731 45.24 24.0001 48C35.2693 45.24 43.6365 33.9382 43.6365 21.8182V8.72725L24.0001 0ZM24.0001 43.4728V24.0001H8.72734V11.5637L24.0001 4.77819V23.9782H39.2729C38.1165 32.9673 32.1274 40.9746 24.0001 43.4728Z'} />
    </Icon>
  )
}
