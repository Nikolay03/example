import { ReactElement } from 'react'
import { range } from 'ramda'
import { Box, SimpleGrid, SimpleGridProps, Skeleton, SkeletonText } from '@chakra-ui/react'

function getRandomIntInclusive (min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

interface Props extends SimpleGridProps {
  imgHeight: number | string
  itemsCount?: number
}

function CardGridSkeleton (props: Props): ReactElement {
  const { imgHeight, itemsCount, ...restProps } = props

  const list = range(0, itemsCount)

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={6}
      {...restProps}>
      {list.map(item => {
        const titleWidth = getRandomIntInclusive(50, 70)
        const noOfLines = getRandomIntInclusive(2, 4)
        return (
          <Box key={item}>
            <Skeleton
              startColor={'gray.100'}
              endColor={'gray.200'}
              h={imgHeight}
              mb={4}
              borderRadius={'2xl'}
              w={'full'}
            />

            <Skeleton h={5} mb={3} w={`${titleWidth}%`} />
            <SkeletonText noOfLines={noOfLines} spacing={3} />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

CardGridSkeleton.defaultProps = {
  itemsCount: 3
}

export default CardGridSkeleton
