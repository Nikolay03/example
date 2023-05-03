import { ReactElement } from 'react'

import { LinkProps } from './types'
import Link from './Link'

export default function PrimaryLink (props: LinkProps): ReactElement {
  const { children, href, ...restProps } = props

  return (
    <Link
      href={href}
      colorScheme={'primary'}
      fontWeight={'semibold'}
      variant={'primary'}
      textDecor={'none'}
      {...restProps}>
      {children}
    </Link>
  )
}
