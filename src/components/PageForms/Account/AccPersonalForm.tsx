import { ReactElement } from 'react'
import { equals, path, prop } from 'ramda'
import { SimpleGrid, Stack } from '@chakra-ui/react'

import Accreditation from './Accreditaion'
import AccCompanyFields from './AccCompanyFields'

import * as CONST from '~/constants/constants'
import * as ENUMS from '~/types/enums'
import { innNumberParse } from '~/utils/fieldParsers'
import { useTranslate } from '~/utils/translate'
import { useAccreditation } from '~/hooks/index'
import { useUpdateProfile } from '~/hooks/form'
import { useAuth } from '~/components/AuthProvider'
import { AccountContainer, AccountSaveButton } from '~/components/PageComponents/Account'
import {
  CountrySelectField,
  HookForm,
  InnInput,
  Input,
  PhoneInput,
  RegionSelectField,
  StaticSelectField
} from '~/components/HookForm'

export default function AccPersonalForm (): ReactElement {
  const { t } = useTranslate()

  const { user } = useAuth()

  const { onSubmit, isLoading } = useUpdateProfile()

  const { userHasAccreditation } = useAccreditation()

  const userType = prop('registerAs', user)
  const userIsProvider = equals(userType, ENUMS.UserTypes.PROVIDER)
  const userIsEntity = equals(userType, ENUMS.UserTypes.ENTITY)

  const defaultValues = {
    ...user,
    inn: innNumberParse(prop('inn', user)),
    country: path(['region', 'country'], user),
    companyType: userIsEntity ? { id: prop('companyType', user) } : null
  }

  return (
    <HookForm defaultValues={defaultValues} onSubmit={onSubmit}>
      <AccountContainer>
        <Stack mb={6} spacing={6}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <Input
              name={'firstName'}
              label={t('input_first_name_label')}
              isDisabled={userHasAccreditation}
              isRequired={true}
              size={'xl'}
              rules={{ required: true }}
            />
            <Input
              name={'lastName'}
              label={t('input_last_name_label')}
              isDisabled={userHasAccreditation}
              isRequired={true}
              size={'xl'}
              rules={{ required: true }}
            />
            <Input
              name={'patronymicName'}
              label={t('input_patronymic_name_label')}
              isDisabled={userHasAccreditation}
              size={'xl'}
            />
            <InnInput
              name={'inn'}
              label={t('input_inn_label')}
              isDisabled={userHasAccreditation}
              isRequired={true}
              size={'xl'}
            />
            <PhoneInput
              name={'contactNumber'}
              label={t('input_contact_number_label')}
              size={'xl'}
            />
            <Input
              name={'position'}
              label={t('input_position_label')}
              size={'xl'}
            />
            <CountrySelectField
              name={'country'}
              label={t('input_country_label')}
              size={'xl'}
            />
            <RegionSelectField
              name={'region'}
              isChild={true}
              label={t('input_region_label')}
              parentName={'country'}
              size={'xl'}
            />
            <StaticSelectField
              name={'registerAs'}
              label={t('input_user_type_label')}
              list={CONST.USER_TYPE_ALL.list}
              isDisabled={true}
              size={'xl'}
            />
            {(userIsEntity || userIsProvider) && (
              <Input
                name={'site'}
                label={t('input_website_label')}
                size={'xl'}
              />
            )}
          </SimpleGrid>

          <Accreditation />

          {(userIsEntity || userIsProvider) && (
            <AccCompanyFields />
          )}
        </Stack>

        <AccountSaveButton
          isLoading={isLoading}
          justifySelf={{ base: 'unset', md: 'baseline' }}
        />
      </AccountContainer>
    </HookForm>
  )
}
