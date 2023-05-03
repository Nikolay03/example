/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function Google (props: IconProps): ReactElement {
  const blue = '#4285f4'
  const green = '#34a853'
  const yellow = '#fbbc05'
  const red = '#eb4335'

  return (
    <Icon boxSize={6} viewBox={'0 0 24 24'} {...props}>
      <g>
        <path fill={blue} d={'M22,12.2c0-0.9-0.1-1.5-0.2-2.1h-9.6V14h5.6c-0.1,1-0.7,2.4-2.1,3.4l0,0.1l3,2.4l0.2,0 C20.9,18.1,22,15.4,22,12.2z'} />
        <path fill={green} d={'M12.2,22.5c2.8,0,5.1-0.9,6.8-2.5l-3.2-2.6c-0.9,0.6-2,1-3.5,1c-2.7,0-5-1.8-5.8-4.3l-0.1,0l-3.1,2.5l0,0.1 C4.8,20.1,8.2,22.5,12.2,22.5z'} />
        <path fill={yellow} d={'M6.4,14.1c-0.2-0.7-0.3-1.3-0.3-2.1c0-0.7,0.1-1.4,0.3-2.1l0-0.1L3.2,7.3L3.1,7.3C2.4,8.7,2,10.3,2,12 c0,1.7,0.4,3.3,1.1,4.7L6.4,14.1z'} />
        <path fill={red} d={'M12.2,5.6c1.9,0,3.2,0.8,3.9,1.6L19,4.3c-1.8-1.7-4.1-2.7-6.8-2.7c-4,0-7.4,2.3-9.1,5.8l3.3,2.6 C7.2,7.4,9.5,5.6,12.2,5.6z'} />
      </g>
    </Icon>
  )
}
