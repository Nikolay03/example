import { ReactElement, ReactNodeArray } from 'react'
import { isEmpty } from 'ramda'
import { Center, SimpleGridProps, Stack } from '@chakra-ui/react'

import ServicesInlineSkeleton from './ServicesInlineSkeleton'

import { useTranslate } from '~/utils/translate'

interface Props extends SimpleGridProps {
  children: ReactNodeArray
  isLoading: boolean
}

export default function ServicesInlineGrid (props: Props): ReactElement {
  const { children, isLoading } = props

  const { t } = useTranslate()

  const gridProps = {
    spacing: 8
  }

  if (isLoading) {
    return (
      <ServicesInlineSkeleton {...gridProps} />
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
    <Stack {...gridProps}>
      {children}
    </Stack>
  )
}
