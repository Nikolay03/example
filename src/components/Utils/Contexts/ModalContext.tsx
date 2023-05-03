import { createContext, ReactElement, ReactNode, useContext } from 'react'
import { useDisclosure } from '@chakra-ui/react'

type TModalContext = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const ModalContext = createContext<TModalContext>(null)

export function useModal (): TModalContext {
  return useContext(ModalContext)
}

interface Props {
  children: ReactNode
  isCustom?: boolean
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function ModalProvider (props: Props): ReactElement {
  const { children, isCustom, isOpen, onOpen, onClose } = props

  const {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal
  } = useDisclosure()

  if (isCustom) {
    return (
      <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>
        {children}
      </ModalContext.Provider>
    )
  }

  const providerProps = {
    isOpen: isOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal
  }

  return (
    <ModalContext.Provider value={providerProps}>
      {children}
    </ModalContext.Provider>
  )
}
