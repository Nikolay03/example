import { equals, path, prop } from 'ramda'
import { useRouter } from 'next/router'

import * as API from '~/constants/api'
import { ROOT_URL } from '~/constants/routes'
import { TRegion } from '~/types/geo'
import { TSelectListItem } from '~/types/constants'
import { TUseSubmit } from '~/types/hooks'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useSubmitForm } from '~/hooks/form'
import { useErrorModal } from '~/components/ErrorModal'

interface RegIndividualRequest {
  firstName: string
  lastName: string
  patronymicName: string
  position: string
  phoneNumber: string
  contactNumber: string
  email: string
  password: string
  inn: string
  region: TRegion
  productInterests: string[]
}

interface RegEntityRequest extends RegIndividualRequest {
  companyName: string
  companyType: TSelectListItem
  companyDescription: string
  site: string
}

export function individualSerializer (values: RegIndividualRequest): RegIndividualRequest {
  return {
    firstName: prop('firstName', values),
    lastName: prop('lastName', values),
    patronymicName: prop('patronymicName', values),
    position: prop('position', values),
    phoneNumber: prop('phoneNumber', values),
    contactNumber: prop('contactNumber', values),
    email: prop('email', values),
    password: prop('password', values),
    inn: prop('inn', values),
    region: path(['region', 'id'], values),
    productInterests: prop('productInterests', values) || []
  }
}

export function entitySerializer (values: RegEntityRequest): RegEntityRequest {
  return {
    ...individualSerializer(values),
    companyName: prop('companyName', values),
    companyType: path(['companyType', 'id'], values),
    companyDescription: prop('companyDescription', values),
    site: prop('site', values)
  }
}

export default function useSubmitRegistration (): TUseSubmit {
  const { t } = useTranslate()
  const router = useRouter()

  const toast = useToast()
  const errorModal = useErrorModal()
  const { getSubmitErrors } = useSubmitForm()

  const createIndividual = useCreate(API.SIGN_UP_INDIVIDUAL)
  const createEntity = useCreate(API.SIGN_UP_ENTITY)
  const isLoading = createIndividual.isLoading || createEntity.isLoading

  function onSuccess () {
    toast({
      title: t('reg_success_title'),
      description: t('reg_success_message'),
      status: 'success',
      position: 'top'
    })

    return router.replace({
      pathname: ROOT_URL,
      query: router.query
    })
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
    const userType = path(['userType', 'id'], values)

    if (equals(userType, 'individual')) {
      return createIndividual.create(individualSerializer(values))
        .then(onSuccess)
        .catch(onFail)
    }

    if (equals(userType, 'entity')) {
      return createEntity.create(entitySerializer(values))
        .then(onSuccess)
        .catch(onFail)
    }

    return Promise.resolve()
  }

  return { onSubmit, isLoading }
}
