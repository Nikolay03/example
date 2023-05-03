import { ReactElement } from 'react'
import { LinkProps } from 'next/link'
import { BreadcrumbLink as ChakraBreadcrumbLink, BreadcrumbLinkProps } from '@chakra-ui/react'

import Link from '~/components/Link'

interface Props extends BreadcrumbLinkProps, Omit<LinkProps, 'as' | 'href'> {}

export default function BreadcrumbLink (props: Props): ReactElement {
  const { href, shallow, ...restProps } = props

  return (
    <ChakraBreadcrumbLink
      as={Link}
      href={href}
      shallow={shallow}
      {...restProps}
    />
  )
}
