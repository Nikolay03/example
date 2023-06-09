/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export default function AboutOnline (props: IconProps): ReactElement {
  return (
    <Icon boxSize={12} viewBox={'0 0 48 48'} fill={'currentColor'} {...props}>
      <path d={'M0 19.6367V24.0004C10.8437 24.0004 19.6364 32.7931 19.6364 43.6368H24.0001C24.0001 30.3822 13.2546 19.6367 0 19.6367Z'} />
      <path d={'M0 28.3638V32.7274C6.02182 32.7274 10.9091 37.6148 10.9091 43.6366H15.2728C15.2727 35.2038 8.4327 28.3638 0 28.3638Z'} />
      <path d={'M0 37.0908V43.6363H6.54546C6.54546 40.0253 3.61095 37.0908 0 37.0908Z'} />
      <path d={'M43.6364 4.36377H4.36367C1.95269 4.36377 0 6.31646 0 8.72734V15.2728H4.36367V8.72734H43.6364V39.2729H28.3636V43.6365H43.6363C46.0472 43.6365 48 41.6838 48 39.2729V8.72734C48 6.31646 46.0473 4.36377 43.6364 4.36377Z'} />
      <path d={'M39.2726 13.0908H8.72705V16.6581C17.3671 19.4509 24.1853 26.269 26.9779 34.909H39.2726V13.0908Z'} />
    </Icon>
  )
}
