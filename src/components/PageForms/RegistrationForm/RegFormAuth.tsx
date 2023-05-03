import { Fragment, ReactElement } from 'react'
import { equals, path, pipe, prop } from 'ramda'
import { Stack } from '@chakra-ui/react'

import RegFormElement from './RegFormElement'
import FieldNote from './FieldNote'
import RegButtons from './RegButtons'

import * as API from '~/constants/api'
import * as CONST from '~/constants/constants'
import { TObject } from '~/types/constants'
import { UserTypes } from '~/types/enums'
import { useTranslate } from '~/utils/translate'
import { useToast } from '~/hooks/index'
import { useCreate } from '~/hooks/crud'
import { useStepper, useWizard } from '~/components/Utils/Contexts'
import {
  CountrySelectField,
  HookForm,
  InnInput,
  Input,
  PasswordInput,
  RegionSelectField,
  StaticSelectField,
  Textarea,
  useFieldRules
} from '~/components/HookForm'

export default function RegFormAuth (): ReactElement {
  const { t } = useTranslate()

  const toast = useToast()

  const { state, dispatch } = useWizard()

  const { toNextStep } = useStepper()

  const { emailRules } = useFieldRules()

  const checkEmail = useCreate(API.CHECK_EMAIL)

  function onSubmit (values) {
    const email = prop('email', values)
    return checkEmail.create({ email })
      .then(() => {
        dispatch(values)
        toNextStep()
      })
      .catch(({ detail }) => {
        toast({
          title: t('error_default_label'),
          description: detail,
          status: 'error'
        })
      })
  }

  const isEntity = pipe<TObject, UserTypes, boolean>(
    path(['userType', 'id']),
    equals(UserTypes.ENTITY)
  )(state)

  return (
    <HookForm
      defaultValues={state}
      onSubmit={onSubmit}>
      <RegFormElement>
        <Stack spacing={6}>
          <Input
            name={'email'}
            label={t('input_login_label')}
            isRequired={true}
            size={'xl'}
            type={'email'}
            rules={emailRules}
            autoComplete={'off'}
          />
          <Stack>
            <PasswordInput
              name={'password'}
              label={t('input_etp_password_label')}
              isRequired={true}
              size={'xl'}
              autoComplete={'off'}
            />
            <PasswordInput
              name={'passwordConfirm'}
              label={t('input_confirm_password_label')}
              isRequired={true}
              size={'xl'}
              isConfirm={true}
              passwordFieldName={'password'}
              autoComplete={'off'}
            />
            <FieldNote>{t('input_etp_password_note')}</FieldNote>
          </Stack>
          {isEntity && (
            <Fragment>
              <Input
                name={'companyName'}
                label={t('input_company_name_label')}
                isRequired={true}
                size={'xl'}
                rules={{ required: true }}
              />
              <StaticSelectField
                name={'companyType'}
                list={CONST.COMPANY_TYPE.list}
                label={t('input_company_type_label')}
                isRequired={true}
                size={'xl'}
                rules={{ required: true }}
              />
              <Textarea
                name={'companyDescription'}
                label={t('input_company_description_label')}
                size={'lg'}
              />
            </Fragment>
          )}
          <InnInput
            name={'inn'}
            label={t('input_inn_label')}
            isRequired={true}
            size={'xl'}
          />
          {isEntity && (
            <Stack>
              <Input
                name={'site'}
                label={t('input_website_label')}
                size={'xl'}
              />
              <FieldNote>http://example.com</FieldNote>
            </Stack>
          )}
          <CountrySelectField
            name={'country'}
            label={t('input_country_label')}
            isRequired={true}
            size={'xl'}
            rules={{ required: true }}
          />
          <RegionSelectField
            name={'region'}
            label={t('input_region_label')}
            isChild={true}
            isRequired={true}
            parentName={'country'}
            size={'xl'}
            rules={{ required: true }}
          />
        </Stack>

        <RegButtons isLoading={checkEmail.isLoading} />
      </RegFormElement>
    </HookForm>
  )
}
