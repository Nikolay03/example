import { ReactElement } from 'react'
import { FieldValues } from 'react-hook-form'
import { Button, Stack } from '@chakra-ui/react'

import { TObject } from '~/types/constants'
import { useTranslate } from '~/utils/translate'
import { ModalDescription } from '~/components/Modal'
import { HookForm, Rating, Textarea } from '~/components/HookForm'

interface Props {
  onSubmit: (values: FieldValues) => Promise<void>
  description: string
  starLabel: string
  isLoading: boolean
  defaultValues?: TObject
}

export default function TradeReviewForm (props: Props): ReactElement {
  const {
    onSubmit,
    defaultValues,
    description,
    starLabel,
    isLoading
  } = props

  const { t } = useTranslate()

  return (
    <HookForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <Stack spacing={6}>
        <ModalDescription>
          {description}
        </ModalDescription>

        <Rating
          name={'star'}
          label={starLabel}
          isRequired={true}
        />

        <Textarea
          name={'comment'}
          label={t('input_trades_review_comment_label')}
          isRequired={true}
          rules={{ required: true }}
          size={'lg'}
        />

        <Button
          borderRadius={'xl'}
          isLoading={isLoading}
          size={'lg'}
          type={'submit'}>
          {t('trades_send_review_button')}
        </Button>
      </Stack>
    </HookForm>
  )
}
