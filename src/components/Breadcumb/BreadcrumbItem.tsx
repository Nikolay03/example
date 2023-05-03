import { ReactElement } from 'react'
import { BreadcrumbItem as ChakraBreadcrumbItem, BreadcrumbItemProps } from '@chakra-ui/react'

export default function BreadcrumbItem (props: BreadcrumbItemProps): ReactElement {
  return (
    <ChakraBreadcrumbItem
      {...props}
    />
  )
}
