import { ReactElement } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'

export default function AccountSaveButton (props: ButtonProps): ReactElement {
  const { t } = useTranslate()

  return (
    <Button
      alignSelf={'baseline'}
      minW={28}
      type={'submit'}
      w={{ base: 'full', md: 'auto' }}
      {...props}>
      {t('button_save')}
    </Button>
  )
}
