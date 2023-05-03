/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Box, Flex, StackProps } from '@chakra-ui/react'

interface StatCardProps extends StackProps {
  label: string
  icon: ReactElement
  value: string
}

export default function DayStatisticsCard (props: StatCardProps): ReactElement {
  return (
    <Flex direction={'row'} justify={'center'} align={'center'}>
      {props.icon}
      <Box ml={9} spacing={2}>
        <Box fontSize={'2xl'} fontWeight={'bold'} lineHeight={'36px'}>{props.value}</Box>
        <Box fontSize={'xl'} color={'gray.450'} lineHeight={'32px'}>{props.label}</Box>
      </Box>
    </Flex>
  )
}
