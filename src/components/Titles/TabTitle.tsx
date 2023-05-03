import { ReactElement } from 'react'
import { Box, SimpleGrid, SimpleGridProps, Stack, Text } from '@chakra-ui/react'

import { TTab } from '~/types/components'
import { useTranslate } from '~/utils/translate'
import { ClientRender } from '~/components/Utils'
import { useMediaBreakpoint } from '~/hooks/index'

const sizes = {
  md: {
    container: {
      gridColumnGap: { base: 6, md: 'unset' },
      gridRowGap: { base: 4, md: 'unset' },
      spacing: { base: 0, md: 10 },
      wrap: { base: 'wrap', md: 'unset' }
    },
    tabPanel: {
      py: 2
    },
    tab: {
      fontSize: { base: 'md', md: '2xl' }
    }
  },
  sm: {
    container: {
      gridColumnGap: { base: 4, md: 'unset' },
      gridRowGap: { base: 3, md: 'unset' },
      spacing: { base: 0, md: 6 },
      wrap: { base: 'wrap', md: 'unset' }
    },
    tabPanel: {
      py: 1
    },
    tab: {
      fontSize: { base: 'sm', md: 'md' }
    }
  }
}

interface Props extends Omit<SimpleGridProps, 'size' | 'onChange'> {
  tabs: TTab[]
  onChange: (value: string) => void
  value: string
  size?: 'sm' | 'md' | 'lg'
}

function TabTitle (props: Props): ReactElement {
  const { tabs, onChange, value, size, ...restProps } = props

  const { t } = useTranslate()

  const isLargerThanMD = useMediaBreakpoint({ breakpoint: 'md' })

  if (isLargerThanMD) {
    return (
      <ClientRender>
        <Stack{...sizes[size].container} direction={'row'}>
          {tabs.map(tab => {
            const isActive = tab.value === value

            return (
              <Box
                {...sizes[size].tabPanel}
                key={tab.value}
                borderBottomWidth={2}
                borderColor={isActive ? 'primary.500' : 'transparent'}
                color={isActive ? 'primary.500' : 'inherit'}
                cursor={'pointer'}
                transition={'all 200ms'}
                _hover={{ color: 'primary.500' }}
                onClick={onChange.bind(null, tab.value)}>
                <Text
                  {...sizes[size].tab}
                  fontWeight={'semibold'}
                  lineHeight={'none'}>
                  {t(tab.title)}
                </Text>
              </Box>
            )
          })}
        </Stack>
      </ClientRender>
    )
  }

  return (
    <ClientRender>
      <SimpleGrid columns={2} spacing={4} w={'full'} {...restProps}>
        {tabs.map(tab => {
          const isActive = tab.value === value

          return (
            <Box
              key={tab.value}
              borderColor={isActive ? 'primary.500' : 'gray.100'}
              borderBottomWidth={2}
              color={isActive ? 'primary.500' : 'inherit'}
              cursor={'pointer'}
              py={4}
              px={2}
              textAlign={'center'}
              onClick={onChange.bind(null, tab.value)}>
              <Text
                {...sizes[size].tab}
                fontWeight={'semibold'}
                lineHeight={'none'}>
                {t(tab.title)}
              </Text>
            </Box>
          )
        })}
      </SimpleGrid>
    </ClientRender>
  )
}

TabTitle.defaultProps = {
  size: 'md'
}

export default TabTitle
