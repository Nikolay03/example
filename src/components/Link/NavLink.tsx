import { ReactElement, ReactNode } from 'react'
import { useRouter } from 'next/router'

import { LinkProps } from './types'
import Link from './Link'

interface Props extends LinkProps {
  activeClassName?: string
  children: ReactNode
}

function NavLink (props: Props): ReactElement {
  const { href, activeClassName, children, ...restProps } = props
  const router = useRouter()

  const isActive = router.pathname === href

  const className = isActive ? activeClassName : ''

  return (
    <Link
      className={className}
      fontWeight={'semibold'}
      href={href}
      {...restProps}>
      {children}
    </Link>
  )
}

NavLink.defaultProps = {
  activeClassName: 'active'
}

export default NavLink
