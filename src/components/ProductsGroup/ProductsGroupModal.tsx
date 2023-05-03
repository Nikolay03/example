import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button, SimpleGrid, Stack } from '@chakra-ui/react'

import ProductsGroup from './ProductsGroup'

import { useTranslate } from '~/utils/translate'
import { ModalDescription, PopModal } from '~/components/Modal'

interface Props {
  name: string
  type: 'checkbox' | 'radio'
  isDisabled?: boolean
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
  onConfirm?: (value) => void
  initialValue?: string[]
}

export default function ProductsGroupModal (props: Props): ReactElement {
  const { name, type, isOpen, onClose, isDisabled, isLoading, onConfirm, initialValue } = props

  const { t } = useTranslate()

  const { watch } = useFormContext()

  const value = watch(name)

  function onConfirmProducts () {
    if (typeof onConfirm === 'function') {
      return onConfirm(value)
    }
  }

  return (
    <PopModal
      title={'Товарная группа'}
      isOpen={isOpen}
      onClose={onClose}
      size={'4xl'}>
      <Stack spacing={4}>
        <ModalDescription>
          {t('input_product_group_search_label')}
        </ModalDescription>

        <ProductsGroup
          name={name}
          type={type}
          initialValue={initialValue}
        />
      </Stack>

      <SimpleGrid columns={2} mt={10} spacing={6}>
        <Button
          borderRadius={'xl'}
          variant={'secondary'}
          size={'lg'}
          onClick={onClose}>
          {t('button_cancel')}
        </Button>

        <Button
          borderRadius={'xl'}
          isDisabled={isDisabled}
          isLoading={isLoading}
          size={'lg'}
          onClick={onConfirmProducts}>
          {t('button_confirm')}
        </Button>
      </SimpleGrid>
    </PopModal>
  )
}
