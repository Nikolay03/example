import { ReactElement, useEffect } from 'react'
import { isEmpty, prop } from 'ramda'
import { useRouter } from 'next/router'
import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'

import FeedbackDetail from './FeedbackDetail'

import * as API from '~/constants/api'
import { TFeedback } from '~/types/feedbacks'
import { TNotificationsCount } from '~/types/notifications'
import { useDateFormat, DATE_FORMATS } from '~/utils/date'
import { useTranslate } from '~/utils/translate'
import { useRequest } from '~/hooks/api'
import { useRouterQuery } from '~/hooks/url'
import { useDetail } from '~/hooks/crud'
import { usePrevious } from '~/hooks/index'
import { useAuth } from '~/components/AuthProvider'
import { TableOverflow, TableEmptyData } from '~/components/Table'
import Pagination from '~/components/Pagination'
import { AccountWorkspace } from '~/components/PageComponents/Account'
import { TableSkeleton } from '~/components/Skeletons'
import { SearchField, useQuerySearch } from '~/components/Search'

function Search () {
  const { t } = useTranslate()

  const { onSearch, search } = useQuerySearch()

  return (
    <Box mb={2}>
      <SearchField
        defaultValue={search}
        placeholder={t('account_feedbacks_search_placeholder')}
        searchValue={search}
        onSearch={onSearch}
      />
    </Box>
  )
}

export default function FeedbacksList (): ReactElement {
  const { t } = useTranslate()

  const router = useRouter()

  const { urlQuery } = useRouterQuery()

  const { dateFormat } = useDateFormat()

  const { onUpdateUser } = useAuth()

  const { feedback, ...params } = urlQuery

  const { getDetail: getNotificationCount } = useDetail(API.NOTIFICATION_COUNT, null, false)

  const { results, isLoading, count, refetch } = useRequest<TFeedback>(API.USER_FEEDBACK_LIST, {
    disableUrlParams: true,
    params,
    onSuccess: () => {
      getNotificationCount()
        .then((response: TNotificationsCount) => {
          onUpdateUser({
            feedbackCount: response.feedbackCount
          })
        })
    }
  })

  function toDetail (id) {
    return router.push({
      pathname: router.pathname,
      query: { ...router.query, feedback: id }
    }, null, { shallow: true })
  }

  const prevFeedback = usePrevious<string>(feedback)

  useEffect(() => {
    if (prevFeedback && !feedback) {
      refetch(params)
    }
  }, [feedback, prevFeedback])

  if (feedback) {
    return (
      <AccountWorkspace title={t('account_feedbacks_detail_title')} isDetail={true}>
        <FeedbackDetail id={feedback} />
      </AccountWorkspace>
    )
  }

  if (isLoading && !count) {
    return (
      <AccountWorkspace title={t('account_nav_feedbacks')}>
        <Search />

        <TableOverflow>
          <TableSkeleton
            columnCount={4}
            rowCount={4}
          />
        </TableOverflow>
      </AccountWorkspace>
    )
  }

  return (
    <AccountWorkspace title={t('account_nav_feedbacks')}>
      <Search />

      <TableOverflow isClickable={true}>
        <Table>
          <Thead>
            <Tr>
              <Th>
                {t('account_feedbacks_th_full_name')}
              </Th>
              <Th>
                {t('account_feedbacks_th_subject')}
              </Th>
              <Th>
                {t('account_feedbacks_th_receive_date')}
              </Th>
              <Th>
                {t('account_feedbacks_th_reply_date')}
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {results.map(feedback => {
              const id = prop('id', feedback)
              const fullName = prop('fio', feedback)
              const subject = prop('theme', feedback)
              const createdDate = dateFormat(
                prop('createdDate', feedback),
                `${DATE_FORMATS.DATE_FORMAT_DEFAULT} HH:mm`
              )
              const answerDate = dateFormat(
                prop('answerDate', feedback),
                `${DATE_FORMATS.DATE_FORMAT_DEFAULT} HH:mm`
              ) || '-'

              return (
                <Tr key={id} onClick={toDetail.bind(null, id)}>
                  <Td>{fullName}</Td>
                  <Td>{subject}</Td>
                  <Td>{createdDate}</Td>
                  <Td>{answerDate}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>

        {isEmpty(results) && <TableEmptyData />}
      </TableOverflow>

      <Pagination totalRecords={count} />
    </AccountWorkspace>
  )
}
