import { ReactElement } from 'react'
import { prop } from 'ramda'
import { Box, Flex, Text } from '@chakra-ui/react'

import useReportFileIcon from './useReportFileIcon'

import { REPORTS_URL } from '~/constants/routes'
import { TReport } from '~/types/reports'
import Link from '~/components/Link'

interface Props {
  data: TReport
}

export default function ReportItemSimple (props: Props): ReactElement {
  const { data } = props

  const { file, name } = data

  const id = prop('id', data)
  const fileFormat = prop('format', file)

  const fileIcon = useReportFileIcon(fileFormat)
  const detailUrl = `${REPORTS_URL}/${id}`

  return (
    <Flex
      as={Link}
      borderTopWidth={1}
      borderColor={'gray.200'}
      href={detailUrl}
      py={4}
      _first={{ borderTopWidth: 0, pt: 'unset' }}
      _last={{ pb: 'unset' }}>
      <Box>{fileIcon}</Box>
      <Text fontSize={'lg'} ml={4} noOfLines={3}>
        {name}
      </Text>
    </Flex>
  )
}
