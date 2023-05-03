import { ReactElement } from 'react'
import { Flex, FlexProps, useToken } from '@chakra-ui/react'

export default function ReportItemContainer (props: FlexProps): ReactElement {
  const mdBreakpoint = useToken('breakpoints', 'md')

  return (
    <Flex
      borderTop={'1px solid'}
      borderColor={'gray.200'}
      pt={4}
      pb={4}
      _first={{ borderTop: 'none' }}
      sx={{
        [`@media (min-width: ${mdBreakpoint})`]: {
          '&:nth-of-type(-n + 2)': {
            borderTop: 'none',
            paddingTop: 'unset'
          },
          '&:nth-last-of-type(-n + 2)': {
            paddingBottom: 'unset'
          }
        }
      }}
      {...props}
    />
  )
}
