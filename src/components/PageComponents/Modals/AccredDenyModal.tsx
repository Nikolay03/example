import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Button, ModalProps, Stack } from '@chakra-ui/react'

import { MODAL_QUERIES } from '~/constants/modals'
import { ACCOUNT_PERSONAL_URL } from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import AccreditationRequired from '~/icons/modals/AccreditationRequired'
import { ModalDescription, ModalTitle, PopModal } from '~/components/Modal'

interface Props extends Pick<ModalProps, 'isOpen' | 'onClose'> {
  description: string
}

export default function AccredDenyModal (props: Props): ReactElement {
  const { isOpen, onClose, description } = props

  const { t } = useTranslate()

  const router = useRouter()

  function toAccreditationForm () {
    return router.push({
      pathname: ACCOUNT_PERSONAL_URL,
      query: {
        ...router.query,
        [MODAL_QUERIES.OPEN_ACCREDITATION]: true
      }
    })
  }

  return (
    <PopModal isOpen={isOpen} onClose={onClose}>
      <Stack spacing={6}>
        <Stack spacing={5}>
          <AccreditationRequired alignSelf={'center'} />
          <ModalTitle>
            {t('accreditation_deny_modal_title')}
          </ModalTitle>
        </Stack>

        <ModalDescription>
          {description}
        </ModalDescription>

        <Button
          alignSelf={'center'}
          size={'lg'}
          onClick={toAccreditationForm}>
          {t('accreditation_deny_modal_button')}
        </Button>
      </Stack>
    </PopModal>
  )
}
