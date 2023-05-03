import { ReactElement, ReactNodeArray } from 'react'
import { isEmpty } from 'ramda'
import { Center, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { CardGridSkeleton } from '~/components/Skeletons'

interface Props extends SimpleGridProps {
  children: ReactNodeArray
  isLoading: boolean
}

export default function NewsGrid (props: Props): ReactElement {
  const { children, isLoading, ...restProps } = props

  const { t } = useTranslate()

  const gridProps = {
    columns: { base: 1, md: 2, lg: 3 },
    spacingX: 6,
    spacingY: 8,
    ...restProps
  }

  if (isLoading) {
    return (
      <CardGridSkeleton
        imgHeight={'235px'}
        {...gridProps}
      />
    )
  }

  if (isEmpty(children)) {
    return (
      <Center>
        {t('news_empty_list')}
      </Center>
    )
  }

  return (
    <SimpleGrid {...gridProps}>
      {children}
    </SimpleGrid>
  )
}
