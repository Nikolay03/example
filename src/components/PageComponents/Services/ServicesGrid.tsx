import { ReactElement, ReactNodeArray } from 'react'
import { isEmpty } from 'ramda'
import { Center, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import { CardGridSkeleton } from '~/components/Skeletons'
import { useTranslate } from '~/utils/translate'

interface Props extends SimpleGridProps {
  children: ReactNodeArray
  isLoading: boolean
}

export default function ServicesGrid (props: Props): ReactElement {
  const { children, isLoading, ...restProps } = props

  const { t } = useTranslate()

  if (isLoading) {
    return (
      <CardGridSkeleton imgHeight={'175px'} />
    )
  }

  if (isEmpty(children)) {
    return (
      <Center>
        {t('services_empty_list')}
      </Center>
    )
  }

  return (
    <SimpleGrid
      columns={{ base: 1, lg: 2, xl: 3 }}
      spacing={6}
      {...restProps}>
      {children}
    </SimpleGrid>
  )
}
