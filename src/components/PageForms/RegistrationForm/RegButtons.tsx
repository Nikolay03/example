import { ReactElement } from 'react'
import { useFormContext } from 'react-hook-form'
import { ButtonGroup, Button, useBreakpointValue } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { useStepper, useWizard } from '~/components/Utils/Contexts'

interface Props {
  isDisabled?: boolean
  isLoading?: boolean
}

export default function RegButtons (props: Props): ReactElement {
  const { isDisabled, isLoading } = props

  const { t } = useTranslate()

  const { getValues } = useFormContext()

  const { dispatch } = useWizard()

  const { step, steps, toPrevStep } = useStepper()

  const buttonSize = useBreakpointValue({ base: 'lg', sm: 'xl' })

  const isNotFirst = step !== 1
  const isLast = step === steps.length

  const buttonCommonProps = {
    minW: { base: 'auto', sm: 44 },
    w: isLast ? { base: 'full', sm: 'auto' } : 'full'
  }

  function onBack () {
    dispatch(getValues())
    toPrevStep()
  }

  return (
    <ButtonGroup
      display={'flex'}
      justifyContent={'space-between'}
      mt={6}
      size={buttonSize}
      spacing={{ base: 4, sm: 6 }}>
      {isNotFirst && (
        <Button
          {...buttonCommonProps}
          variant={'secondary'}
          onClick={onBack}>
          {t('button_back')}
        </Button>
      )}
      <Button
        {...buttonCommonProps}
        isDisabled={isDisabled}
        isLoading={isLoading}
        type={'submit'}
        ml={'auto'}
        maxW={'50%'}>
        {isLast ? t('button_confirm') : t('button_continue')}
      </Button>
    </ButtonGroup>
  )
}
