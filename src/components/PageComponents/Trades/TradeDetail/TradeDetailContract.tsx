import { ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { useRouter } from 'next/router'
import { Stack } from '@chakra-ui/react'

import TradeDocument from './TradeDocument'

import * as API from '~/constants/api'
import { TFile } from '~/types/files'
import { TTradesStatusFaktura } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { useDetailRequest } from '~/hooks/api'
import StatusTag from '~/components/StatusTag'

interface Props {
  file: TFile
}

export default function TradeDetailContract (props: Props): ReactElement {
  const { file } = props

  const { t } = useTranslate()

  const { query: { slug } } = useRouter()

  const apiUrl = sprintf(API.TRADE_DETAIL_STATUS_FAKTURA, slug)

  const { data, isLoading } = useDetailRequest<TTradesStatusFaktura>(apiUrl)
  const status = prop('status', data)

  return (
    <Stack>
      <TradeDocument
        file={file}
        name={t('trades_download_contract')}
      />
      {(status && !isLoading) && (
        <StatusTag color={'palette.common.blue'}>
          {status}
        </StatusTag>
      )}
    </Stack>
  )
}
