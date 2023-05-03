import { ReactElement } from 'react'
import { ArrowRight } from 'react-feather'
import { Circle, Flex, Icon } from '@chakra-ui/react'

import { REPORTS_URL } from '~/constants/routes'
import { TReport } from '~/types/reports'
import { useTranslate } from '~/utils/translate'
import {
  ReportItemContainer,
  ReportItem,
  ReportsGrid
} from '~/components/PageComponents/Reports'
import Link from '~/components/Link'

interface Props {
  list: TReport[]
  count: number
  isLoading: boolean
  pageSize: number
}

export default function ReportsList (props: Props): ReactElement {
  const { list, count, isLoading, pageSize } = props

  const { t } = useTranslate()

  const restItemCount = count - pageSize

  return (
    <ReportsGrid isLoading={isLoading} list={list}>
      {list?.map(item => (
        <ReportItem key={item.id} data={item} />
      ))}
      {(count > pageSize) && (
        <Flex
          as={ReportItemContainer}
          align={'center'}
          pb={{ base: 0, md: 4 }}>
          <Circle
            bgColor={'primary.500'}
            color={'white'}
            fontSize={'sm'}
            fontWeight={'semibold'}
            pt={'1px'}
            size={9}>
            +{restItemCount}
          </Circle>

          <Link
            href={REPORTS_URL}
            alignItems={'center'}
            display={'inline-flex'}
            fontSize={'lg'}
            fontWeight={'semibold'}
            ml={4}
            _hover={{ color: 'primary.500' }}>
            {t('home_section_reports_view_all')}
            <Icon as={ArrowRight} color={'primary.500'} ml={1} />
          </Link>
        </Flex>
      )}
    </ReportsGrid>
  )
}
