import { ReactElement } from 'react'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'

import * as CONST from '~/constants/constants'
import { useTranslate } from '~/utils/translate'
import { useAccreditation } from '~/hooks/index'
import { SubTitle } from '~/components/Titles'
import { Input, StaticSelectField, Textarea } from '~/components/HookForm'

export default function AccCompanyFields (): ReactElement {
  const { t } = useTranslate()

  const { userHasAccreditation } = useAccreditation()

  return (
    <Box>
      <SubTitle fontSize={{ base: 'lg', md: 'xl' }}>
        {t('account_company_info')}
      </SubTitle>

      <Stack spacing={5}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
          <Input
            name={'companyName'}
            label={t('input_company_name_label')}
            isRequired={true}
            size={'xl'}
            rules={{ required: true }}
            isDisabled={userHasAccreditation}
          />
          <StaticSelectField
            name={'companyType'}
            list={CONST.COMPANY_TYPE.list}
            label={t('input_company_type_label')}
            size={'xl'}
            isDisabled={true}
          />
        </SimpleGrid>
        <Textarea
          name={'companyDescription'}
          label={t('input_company_description_label')}
          size={'lg'}
          isDisabled={userHasAccreditation}
        />
      </Stack>
    </Box>
  )
}
