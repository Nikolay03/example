import { ReactElement, ReactNode } from 'react'
import { Box, Stack } from '@chakra-ui/react'

import { useDateFormat } from '~/utils/date'

interface Props {
  children: ReactNode
  date: string
}

export default function NotificationsDateGroup (props: Props): ReactElement {
  const { date, children } = props

  const { dateFormat } = useDateFormat()

  return (
    <Stack spacing={4}>
      <Box fontSize={'sm'} fontWeight={'semibold'}>
        {dateFormat(date)}
      </Box>

      <Stack spacing={6}>
        {children}
      </Stack>
    </Stack>
  )
}
