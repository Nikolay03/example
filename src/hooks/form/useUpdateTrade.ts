import { pipe } from 'ramda'
import { sprintf } from 'sprintf-js'

import { serializer } from './useSubmitTrade'

import * as API from '~/constants/api'
import { TUseSubmit } from '~/types/hooks'
import { replaceEmptyValuesToNull } from '~/utils/object'
import { useTranslate } from '~/utils/translate'
import { TPostPromise } from '~/hooks/api/types'
import { useToast } from '~/hooks/index'
import { useSubmitForm } from '~/hooks/form/index'
import { useUpdate } from '~/hooks/crud'
import { useErrorModal } from '~/components/ErrorModal'

interface TUseSubmitResult extends TUseSubmit {
  onSubmitDraft: TPostPromise
  isLoadingDraft: boolean
}

export default function useUpdateTrade (id: string, onSuccess?: () => void): TUseSubmitResult {
  const { t } = useTranslate()

  const toast = useToast()

  const errorModal = useErrorModal()

  const { getSubmitErrors } = useSubmitForm()

  const { update, isLoading } = useUpdate(sprintf(API.TRADE_UPDATE, id))
  const { update: updateDraft, isLoading: isLoadingDraft } = useUpdate(sprintf(API.TRADE_UPDATE_DRAFT, id))

  function onSubmitSuccess () {
    onSuccess?.()
  }

  function onFail (error) {
    const { errors, nonFieldError } = getSubmitErrors(error)

    if (nonFieldError) {
      return toast({
        title: t('error_default_label'),
        description: nonFieldError,
        status: 'error'
      })
    }

    return errorModal.onOpen({ errors })
  }

  function onSubmit (values) {
    return update(serializer(values))
      .then(() => {
        toast({
          title: t('trades_update_success_title'),
          description: t('trades_update_success_description'),
          status: 'success'
        })
      })
      .then(onSubmitSuccess)
      .catch(onFail)
  }

  function onSubmitDraft (values) {
    const serializedValues = pipe(serializer, replaceEmptyValuesToNull)(values)
    return updateDraft(serializedValues)
      .then(() => {
        toast({
          title: t('trades_update_draft_success_title'),
          description: t('trades_update_draft_success_description'),
          status: 'success'
        })
      })
      .then(onSubmitSuccess)
      .catch(onFail)
  }

  return {
    onSubmit,
    onSubmitDraft,
    isLoading,
    isLoadingDraft
  }
}
