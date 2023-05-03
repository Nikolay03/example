import { ReactElement, Fragment, useState } from 'react'
import { prop } from 'ramda'
import { Button, Stack, useDisclosure } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { SecurityTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useAuth } from '~/components/AuthProvider'
import { AccountContainer, AccountSaveButton } from '~/components/PageComponents/Account'
import { HookForm, Input, NumberInput, PasswordInput, PhoneInput, useFieldRules } from '~/components/HookForm'
import { ModalDescription, PopModal } from '~/components/Modal'

interface FormValues {
  [SecurityTypes.EMAIL]: string
  [SecurityTypes.PHONE]: string
  password: string
}

interface Props {
  type: SecurityTypes
}

export default function SecurityUsernameForm (props: Props): ReactElement {
  const { type } = props

  const { t } = useTranslate()

  const toast = useToast()

  const { user, fetchUserInfo } = useAuth()

  const { emailRules } = useFieldRules()

  const [username, setUsername] = useState('')

  const { isOpen, onOpen, onClose } = useDisclosure()

  const changeUsernameCheck = useCreate(API.CHANGE_USERNAME_CHECK)
  const changeUsername = useCreate(API.CHANGE_USERNAME)

  function onSubmit (values: FormValues) {
    const usernameValue = prop(type, values)

    return changeUsernameCheck
      .create({
        username: usernameValue,
        password: prop('password', values)
      })
      .then(() => {
        setUsername(usernameValue)
        onOpen()
      })
  }

  function onSubmitConfirm (values) {
    return changeUsername.create({ ...values, username })
      .then(() => {
        toast({
          title: t('account_security_username_change_success_title'),
          description: t('account_security_username_change_success_message'),
          status: 'success'
        })
      })
      .then(onClose)
      .then(fetchUserInfo)
  }

  const defaultValues = {
    email: prop('username', user),
    phone: prop('phoneNumber', user)
  }

  const confirmModalDescription = {
    [SecurityTypes.EMAIL]: t('account_security_username_email_modal_description'),
    [SecurityTypes.PHONE]: t('account_security_username_phone_modal_description')
  }[type]

  return (
    <Fragment>
      <HookForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        resetOnSuccess={true}>
        <AccountContainer>
          <Stack mb={6} spacing={6} w={{ base: 'full', md: '50%' }}>
            {type === SecurityTypes.EMAIL && (
              <Input
                name={type}
                label={t('input_email_label')}
                rules={emailRules}
                size={'xl'}
                type={'email'}
                autoComplete={'off'}
              />
            )}
            {type === SecurityTypes.PHONE && (
              <PhoneInput
                name={type}
                label={t('input_phone_label')}
                rules={{ required: true }}
                size={'xl'}
                autoComplete={'off'}
              />
            )}
            <PasswordInput
              name={'password'}
              label={t('input_password_label')}
              rules={{ required: true }}
              size={'xl'}
              autoComplete={'off'}
            />
          </Stack>

          <AccountSaveButton isLoading={changeUsernameCheck.isLoading} />
        </AccountContainer>
      </HookForm>

      <PopModal
        title={t('account_security_username_modal_title')}
        isOpen={isOpen}
        onClose={onClose}>
        <Stack spacing={6}>
          <ModalDescription>
            {confirmModalDescription}
          </ModalDescription>
          <HookForm onSubmit={onSubmitConfirm}>
            <Stack spacing={6}>
              <NumberInput
                name={'code'}
                label={t('input_confirmation_code_label')}
                isRequired={true}
                size={'xl'}
                rules={{ required: true }}
              />

              <Button
                borderRadius={'xl'}
                isLoading={changeUsername.isLoading}
                size={'lg'}
                type={'submit'}>
                {t('button_confirm')}
              </Button>
            </Stack>
          </HookForm>
        </Stack>
      </PopModal>
    </Fragment>
  )
}
