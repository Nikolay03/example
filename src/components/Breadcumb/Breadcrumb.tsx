import { ReactElement } from 'react'
import { ChevronRight } from 'react-feather'
import { Breadcrumb as ChakraBreadcrumb, BreadcrumbProps } from '@chakra-ui/react'

export default function Breadcrumb (props: BreadcrumbProps): ReactElement {
  return (
    <ChakraBreadcrumb
      fontSize={'sm'}
      separator={<ChevronRight size={14} />}
      spacing={2}
      mb={8}
      sx={{
        '& svg': {
          color: 'gray.500'
        }
      }}
      {...props}
    />
  )
}
