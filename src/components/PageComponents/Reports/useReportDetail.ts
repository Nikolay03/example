import { has } from 'ramda'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'
import { useDisclosure } from '@chakra-ui/react'

import * as API from '~/constants/api'
import { TReport } from '~/types/reports'
import { openDocumentLink } from '~/utils/url'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useAuth } from '~/components/AuthProvider'
import { useDetailRequest } from '~/hooks/api'

interface UseReportDetailParams {
  api: string
  data: TReport
}

interface UseReportDetail {
  detail: TReport
  isLoadingPurchase: boolean
  isOpenPurchase: boolean
  onOpenPurchase: () => void
  onClosePurchase: () => void
  onSubmitPurchase: () => Promise<void>
  onDownloadFile: () => void
  onDownloadPreviewFile: () => void
}

export default function useReportDetail (params: UseReportDetailParams): UseReportDetail {
  const { api, data } = params

  const { t } = useTranslate()

  const { query: { slug } } = useRouter()

  const toast = useToast()

  const { fetchUserInfo } = useAuth()

  const { data: detail, refetch } = useDetailRequest<TReport>(api, {
    initialData: data
  })

  const {
    isOpen: isOpenPurchase,
    onOpen: onOpenPurchase,
    onClose: onClosePurchase
  } = useDisclosure()

  const {
    create: createPurchase,
    isLoading: isLoadingPurchase
  } = useCreate(sprintf(API.REPORT_PURCHASE, slug))

  function onSubmitPurchase () {
    return createPurchase()
      .then(response => {
        const isCreatedInvoice = has('invoice', response)
        const isCreatedTransaction = has('transaction', response)
        if (isCreatedInvoice) {
          toast({
            title: t('reports_purchase_warning_title'),
            description: t('reports_purchase_warning_message'),
            status: 'warning'
          })
        }
        if (isCreatedTransaction) {
          toast({
            title: t('reports_purchase_success_title'),
            description: t('reports_purchase_success_message'),
            status: 'success'
          })
        }
      })
      .then(refetch)
      .then(onClosePurchase)
      .then(fetchUserInfo)
      .catch(({ detail }) => {
        toast({
          title: t('error_default_label'),
          description: detail,
          status: 'error'
        })
      })
  }

  function onDownloadFile () {
    const api = sprintf(API.REPORT_DOWNLOAD_FILE, slug)
    openDocumentLink(api)
  }

  function onDownloadPreviewFile () {
    const api = sprintf(API.REPORT_DOWNLOAD_PREVIEW_FILE, slug)
    openDocumentLink(api)
  }

  return {
    detail,
    isLoadingPurchase,
    isOpenPurchase,
    onOpenPurchase,
    onClosePurchase,
    onSubmitPurchase,
    onDownloadFile,
    onDownloadPreviewFile
  }
}
