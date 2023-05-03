import { ReactElement } from 'react'
import { Check } from 'react-feather'
import { motion } from 'framer-motion'
import { Box, Circle, SquareProps, Icon } from '@chakra-ui/react'

const MotionBox = motion(Box)

function StyledCircle (props: SquareProps) {
  return (
    <Circle
      bgColor={'white'}
      borderWidth={2}
      pos={'absolute'}
      left={'50%'}
      bottom={0}
      transform={'translate(-50%, 50%)'}
      size={3}
      {...props}
    />
  )
}

interface Props {
  isDone: boolean
  isCurrent: boolean
}

export default function StepperIndicator (props: Props): ReactElement {
  const { isDone, isCurrent } = props

  if (isDone) {
    return (
      <StyledCircle
        bgColor={'primary.500'}
        borderColor={'white'}
        size={'22px'}>
        <Icon
          as={Check}
          boxSize={3}
          color={'white'}
          strokeWidth={4}
        />
      </StyledCircle>
    )
  }

  if (isCurrent) {
    const pulses = [0, 1, 2]
    const duration = 2.1
    const variants = {
      pulse: custom => ({
        opacity: [0, 0.7, 0],
        scale: [0.2, 1, 2],
        transition: {
          ease: 'linear',
          delay: custom * (duration / pulses.length),
          duration,
          repeat: Infinity
        }
      })
    }

    return (
      <StyledCircle borderColor={'primary.500'}>
        {pulses.map(item => {
          const size = 5
          return (
            <MotionBox
              key={item}
              custom={item}
              borderWidth={1}
              borderColor={'primary.500'}
              pos={'absolute'}
              borderRadius={'full'}
              h={size}
              w={size}
              variants={variants}
              animate={'pulse'}
            />
          )
        })}
      </StyledCircle>
    )
  }

  return (
    <StyledCircle borderColor={'gray.200'} />
  )
}
