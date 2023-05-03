import { ReactElement, ReactNode } from 'react'
import { Box, Skeleton, SkeletonText, Stack } from '@chakra-ui/react'

interface FaqGroupContainerProps {
  children: ReactNode
}

const FaqItemSkeleton = () => {
  return (
    <Box
      bgColor={'white'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      p={6}>
      <SkeletonText noOfLines={2} spacing={4} />
    </Box>
  )
}

const FaqGroupContainer = (props: FaqGroupContainerProps) => {
  return (
    <Box
      bgColor={'gray.100'}
      borderRadius={{ base: 'lg', md: '2xl' }}
      p={{ base: 4, md: 6 }}>
      <Stack spacing={6}>
        <Skeleton borderRadius={'base'} h={5} w={'40%'} />

        <Stack spacing={{ base: 4, md: 6 }}>
          {props.children}
        </Stack>
      </Stack>
    </Box>
  )
}

export default function FaqSkeleton (): ReactElement {
  return (
    <Stack spacing={6}>
      <FaqGroupContainer>
        <FaqItemSkeleton />
      </FaqGroupContainer>

      <FaqGroupContainer>
        <FaqItemSkeleton />
        <FaqItemSkeleton />
      </FaqGroupContainer>
    </Stack>
  )
}
