import { ReactElement, ReactNode } from 'react'
import {
  Button,
  ButtonGroup,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps
} from '@chakra-ui/react'

interface Props extends ModalProps {
  title: ReactNode
  onSubmit?: () => void
  submitText?: string
  showFooter?: boolean
}

function Modal (props: Props): ReactElement {
  const {
    title,
    isOpen,
    onClose,
    children,
    onSubmit,
    submitText,
    showFooter,
    ...restProps
  } = props

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap={true}
      motionPreset={'slideInBottom'}
      size={'lg'}
      {...restProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton _focus={{ boxShadow: 'none' }} />

        <ModalBody>
          {children}
        </ModalBody>

        {showFooter && (
          <ModalFooter>
            <ButtonGroup spacing={4}>
              <Button colorScheme={'gray'} variant={'ghost'} onClick={onClose}>
                Close
              </Button>
              {onSubmit && (
                <Button onClick={onSubmit}>
                  {submitText}
                </Button>
              )}
            </ButtonGroup>
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  )
}

Modal.defaultProps = {
  showFooter: true
}

export default Modal
