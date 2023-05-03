import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

interface Props {
  html: string
}

export default function HtmlContent (props: Props): ReactElement {
  const { html } = props

  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        '& h2': {
          fontSize: { base: 'xl', md: '2xl' },
          fontWeight: 'semibold'
        },
        '& h3': {
          fontSize: { base: 'lg', md: 'xl' },
          fontWeight: 'semibold'
        },
        '& p': {
          lineHeight: 'base'
        },
        '& ul, & ol': {
          listStylePos: 'inside',
          lineHeight: 'base'
        }
      }}
    />
  )
}
