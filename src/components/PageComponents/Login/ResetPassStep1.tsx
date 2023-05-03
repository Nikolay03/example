import { Fragment, ReactElement } from 'react'
import { equals, prop } from 'ramda'
import { Button, Stack } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { RESET_PASSWORD } from '~/constants/constants'
import { ResetPasswordTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import { HookForm, Input, PhoneInput, StaticSelectField, useFieldRules } from '~/components/HookForm'
import { TSelectListItem } from '~/types/constants'

interface GetResetType {
  isEmail: boolean
  isPhone: boolean
}

function getResetTypeObject (type: TSelectListItem<ResetPasswordTypes>): GetResetType {
  const typeId = prop('id', type)

  const isEmail = equals(ResetPasswordTypes.EMAIL, typeId)
  const isPhone = equals(ResetPasswordTypes.PHONE, typeId)

  return { isEmail, isPhone }
}

interface Props {
  onClose: () => void
}

export default function ResetPassStep1 (props: Props): ReactElement {
  const { onClose } = props

  const { t } = useTranslate()

  const toast = useToast()

  const { toNextStep } = useStepper()

  const { dispatch } = useWizard()

  const { emailRules } = useFieldRules()

  const { isLoading, ...resetPass } = useCreate(API.RESET_PASSWORD)

  function onSubmit (values) {
    const type = prop('type', values)
    const { isEmail, isPhone } = getResetTypeObject(type)

    if (isEmail) {
      const username = prop('username', values)
      return resetPass.create({ username })
        .then(() => {
          toast({
            title: t('login_reset_password_email_success_title'),
            description: t('login_reset_password_email_success_message'),
            status: 'success'
          })
        })
        .then(onClose)
    }

    if (isPhone) {
      const phone = prop('phone', values)
      return resetPass.create({ username: phone })
        .then(() => {
          dispatch({ phone })
          toNextStep()
        })
    }

    return Promise.resolve()
  }

  const buttonProps = {
    borderRadius: 'xl',
    size: 'lg'
  }

  return (
    <HookForm
      onSubmit={onSubmit}
      render={({ onSubmitForm, watch }) => {
        const type = watch('type')
        const { isEmail, isPhone } = getResetTypeObject(type)

        return (
          <form onSubmit={onSubmitForm}>
            <Stack spacing={6}>
              <StaticSelectField
                name={'type'}
                label={'Способ восстановления'}
                list={RESET_PASSWORD.list}
                isRequired={true}
                size={'xl'}
                rules={{ required: true }}
              />

              {isEmail && (
                <Fragment>
                  <Input
                    name={'username'}
                    label={t('input_email_label')}
                    isRequired={true}
                    size={'xl'}
                    type={'email'}
                    rules={emailRules}
                  />
                  <Button isLoading={isLoading} type={'submit'} {...buttonProps}>
                    {t('button_confirm')}
                  </Button>
                </Fragment>
              )}

              {isPhone && (
                <Fragment>
                  <PhoneInput
                    name={'phone'}
                    label={t('input_phone_label')}
                    isRequired={true}
                    size={'xl'}
                    rules={{ required: true }}
                  />
                  <Button isLoading={isLoading} type={'submit'} {...buttonProps}>
                    {t('button_continue')}
                  </Button>
                </Fragment>
              )}
            </Stack>
          </form>
        )
      }}
    />
  )
}
