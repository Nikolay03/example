import { ReactElement } from 'react'
import { Stack } from '@chakra-ui/react'

import RegFormElement from './RegFormElement'
import RegButtons from './RegButtons'

import * as CONST from '~/constants/constants'
import { useTranslate } from '~/utils/translate'
import { useFieldValidate } from '~/hooks/form'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import { HookForm, Input, StaticSelectField } from '~/components/HookForm'

export default function RegFormPersonal (): ReactElement {
  const { t } = useTranslate()

  const { state, dispatch } = useWizard()
  const { toNextStep } = useStepper()
  const { validateRequired } = useFieldValidate()

  function onSubmit (values) {
    dispatch(values)
    toNextStep()
  }

  return (
    <HookForm
      defaultValues={state}
      isPromise={false}
      onSubmit={onSubmit}>
      <RegFormElement>
        <Stack spacing={6}>
          <StaticSelectField
            name={'userType'}
            list={CONST.USER_TYPE.list}
            label={t('input_user_type_label')}
            isRequired={true}
            size={'xl'}
            validate={validateRequired}
            rules={{ required: true }}
          />
          <Input
            name={'lastName'}
            label={t('input_last_name_label')}
            isRequired={true}
            size={'xl'}
            rules={{ required: true }}
          />
          <Input
            name={'firstName'}
            label={t('input_first_name_label')}
            isRequired={true}
            size={'xl'}
            rules={{ required: true }}
          />
          <Input
            name={'patronymicName'}
            label={t('input_patronymic_name_label')}
            size={'xl'}
          />
          <Input
            name={'position'}
            label={t('input_position_label')}
            size={'xl'}
          />
        </Stack>

        <RegButtons />
      </RegFormElement>
    </HookForm>
  )
}
