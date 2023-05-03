import { ReactElement, useMemo } from 'react'
import { Star } from 'react-feather'
import { Center, CenterProps, Icon } from '@chakra-ui/react'

function roundHalf (num: number): number {
  return Math.round(num * 2) / 2
}

interface Props extends CenterProps {
  star: number
  rating: number
  hoverRating?: number
  size?: number
  spacing?: number
}

export default function RatingStarItem (props: Props): ReactElement {
  const {
    star,
    rating,
    hoverRating,
    size,
    spacing,
    ...restProps
  } = props

  const value = roundHalf(rating)

  const color = useMemo(() => {
    if (hoverRating >= star) {
      return 'palette.common.yellow'
    }
    else if (!hoverRating && value >= star) {
      return 'palette.common.yellow'
    }
    return 'gray.300'
  }, [value, hoverRating, star])

  return (
    <Center
      color={color}
      px={spacing}
      transition={'all 200ms'}
      _first={{ pl: 'unset' }}
      _last={{ pr: 'unset' }}
      {...restProps}>
      <Icon
        as={Star}
        boxSize={size}
        fill={'currentColor'}
      />
    </Center>
  )
}
