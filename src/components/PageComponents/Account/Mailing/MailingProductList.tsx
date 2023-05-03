import { ReactElement } from 'react'
import { filter, includes, map, path, pipe, prop } from 'ramda'
import { Button, Checkbox, Stack, useDisclosure } from '@chakra-ui/react'

import MailingListSkeleton from './MailingListSkeleton'

import * as API from '~/constants/api'
import { TCgcNotify } from '~/types/notifications'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useDetailRequest } from '~/hooks/api'
import { useCreate } from '~/hooks/crud'
import { CheckboxGroup, HookForm } from '~/components/HookForm'
import { AccountContainer, AccountSaveButton } from '~/components/PageComponents/Account'
import { ProductsGroupModal } from '~/components/ProductsGroup'

function notifyChangeSerializer (results, values) {
  const list = prop('list', values)

  return map(item => {
    const id = String(prop('id', item))
    const isActive = includes(id, list)

    return { id, isActive }
  }, results)
}

export default function MailingProductList (): ReactElement {
  const { t, translateData } = useTranslate()

  const toast = useToast()

  const { data, isLoading, refetch } = useDetailRequest<TCgcNotify[]>(API.MAILING_PRODUCT_LIST, {
    fallbackData: []
  })

  const mailingCreate = useCreate(API.MAILING_PRODUCT_CREATE)

  const mailingUpdate = useCreate(API.MAILING_PRODUCT_LIST_UPDATE)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const checkedItems = pipe<TCgcNotify[], TCgcNotify[], string[]>(
    filter(prop('isActive')),
    map(pipe(prop('id'), String))
  )(data)

  const checkedCgc = pipe<TCgcNotify[], TCgcNotify[], string[]>(
    filter(prop('isActive')),
    map(pipe(path(['cgc', 'id']), String))
  )(data)

  const defaultValues = {
    list: checkedItems,
    cgc: checkedCgc
  }

  function onSubmit (values) {
    return mailingUpdate.create(notifyChangeSerializer(data, values))
      .then(() => {
        toast({
          title: t('account_mailing_update_success_title'),
          description: t('account_mailing_update_success_message'),
          status: 'success'
        })
      })
  }

  function onConfirmProducts (cgc) {
    return mailingCreate.create({ cgc })
      .then(onClose)
      .then(() => refetch())
  }

  if (isLoading) {
    return (
      <MailingListSkeleton />
    )
  }

  const initialSelectedIds = data.map(item => String(item.cgc.id))

  return (
    <HookForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <AccountContainer>
        <CheckboxGroup name={'list'}>
          <Stack spacing={6}>
            {data.map(item => {
              const id = prop('id', item)
              const cgc = prop('cgc', item)

              return (
                <Checkbox key={id} value={String(id)}>
                  {translateData(cgc, 'name')}
                </Checkbox>
              )
            })}
          </Stack>
        </CheckboxGroup>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={5}
          mt={6}>
          <AccountSaveButton isLoading={mailingUpdate.isLoading} />

          <Button variant={'outline'} onClick={onOpen}>
            {t('account_mailing_add_product_group_button')}
          </Button>
        </Stack>
      </AccountContainer>

      <ProductsGroupModal
        name={'cgc'}
        type={'checkbox'}
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirmProducts}
        isLoading={mailingCreate.isLoading}
        initialValue={initialSelectedIds}
      />
    </HookForm>
  )
}
