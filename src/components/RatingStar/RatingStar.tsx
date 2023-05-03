import { ReactElement, useCallback, useState } from 'react'
import { Flex, Stack } from '@chakra-ui/react'

import RatingStarItem from './RatingStarItem'
import RatingValue from './RatingValue'

import { ClientRender } from '~/components/Utils'

const stars = [1, 2, 3, 4, 5]

interface Props {
  isReadOnly?: boolean
  isSimple?: boolean
  fontSize?: string
  size?: number
  spacing?: number
  value?: number
  onChange?: (star: number) => void
}

function RatingStar (props: Props): ReactElement {
  const {
    isReadOnly,
    isSimple,
    fontSize,
    size,
    spacing,
    value,
    onChange
  } = props

  const [rating, setRating] = useState(value)
  const [hoverRating, setHoverRating] = useState(0)

  const onMouseEnter = useCallback((star) => {
    setHoverRating(star)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHoverRating(0)
  }, [])

  const onSaveRating = useCallback((star: number) => {
    onChange?.(star)
    setRating(star)
  }, [])

  if (isSimple) {
    return value
      ? (
        <Stack align={'center'} direction={'row'}>
          <RatingStarItem
            star={1}
            rating={1}
            size={size}
          />
          <RatingValue fontSize={fontSize} value={value} />
        </Stack>
      )
      : null
  }

  if (isReadOnly) {
    return (
      <Stack align={'center'} direction={'row'}>
        <Flex>
          {stars.map(star => (
            <RatingStarItem
              key={star}
              star={star}
              size={size}
              spacing={spacing}
              rating={rating}
            />
          ))}
        </Flex>
        <RatingValue fontSize={fontSize} value={value} />
      </Stack>
    )
  }

  return (
    <ClientRender>
      <Flex>
        {stars.map(star => (
          <RatingStarItem
            key={star}
            cursor={'pointer'}
            star={star}
            size={size}
            spacing={spacing}
            rating={rating}
            hoverRating={hoverRating}
            onClick={onSaveRating.bind(null, star)}
            onMouseEnter={onMouseEnter.bind(null, star)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </Flex>
    </ClientRender>
  )
}

RatingStar.defaultProps = {
  isReadOnly: false,
  isSimple: false,
  fontSize: 'sm',
  size: 4,
  spacing: 1
}

export default RatingStar
