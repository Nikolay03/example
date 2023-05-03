import { forwardRef } from 'react'

import { LinkProps } from './types'
import LinkSimple from './LinkSimple'

export default forwardRef<HTMLAnchorElement, LinkProps>(function Link (props, ref) {
  // eslint-disable-next-line react/prop-types
  const { href, children, ...restProps } = props

  return (
    <LinkSimple href={href} innerRef={ref} {...restProps}>
      {children}
    </LinkSimple>
  )
})
