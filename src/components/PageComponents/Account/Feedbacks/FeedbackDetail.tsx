import { Fragment, ReactElement } from 'react'
import { not, prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Button, Link, Stack } from '@chakra-ui/react'

import FeedbackDetailSkeleton from './FeedbackDetailSkeleton'

import { FEEDBACK_DETAIL, USER_FEEDBACK_RESPOND } from '~/constants/api'
import { useTranslate } from '~/utils/translate'
import { useDetail, useCreate } from '~/hooks/crud'
import { DetailValue, DashedDivider } from '~/components/Misc'
import { HookForm, Textarea } from '~/components/HookForm'
import { TFeedback } from '~/types/feedbacks'

interface Props {
  id: string
}

export default function FeedbackDetail (props: Props): ReactElement {
  const { id } = props

  const { t } = useTranslate()

  const { detail, isLoading, getDetail } = useDetail<TFeedback>(sprintf(FEEDBACK_DETAIL, id))

  const respond = useCreate(sprintf(USER_FEEDBACK_RESPOND, id))

  const fullName = prop('fio', detail)
  const email = prop('email', detail)
  const phone = prop('phone', detail)
  const subject = prop('theme', detail)
  const message = prop('message', detail)
  const recipientAnswer = prop('recipientAnswer', detail)

  const file = prop('file', detail)
  const fileName = prop('name', file)
  const fileUrl = prop('file', file)

  function onSubmit (values) {
    return respond.create(values)
      .then(() => {
        getDetail()
      })
  }

  if (isLoading) {
    return (
      <FeedbackDetailSkeleton />
    )
  }

  return (
    <Stack spacing={6} overflow={'hidden'}>
      <Stack fontWeight={'semibold'} spacing={6}>
        <DetailValue
          label={t('account_feedbacks_detail_full_name_label')}
          value={fullName}
        />
        <DetailValue
          label={t('account_feedbacks_detail_email_label')}
          value={email}
        />
        <DetailValue
          label={t('account_feedbacks_detail_phone_label')}
          value={phone}
        />
        <DetailValue
          label={t('account_feedbacks_detail_subject_label')}
          value={subject}
        />
        {file && (
          <DetailValue
            label={t('account_feedbacks_detail_file_label')}
            value={<Link href={fileUrl} isExternal={true}>{fileName}</Link>}
          />
        )}
        <DetailValue
          label={t('account_feedbacks_detail_comment_label')}
          value={message}
          variant={'block'}

          labelColor={'gray.500'}
          spacing={3}
        />
        {recipientAnswer && (
          <DetailValue
            label={t('account_feedbacks_detail_answer_label')}
            value={recipientAnswer}
            variant={'block'}

            labelColor={'gray.500'}
            spacing={3}
          />
        )}
      </Stack>

      {not(recipientAnswer) && (
        <Fragment>
          <DashedDivider />

          <HookForm onSubmit={onSubmit}>
            <Stack spacing={6}>
              <Textarea
                name={'answer'}
                label={t('input_feedback_response_message')}
                isRequired={true}
                size={'lg'}
                rules={{ required: true }}
              />

              <Button alignSelf={'baseline'} isLoading={respond.isLoading} type={'submit'}>
                {t('button_save')}
              </Button>
            </Stack>
          </HookForm>
        </Fragment>
      )}
    </Stack>
  )
}
