import { ReactElement } from 'react'
import { prop, propEq } from 'ramda'
import { Box, BoxProps, SimpleGrid } from '@chakra-ui/react'

import StepperIndicator from './StepperIndicator'

import { useTranslate } from '~/utils/translate'
import { useStepper } from '~/components/Utils/Contexts'

export default function Stepper (props: BoxProps): ReactElement {
  const { t } = useTranslate()

  const { step, steps } = useStepper()

  const currentStep = steps.find(propEq('id', step))
  const currentStepTitle = prop('title', currentStep)

  return (
    <Box
      bgColor={'white'}
      borderColor={'gray.100'}
      borderRadius={'xl'}
      mb={9}
      {...props}>
      <SimpleGrid
        align={'center'}
        columns={steps.length}>
        {steps.map(item => {
          const stepNo = prop('id', item)
          const title = prop('title', item)
          const isDone = step > stepNo
          const isCurrent = step === stepNo

          const titleColor = isDone
            ? 'inherit'
            : isCurrent
              ? 'primary.500'
              : 'gray.500'

          return (
            <Box
              key={stepNo}
              borderColor={'inherit'}
              borderBottomWidth={{ base: 1, md: 0 }}
              pos={'relative'}
              px={{ base: 3, sm: 5 }}
              pt={3}
              pb={{ base: 3, md: 6 }}
              _notLast={{
                borderColor: 'inherit',
                borderRightWidth: 2
              }}>
              <Box color={'gray.500'} fontSize={'xs'} mb={2}>
                {t('reg_step')} {stepNo}
              </Box>
              <Box color={titleColor} fontWeight={'semibold'} display={{ base: 'none', md: 'block' }}>
                {title}
              </Box>

              <StepperIndicator
                isDone={isDone}
                isCurrent={isCurrent}
              />
            </Box>
          )
        })}
      </SimpleGrid>
      <Box
        color={'primary.500'}
        fontWeight={'semibold'}
        d={{ base: 'block', md: 'none' }}
        pt={6}
        pb={4}
        textAlign={'center'}>
        {currentStepTitle}
      </Box>
    </Box>
  )
}
