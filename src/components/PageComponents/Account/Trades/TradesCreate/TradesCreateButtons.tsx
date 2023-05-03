import { ReactElement } from 'react'
import { not } from 'ramda'
import { useRouter } from 'next/router'
import { useFormContext } from 'react-hook-form'
import { Box, Button, Stack, SimpleGrid } from '@chakra-ui/react'

import { TradesTabs } from '../tradesTabs'

import * as ROUTES from '~/constants/routes'
import { useTranslate } from '~/utils/translate'
import { useSubmitTrade, useUpdateTrade } from '~/hooks/form'
import { useStepper, useWizard } from '~/components/Utils/Contexts'

function SaveDraftButton (props) {
  const { t } = useTranslate()

  const router = useRouter()

  const { state, isUpdate } = useWizard()

  function onSuccess () {
    router.push({
      pathname: ROUTES.ACCOUNT_TRADES_URL,
      query: { tab: TradesTabs.TAB_DRAFT }
    })
  }

  const {
    onSubmitDraft: onCreateDraft,
    isLoadingDraft: isLoadingCreate
  } = useSubmitTrade(onSuccess)

  const {
    onSubmitDraft: onUpdateDraft,
    isLoadingDraft: isLoadingUpdate
  } = useUpdateTrade(state.id, onSuccess)

  const { getValues } = useFormContext()

  function onSaveDraft () {
    const formValues = getValues()
    if (isUpdate) return onUpdateDraft(formValues)
    return onCreateDraft(formValues)
  }

  return (
    <Button
      borderRadius={'xl'}
      colorScheme={'gray'}
      isLoading={isUpdate ? isLoadingUpdate : isLoadingCreate}
      size={'lg'}
      onClick={onSaveDraft}
      {...props}>
      {t('trades_draft_button')}
    </Button>
  )
}

interface Props {
  isLoading?: boolean
}

export default function TradesCreateButtons (props: Props): ReactElement {
  const { isLoading } = props

  const { t } = useTranslate()

  const { getValues } = useFormContext()

  const { dispatch, isUpdate } = useWizard()

  const { step, steps = [], toPrevStep } = useStepper()

  const isFirst = step === 1
  const isLast = step === steps.length

  const submitButtonText = isUpdate
    ? t('trades_update_button')
    : t('trades_create_button')

  const commonProps = {
    borderRadius: 'xl',
    isFullWidth: true,
    size: 'lg'
  }

  function onGoBack () {
    const formValues = getValues()
    dispatch(formValues)
    toPrevStep()
  }

  return (
    <Stack mt={9} spacing={{ base: 4, md: 6 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, md: 6 }}>
        <Box _empty={{ d: { base: 'none', md: 'block' } }}>
          {isFirst && (
            <SaveDraftButton isFullWidth={true} />
          )}
          {not(isFirst) && (
            <Button
              {...commonProps}
              variant={'secondary'}
              onClick={onGoBack}>
              {t('button_back')}
            </Button>
          )}
        </Box>
        <Box>
          <Button
            {...commonProps}
            isLoading={isLoading}
            type={'submit'}>
            {isLast ? submitButtonText : t('button_continue')}
          </Button>
        </Box>
      </SimpleGrid>
      {not(isFirst) && (
        <SaveDraftButton
          alignSelf={{
            base: 'unset',
            md: 'center'
          }}
          minW={{
            base: 'unset',
            md: 'sm'
          }}
        />
      )}
    </Stack>
  )
}
