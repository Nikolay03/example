import { ReactElement } from 'react'
import { Box, Flex, Stack, Text, Tooltip } from '@chakra-ui/react'

import ItemContainer from './ReportItemContainer'
import useReportFileIcon from './useReportFileIcon'

import { CURRENCY_UZB } from '~/constants/constants'
import { REPORTS_URL } from '~/constants/routes'
import { TReport } from '~/types/reports'
import { numberFormat } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import Link from '~/components/Link'

interface Props {
  data: TReport
}

export default function ReportItem (props: Props): ReactElement {
  const { data } = props

  const { id, fileFormat, name, miniDescription, price, isFree } = data

  const { t } = useTranslate()

  const fileIcon = useReportFileIcon(fileFormat)

  const priceProps = {
    alignSelf: { base: 'flex-end', md: 'unset' },
    fontSize: 'lg',
    fontWeight: 'bold',
    minW: 'max-content',
    ml: { base: 'unset', md: 2 }
  }

  const detailUrl = `${REPORTS_URL}/${id}`

  return (
    <ItemContainer>
      <Tooltip
        isDisabled={!miniDescription}
        label={miniDescription}
        placement={'top-start'}
        openDelay={300}>
        <Flex
          as={Link}
          href={detailUrl}
          direction={{ base: 'column', md: 'row' }}
          gridRowGap={4}
          justify={'space-between'}
          w={'full'}>
          <Stack direction={'row'} grow={1} spacing={4}>
            <Box mt={1}>{fileIcon}</Box>
            <Text fontSize={'lg'}>{name}</Text>
          </Stack>

          {isFree && (
            <Text {...priceProps} color={'primary.500'}>
              {t('reports_price_free')}
            </Text>
          )}
          {!isFree && (
            <Text {...priceProps}>
              {numberFormat(price, CURRENCY_UZB)}
            </Text>
          )}
        </Flex>
      </Tooltip>
    </ItemContainer>
  )
}
