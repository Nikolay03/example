import { ReactElement } from 'react'
import { FieldValues } from 'react-hook-form'
import { Button, Stack } from '@chakra-ui/react'

import { UploadFileTypes } from '~/types/enums'
import { TObject } from '~/types/constants'
import { useTranslate } from '~/utils/translate'
import { HookForm, FileUpload } from '~/components/HookForm'

interface Props {
  onSubmit: (values: FieldValues) => Promise<void>
  isLoading: boolean
  defaultValues?: TObject
}

export default function TradeUploadContractForm (props: Props): ReactElement {
  const {
    onSubmit,
    defaultValues,
    isLoading
  } = props

  const { t } = useTranslate()

  return (
    <HookForm onSubmit={onSubmit} defaultValues={defaultValues}>
      <Stack spacing={6}>
        <FileUpload
          name={'file'}
          label={t('input_trades_contract_label')}
          accept={UploadFileTypes.PDF}
          isRequired={true}
          size={'lg'}
        />

        <Button
          borderRadius={'xl'}
          isLoading={isLoading}
          size={'lg'}
          type={'submit'}>
          {t('button_save')}
        </Button>
      </Stack>
    </HookForm>
  )
}
