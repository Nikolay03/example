import { ReactElement } from 'react'
import { Box } from '@chakra-ui/react'

function formatRatingValue (value: number): string {
  return Number(value).toFixed(1)
}

interface Props {
  fontSize?: string
  value?: number
}

export default function RatingValue (props: Props): ReactElement {
  const { fontSize, value } = props

  if (!value) return null

  return (
    <Box
      fontSize={fontSize}
      fontWeight={'semibold'}
      lineHeight={1}
      pos={'relative'}
      top={'1px'}>
      {formatRatingValue(value)}
    </Box>
  )
}
