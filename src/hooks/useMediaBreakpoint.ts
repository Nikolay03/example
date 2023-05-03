import { useMediaQuery, useToken } from '@chakra-ui/react'

interface UseMediaBreakpoint {
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  invert?: boolean
}

export default function useMediaBreakpoint ({ breakpoint, invert }: UseMediaBreakpoint): boolean {
  const [mediaBreakpoint] = useToken('breakpoints', [breakpoint])
  const [isLargerThanBreakpoint] = useMediaQuery(`(min-width: ${mediaBreakpoint})`)

  if (invert) return !isLargerThanBreakpoint

  return isLargerThanBreakpoint
}
