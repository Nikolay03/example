import { ReactElement, useEffect } from 'react'
import { Center, Text } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'

export default function AuthSkeleton (): ReactElement {
  const { t } = useTranslate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.removeAttribute('style')
    }
  }, [])

  return (
    <Center
      bgColor={'white'}
      minHeight={'100vh'}
      pos={'fixed'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={2000}>
      <Center bgColor={'gray.50'} borderRadius={'lg'} p={8}>
        <Text color={'gray.500'} fontSize={'2xl'} textAlign={'center'}>
          {t('auth_user_data_loading')}
        </Text>
      </Center>
    </Center>
  )
}
