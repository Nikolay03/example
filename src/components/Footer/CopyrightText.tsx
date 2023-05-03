import { ReactElement } from 'react'
import { Text, TextProps } from '@chakra-ui/react'

import { version } from '../../../package.json'

import { useTranslate } from '~/utils/translate'

export default function CopyrightText (props: TextProps): ReactElement {
  const { t } = useTranslate()

  const date = new Date()
  const currentYear = date.getFullYear()
  const etp = 'Uzbekistan Electronic Trading Platform'

  return (
    <Text align={'center'} color={'gray.500'} {...props}>
      {t('footer_copyright_text', {
        etp,
        year: currentYear,
        version: `(${version})`
      })}
    </Text>
  )
}
