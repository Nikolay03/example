import { ReactElement, ReactNodeArray } from 'react'
import { Stack } from '@chakra-ui/react'

import ReviewsSkeleton from './ReviewsSkeleton'

interface Props {
  children: ReactNodeArray
  isLoading: boolean
}

export default function ReviewsGrid (props: Props): ReactElement {
  const { children, isLoading } = props

  const gridProps = {
    spacing: { base: 4, md: 6 }
  }

  if (isLoading) {
    return (
      <ReviewsSkeleton {...gridProps} />
    )
  }

  return (
    <Stack {...gridProps}>
      {children}
    </Stack>
  )
}
