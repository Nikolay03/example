import { ReactElement, ReactNodeArray } from 'react'
import { isEmpty } from 'ramda'
import { Center, SimpleGrid, SimpleGridProps } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'

interface Props extends SimpleGridProps {
  children: ReactNodeArray
}

export default function ProductsGrid (props: Props): ReactElement {
  const { children, ...restProps } = props

  const { t } = useTranslate()

  const gridProps = {
    columns: { base: 1, sm: 1, md: 3, lg: 3, xl: 4 },
    spacingX: 6,
    spacingY: 8,
    ...restProps
  }

  if (isEmpty(children)) {
    return (
      <Center>
        {t('table_no_data')}
      </Center>
    )
  }

  return (
    <SimpleGrid {...gridProps}>
      {children}
    </SimpleGrid>
  )
}
