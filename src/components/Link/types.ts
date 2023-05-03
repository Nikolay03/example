import { LinkProps as NextLinkProps } from 'next/link'
import { LinkProps as ChakraLinkProps } from '@chakra-ui/react'

export interface LinkProps extends Omit<NextLinkProps, 'as'>, Omit<ChakraLinkProps, 'href'> {

}
