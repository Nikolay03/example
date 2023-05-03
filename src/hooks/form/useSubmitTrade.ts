import { equals, path, pipe, prop } from 'ramda'

import * as API from '~/constants/api'
import { DATE_FORMATS, formatFalsyDate } from '~/utils/date'
import { replaceEmptyValuesToNull } from '~/utils/object'
import { useTranslate } from '~/utils/translate'
import { TTradesRequest, TTradesSerialized } from '~/types/trades'
import { TUseSubmit } from '~/types/hooks'
import { TPostPromise } from '~/hooks/api/types'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useSubmitForm } from '~/hooks/form'
import { useErrorModal } from '~/components/ErrorModal'

function getObjectValues<T, R extends keyof T> (data: T, name: R): T[R] | [] {
  return data[name] || []
}

export function serializer (values: TTradesRequest): TTradesSerialized {
  const dateFormat = DATE_FORMATS.DATE_FORMAT_SERVER
  const dateTimeFormat = DATE_FORMATS.DATETIME_FORMAT_SERVER

  const privacy: string = path(['privacy', 'id'], values)
  const isPrivate: boolean = equals('private', privacy)

  const deliveryGeo = prop('deliveryGeo', values) || []
  const [lat, lon] = deliveryGeo

  const documents = getObjectValues(values, 'documents').map(prop('id'))
  const images = getObjectValues(values, 'images').map(prop('id'))

  return {
    kind: path(['kind', 'id'], values),
    position: path(['position', 'id'], values),
    bargainStartDatetime: formatFalsyDate(prop('bargainStartDatetime', values), dateTimeFormat),
    bargainEndDatetime: formatFalsyDate(prop('bargainEndDatetime', values), dateTimeFormat),
    bargainType: path(['bargainType', 'id'], values),
    privacy,
    visibility: path(['visibility', 'id'], values),
    users: isPrivate ? getObjectValues(values, 'users').map(prop('id')) : [],
    vat: path(['vat', 'id'], values),
    vatIsIncludedInThePrice: prop('vatIsIncludedInThePrice', values) || false,
    responsibleContactPerson: prop('responsibleContactPerson', values),

    termsOfPurchase: prop('termsOfPurchase', values),
    deliveryStartDate: formatFalsyDate(prop('deliveryStartDate', values), dateFormat),
    deliveryEndDate: formatFalsyDate(prop('deliveryEndDate', values), dateFormat),
    deliveryDistrict: path(['deliveryDistrict', 'id'], values),
    incoterms: path(['incoterms', 'id'], values),
    deliveryAddress: prop('deliveryAddress', values),
    lat,
    lon,

    commodityGroupClassifier: path(['commodityGroupClassifier', 'id'], values),
    manufacturerCountry: path(['manufacturerCountry', 'id'], values),
    qualityStandard: path(['qualityStandard', 'id'], values),
    attributes: getObjectValues(values, 'attributes').map(path(['attribute', 'id'])),
    volume: prop('volume', values),
    measurement: path(['measurement', 'id'], values),
    description: prop('description', values),
    price: prop('price', values),
    currency: path(['currency', 'id'], values),

    documents,
    images
  }
}

interface TUseSubmitResult extends TUseSubmit {
  onSubmitDraft: TPostPromise
  isLoadingDraft: boolean
}

export default function useSubmitTrade (onSuccess?: () => void): TUseSubmitResult {
  const { t } = useTranslate()

  const toast = useToast()

  const errorModal = useErrorModal()

  const { create: createTrade, isLoading } = useCreate(API.TRADE_CREATE)
  const { create: createDraft, isLoading: isLoadingDraft } = useCreate(API.TRADE_CREATE_DRAFT)

  const { getSubmitErrors } = useSubmitForm()

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
    return createTrade(serializer(values))
      .then(() => {
        toast({
          title: t('trades_create_success_title'),
          description: t('trades_create_success_description'),
          status: 'success'
        })
      })
      .then(onSubmitSuccess)
      .catch(onFail)
  }

  function onSubmitDraft (values) {
    const serializedValues = pipe(serializer, replaceEmptyValuesToNull)(values)
    return createDraft(serializedValues)
      .then(() => {
        toast({
          title: t('trades_create_draft_success_title'),
          description: t('trades_create_draft_success_description'),
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
