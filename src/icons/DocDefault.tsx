/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function DocDefault (props: IconProps): ReactElement {
  return (
    <Icon boxSize={9} viewBox={'0 0 36 36'} {...props}>
      <g>
        <g>
          <path fill={'#4254B6'} d={'M23.3,8.4L22.2,0H7.5C5.7,0,4.3,1.4,4.3,3.2v29.7c0,1.8,1.4,3.2,3.2,3.2h21.1c1.8,0,3.2-1.4,3.2-3.2 V9.5L23.3,8.4z'} />
          <path fill={'#324492'} d={'M22.2,0H18v36h10.5c1.8,0,3.2-1.4,3.2-3.2V9.5l-8.4-1.1L22.2,0z'} />
          <path fill={'#818DCE'} d={'M31.7,9.5h-7.4c-1.2,0-2.1-0.9-2.1-2.1V0c0.3,0,0.5,0.1,0.7,0.3l8.4,8.4C31.6,8.9,31.7,9.2,31.7,9.5z'} />
        </g>
        <g>
          <g>
            <path fill={'#E3E7EA'} d={'M20.1,23.3v6.3h4.2c0.6,0,1.1-0.5,1.1-1.1v-5.3h-5.3V23.3z'} />
            <g>
              <path fill={'#FFF5F5'} d={'M25.4,21.2V18c0-0.6-0.5-1.1-1.1-1.1H11.7c-0.6,0-1.1,0.5-1.1,1.1v3.2H25.4z'} />
              <path fill={'#FFF5F5'} d={'M18,23.3h-7.4v5.3c0,0.6,0.5,1.1,1.1,1.1H18V23.3z'} />
              <path fill={'#FFF5F5'} d={'M10.6,28.5c0,0.6,0.5,1.1,1.1,1.1H18v-6.3h-7.4'} />
            </g>
          </g>
        </g>
        <path fill={'#E3E7EA'} d={'M24.3,16.9H18v4.2h7.4V18C25.4,17.4,24.9,16.9,24.3,16.9z'} />
      </g>
    </Icon>
  )
}
