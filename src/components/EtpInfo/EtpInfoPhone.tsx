import { ReactElement } from 'react'
import { pipe, prop } from 'ramda'
import { Link, Skeleton, SkeletonProps, Text } from '@chakra-ui/react'

import { phoneNumberParse } from '~/utils/fieldParsers'
import { useTranslate } from '~/utils/translate'
import { useETPData } from '~/components/Utils/Contexts'

const phonePlaceholder = '+999 (99) 999-99-99'

function formatPhoneNumber (phone: string) {
  if (!phone) return phone
  const phoneNumber = phone.replace(/\D/g, '')
  return `+${phoneNumber}`
}
type Props = {
  themeType?: 'azure'
} & SkeletonProps
export default function EtpInfoPhone ({ themeType, ...props }: Props): ReactElement {
  const { t } = useTranslate()
  const isAzure = themeType === 'azure'

  const { configData } = useETPData()

  const data = prop('data', configData)
  const isLoading = prop('isLoading', configData)

  const phoneNumber = prop('INFO_PHONE_NUMBER', data)
  const formattedPhone = pipe(formatPhoneNumber, phoneNumberParse)(phoneNumber)

  return (
    <Skeleton isLoaded={!isLoading} fontWeight={'bold'} lineHeight={'none'} {...props}>
      <Link color={isAzure ? 'palette.common.white' : ''} href={`tel:${formattedPhone}`} _hover={{ textDecor: 'none' }}>
        <Text fontSize={'lg'} lineHeight={'inherit'} mb={'2px'}>
          {isLoading ? phonePlaceholder : formattedPhone}
        </Text>
        <Text
          color={isAzure ? 'palette.text.default' : 'primary.500'}
          fontSize={'xs'} fontWeight={'medium'} lineHeight={'inherit'}>
          {t('header_call_center')}
        </Text>
      </Link>
    </Skeleton>
  )
}
