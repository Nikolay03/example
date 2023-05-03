import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Link, Stack, Skeleton } from '@chakra-ui/react'

import { TRADE_CONTRACT_TEMPLATE_LIST } from '~/constants/api'
import { TTradesContractTemplate } from '~/types/trades'
import { TFile } from '~/types/files'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import { Aside } from '~/components/Aside'
import { TableEmptyData } from '~/components/Table'

const TemplatesSkeleton = () => (
  <Skeleton h={4} />
)

export default function TradeDetailContractTemplates (): ReactElement {
  const { t, translateData } = useTranslate()

  const { results, isLoading, count } = useRequest<TTradesContractTemplate>(TRADE_CONTRACT_TEMPLATE_LIST, {
    disableUrlParams: true
  })

  return (
    <Aside title={t('trades_detail_contract_templates')}>
      {isLoading
        ? (
          <Stack spacing={4}>
            <TemplatesSkeleton />
            <TemplatesSkeleton />
            <TemplatesSkeleton />
            <TemplatesSkeleton />
          </Stack>
        )
        : count
          ? (
            <Stack spacing={4}>
              {results.map(item => {
                const id = prop('id', item)
                const file = translateData<TFile>(item, 'file')

                return (
                  <Link key={id} isExternal={true} href={file.file} variant={'primary'}>
                    {file.name}
                  </Link>
                )
              })}
            </Stack>
          )
          : <TableEmptyData />}
    </Aside>
  )
}
