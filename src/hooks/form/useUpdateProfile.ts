import { equals, prop } from 'ramda'

import { individualSerializer, entitySerializer } from './useSubmitRegistration'

import { UPDATE_PROFILE } from '~/constants/api'
import { UserTypes } from '~/types/enums'
import { TUseSubmit } from '~/types/hooks'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useUpdate } from '~/hooks/crud'
import { useAuth } from '~/components/AuthProvider'

export default function useUpdateProfile (): TUseSubmit {
  const { t } = useTranslate()

  const toast = useToast()

  const { user, fetchUserInfo } = useAuth()

  const { update, isLoading } = useUpdate(UPDATE_PROFILE)

  function onSubmit (values) {
    const userType = prop('registerAs', user)
    const userIsIndividual = equals(UserTypes.INDIVIDUAL, userType)

    const serializedValues = userIsIndividual
      ? individualSerializer(values)
      : entitySerializer(values)

    return update(serializedValues)
      .then(() => {
        toast({
          title: t('account_update_success_title'),
          description: t('account_update_success_message'),
          status: 'success'
        })
      })
      .then(fetchUserInfo)
  }

  return { onSubmit, isLoading }
}
