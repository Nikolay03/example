/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function EtpClock (props: IconProps): ReactElement {
  return (
    <Icon boxSize={6} fill={'currentColor'} viewBox={'0 0 18 18'} {...props}>
      <path d={'M9 2.25C5.2875 2.25 2.25 5.2875 2.25 9C2.25 12.7125 5.2875 15.75 9 15.75C12.7125 15.75 15.75 12.7125 15.75 9C15.75 5.2875 12.7125 2.25 9 2.25ZM9.675 9.5C9.675 9.905 9.405 10.175 9 10.175H5.975C5.57 10.175 5.3 9.905 5.3 9.5C5.3 9.095 5.57 8.825 5.975 8.825H8.325V6.125C8.325 5.72 8.595 5.45 9 5.45C9.405 5.45 9.675 5.72 9.675 6.125V9.5Z'} />
    </Icon>
  )
}
