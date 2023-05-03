import { ReactElement, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, Stack, useBoolean } from '@chakra-ui/react'

import AccreditationModalForm from './AccreditationModalForm'

import { MODAL_QUERIES } from '~/constants/modals'
import { useTranslate } from '~/utils/translate'
import AccreditationSuccess from '~/icons/modals/AccreditationSuccess'
import { PopModal, ModalTitle, ModalDescription } from '~/components/Modal'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function AccreditationModal (props: Props): ReactElement {
  const { isOpen, onClose } = props

  const { t } = useTranslate()

  const router = useRouter()

  const [succeeded, setSucceeded] = useBoolean()

  const onSubmitSuccess = useCallback(() => {
    setSucceeded.on()
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        [MODAL_QUERIES.OPEN_ACCREDITATION]: null
      }
    })
  }, [])

  const onCloseAndClear = useCallback(() => {
    onClose()
    setTimeout(() => {
      setSucceeded.off()
    }, 200)
  }, [])

  const modalTitle = succeeded ? null : t('account_accreditation_title')

  return (
    <PopModal
      title={modalTitle}
      isOpen={isOpen}
      onClose={succeeded ? onCloseAndClear : onClose}>
      {succeeded
        ? (
          <Stack spacing={6}>
            <Stack spacing={5}>
              <AccreditationSuccess alignSelf={'center'} />
              <ModalTitle>
                {t('account_accreditation_modal_success_title')}
              </ModalTitle>
            </Stack>

            <ModalDescription>
              {t('account_accreditation_modal_success_description')}
            </ModalDescription>

            <Button alignSelf={'center'} size={'lg'} onClick={onCloseAndClear}>
              {t('button_understood')}
            </Button>
          </Stack>
        )
        : (
          <AccreditationModalForm
            onSuccess={onSubmitSuccess}
          />
        )}
    </PopModal>
  )
}
