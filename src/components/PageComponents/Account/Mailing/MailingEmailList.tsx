import { ReactElement } from 'react'
import { filter, map, pipe, prop } from 'ramda'
import { Checkbox, Stack } from '@chakra-ui/react'

import MailingListSkeleton from './MailingListSkeleton'

import * as API from '~/constants/api'
import { TMailingNotify } from '~/types/notifications'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useDetailRequest } from '~/hooks/api'
import { useCreate } from '~/hooks/crud'
import { HookForm, CheckboxGroup } from '~/components/HookForm'
import { AccountContainer, AccountSaveButton } from '~/components/PageComponents/Account'

export default function MailingEmailList (): ReactElement {
  const { t, translateData } = useTranslate()

  const toast = useToast()

  const { data, isLoading } = useDetailRequest<TMailingNotify[]>(API.MAILING_EMAIL_LIST, {
    fallbackData: []
  })

  const mailingCreate = useCreate(API.MAILING_EMAIL_CREATE)

  const checkedItems = pipe<TMailingNotify[], TMailingNotify[], string[]>(
    filter(prop('setUser')),
    map(pipe(prop('id'), String))
  )(data)

  const defaultValues = {
    emailNotify: checkedItems
  }

  function onSubmit (values) {
    return mailingCreate.create(values)
      .then(() => {
        toast({
          title: t('account_mailing_update_success_title'),
          description: t('account_mailing_update_success_message'),
          status: 'success'
        })
      })
  }

  if (isLoading) {
    return (
      <MailingListSkeleton />
    )
  }

  return (
    <HookForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <AccountContainer>
        <CheckboxGroup name={'emailNotify'}>
          <Stack spacing={6}>
            {data.map(item => {
              const id = prop('id', item)

              return (
                <Checkbox key={id} value={String(id)}>
                  {translateData(item, 'name')}
                </Checkbox>
              )
            })}
          </Stack>
        </CheckboxGroup>

        <AccountSaveButton isLoading={mailingCreate.isLoading} />
      </AccountContainer>
    </HookForm>
  )
}
