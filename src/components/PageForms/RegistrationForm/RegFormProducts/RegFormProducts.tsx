import { ReactElement } from 'react'
import { Box, Stack, Text } from '@chakra-ui/react'

import RegFormElement from '../RegFormElement'
import RegPolicyTerms from '../RegPolicyTerms'
import RegButtons from '../RegButtons'

import { useTranslate } from '~/utils/translate'
import { useSubmitRegistration } from '~/hooks/form'
import { useWizard } from '~/components/Utils/Contexts'
import { HookForm, Checkbox } from '~/components/HookForm'
import ProductsGroup from '~/components/ProductsGroup'

export default function RegFormProducts (): ReactElement {
  const { t } = useTranslate()

  const { state } = useWizard()

  const { onSubmit, isLoading } = useSubmitRegistration()

  function onSubmitForm (values) {
    return onSubmit({ ...state, ...values })
  }

  return (
    <HookForm
      defaultValues={state}
      onSubmit={onSubmitForm}
      render={({ onSubmitForm, watch }) => {
        const checkAgreement: boolean = watch('checkAgreement')
        const isButtonDisabled = !checkAgreement

        return (
          <RegFormElement as={'form'} onSubmit={onSubmitForm}>
            <Stack spacing={4}>
              <Text fontSize={'sm'} lineHeight={'none'}>
                {t('input_product_group_search_label')}
              </Text>
              <ProductsGroup name={'productInterests'} />
            </Stack>

            <Stack mt={8} spacing={4}>
              <Box mb={3}>
                <Checkbox name={'checkAgreement'}>
                  <RegPolicyTerms />
                </Checkbox>
              </Box>

              <RegButtons
                isDisabled={isButtonDisabled}
                isLoading={isLoading}
              />
            </Stack>
          </RegFormElement>
        )
      }}
    />
  )
}
