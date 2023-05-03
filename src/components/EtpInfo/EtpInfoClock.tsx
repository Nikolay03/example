import { useState, useEffect, ReactElement } from 'react'
import format from 'date-fns/format'
import { Box, Flex, StackProps, Text } from '@chakra-ui/react'

import EtpClock from '~/icons/common/EtpClock'

const currentDate = new Date()

type Props = {
  themeType?: 'azure'
}

export default function EtpInfoClock ({ themeType }: Props): ReactElement {
  const [date, setDate] = useState(currentDate)
  const isAzure = themeType === 'azure'

  const timezoneOffset = currentDate.getTimezoneOffset()
  const timezoneNum = Math.abs(timezoneOffset / 60)
  const timezone = timezoneOffset < 0 ? `+${timezoneNum}` : `-${timezoneNum}`
  const currentTime = format(date, 'd.MM.yy HH:mm')

  useEffect(() => {
    const intervalValue = 1000
    const interval = setInterval(() => {
      setDate(new Date())
    }, intervalValue)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Flex align={'center'}>
      <EtpClock boxSize={'18px'} color={isAzure ? 'gray.650' : 'primary.500'} />
      <Text fontSize={isAzure ? 'md' : 'sm'} ml={'10px'}>
        {currentTime}
        <Box as={'span'} color={isAzure ? 'gray.650' : 'gray.500'}>
          {` (GMT ${timezone})`}
        </Box>
      </Text>
    </Flex>
  )
}
