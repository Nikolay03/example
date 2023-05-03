import { forwardRef, ReactElement } from 'react'
import NextLink from 'next/link'
import { ChevronRight } from 'react-feather'
import { Button, ButtonProps, Link, LinkProps } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'

interface CustomLinkProps extends LinkProps {
  href: string
}

interface MoreButtonProps extends ButtonProps {
  href?: string
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(function CustomLinkRef (props, ref) {
  // eslint-disable-next-line react/prop-types
  const { href, ...rest } = props

  return (
    <NextLink href={href}>
      <Link ref={ref} href={href} {...rest} />
    </NextLink>
  )
})

export default function MoreButton (props: MoreButtonProps): ReactElement {
  const { href, onClick, children, ...restProps } = props

  const { t } = useTranslate()

  const defaultProps = {
    children: children || t('button_see_more'),
    fontSize: { base: 'sm', md: 'md' },
    variant: 'link',
    rightIcon: <ChevronRight />,
    iconSpacing: 0,
    ...restProps
  }

  if (href) {
    return (
      <Button
        as={CustomLink}
        href={href}
        {...defaultProps}
      />
    )
  }

  return (
    <Button onClick={onClick} {...defaultProps} />
  )
}
