import { ForwardedRef, ReactElement, ReactNode } from 'react'
import NextLink from 'next/link'
import { Link as ChakraLink } from '@chakra-ui/react'

import { LinkProps } from './types'

interface Props extends LinkProps {
  children: ReactNode
  innerRef: ForwardedRef<HTMLAnchorElement>
}

export default function LinkSimple (props: Props): ReactElement {
  const {
    href,
    children,
    innerRef,
    locale,
    prefetch,
    scroll,
    shallow,
    replace,
    ...restProps
  } = props

  return (
    <NextLink
      href={href}
      locale={locale}
      prefetch={prefetch}
      scroll={scroll}
      replace={replace}
      shallow={shallow}
      passHref={true}>
      <ChakraLink
        ref={innerRef}
        fontWeight={'medium'}
        outline={'none'}
        _hover={{ textDecoration: 'none' }}
        {...restProps}>
        {children}
      </ChakraLink>
    </NextLink>
  )
}
