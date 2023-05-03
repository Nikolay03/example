import { Children, ReactElement } from 'react'
import { prop, toUpper } from 'ramda'
import { useRouter } from 'next/router'
import { Heart } from 'react-feather'
import { Flex, Skeleton, SkeletonProps, Stack, StackProps, Text, useToken, Link } from '@chakra-ui/react'

import EtpCalendar from '~/icons/common/EtpCalendar'
import EtpEmail from '~/icons/common/EtpEmail'
import { ClientRender } from '~/components/Utils'
import { useETPData } from '~/components/Utils/Contexts'
import { useTranslate } from '~/utils/translate'
import { useAuth } from '~/components/AuthProvider'
import { ACCOUNT_TRADES_URL } from '~/constants/routes'

const StyledSkeleton = (props: SkeletonProps) => (
  <Skeleton
    startColor={'gray.700'}
    endColor={'gray.900'}
    {...props}
  />
)

type Props = {
  themeType?: 'azure'
} & StackProps

function EtpInfo (props: Props): ReactElement {
  const { children, direction, spacing, themeType, ...restProps } = props
  const isAzure = themeType === 'azure'
  const { user } = useAuth()

  const { locale } = useRouter()


  const { configData } = useETPData()

  const data = prop('data', configData)
  const isLoading = prop('isLoading', configData)

  const configSchedule = prop(`WORKING_TIME_${toUpper(locale)}`, data)
  const configEmail = prop('INFO_EMAIL', data)

  return (
    <ClientRender>
      <Stack
        direction={direction}
        spacing={spacing}
        {...restProps}>
        <Flex as={StyledSkeleton} isLoaded={!isLoading} align={'center'}>
          <EtpCalendar boxSize={'18px'} color={isAzure ? 'gray.650' : 'primary.500'} />
          <Text fontSize={isAzure ? 'md' : 'sm'} ml={'10px'}>
            {isLoading ? 'Loading...' : configSchedule}
          </Text>
        </Flex>
        <Flex as={StyledSkeleton} isLoaded={!isLoading} align={'center'}>
          <EtpEmail boxSize={'18px'} color={isAzure ? 'gray.650' : 'primary.500'} />
          <Text fontSize={isAzure ? 'md' : 'sm'} ml={'10px'}>
            {isLoading ? 'Loading...' : configEmail}
          </Text>
        </Flex>
        {children && Children.only(children)}
      </Stack>
    </ClientRender>
  )
}

EtpInfo.defaultProps = {
  spacing: 6
}

export default EtpInfo
