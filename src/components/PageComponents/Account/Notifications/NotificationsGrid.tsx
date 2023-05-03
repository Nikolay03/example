import { ReactElement, ReactNode } from 'react'
import { Stack } from '@chakra-ui/react'

import NotificationsSkeleton from './NotificationsSkeleton'

interface Props {
  children: ReactNode
  isLoading: boolean
}

export default function NotificationsGrid (props: Props): ReactElement {
  const { children, isLoading } = props

  if (isLoading) {
    return (
      <Stack spacing={8}>
        <NotificationsSkeleton />
      </Stack>
    )
  }

  return (
    <Stack spacing={8}>
      {children}
    </Stack>
  )
}
