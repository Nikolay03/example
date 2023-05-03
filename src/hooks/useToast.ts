import { useToast as useChakraToast, IToast } from '@chakra-ui/react'

type TUseToast = (options: IToast) => void

export default function useToast (options?: IToast): TUseToast {
  return useChakraToast({
    duration: 5000,
    isClosable: true,
    position: 'top-left',
    variant: 'solid',
    ...options
  })
}
