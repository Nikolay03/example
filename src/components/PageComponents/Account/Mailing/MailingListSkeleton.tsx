import { ReactElement } from 'react'
import { Skeleton, Stack } from '@chakra-ui/react'

function CheckboxSkeleton (): ReactElement {
  return (
    <Stack align={'center'} direction={'row'} spacing={3}>
      <Skeleton h={'18px'} w={'18px'} />
      <Skeleton h={4} w={'35%'} />
    </Stack>
  )
}

export default function MailingListSkeleton (): ReactElement {
  return (
    <Stack spacing={6}>
      <Skeleton h={3} w={'55%'} />

      <CheckboxSkeleton />
      <CheckboxSkeleton />
      <CheckboxSkeleton />
      <CheckboxSkeleton />
      <CheckboxSkeleton />
      <CheckboxSkeleton />
    </Stack>
  )
}
