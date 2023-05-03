import { ReactElement, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { ArrowLeft } from 'react-feather'
import { Box, Flex, Grid, Icon, Stack, Text } from '@chakra-ui/react'

import AccountNav from './AccountNav'

import { SubTitle } from '~/components/Titles'

interface Props {
  children?: ReactNode
  title?: ReactNode
  description?: string
  isDetail?: boolean
  isRoot?: boolean
}

function AccountWorkspace (props: Props): ReactElement {
  const { children, title, description, isDetail, isRoot } = props

  const router = useRouter()

  return (
    <Grid
      bgColor={'white'}
      borderRadius={{ base: 'md', md: '1.25rem' }}
      templateColumns={{ base: '100%', lg: 'minmax(290px, 30%) 1fr' }}>
      <Box
        borderColor={'gray.200'}
        borderRightWidth={{ base: 0, lg: 1 }}
        d={isRoot ? 'block' : { base: 'none', lg: 'block' }}
        px={{ base: 4, lg: 6, xl: 9 }}
        py={{ base: 6, md: 9 }}>
        <AccountNav />
      </Box>

      {!isRoot && (
        <Flex
          direction={'column'}
          px={{ base: 4, md: 9 }}
          py={{ base: 6, md: 10 }}>
          {isDetail
            ? (
              <Stack align={'center'} direction={'row'} mb={6} spacing={6}>
                <Icon
                  as={ArrowLeft}
                  boxSize={6}
                  cursor={'pointer'}
                  onClick={router.back}
                />
                <SubTitle mb={'unset'}>{title}</SubTitle>
              </Stack>
            )
            : (
              <Stack mb={6} spacing={6}>
                <SubTitle mb={null}>{title}</SubTitle>
                {description && <Text fontSize={'sm'}>{description}</Text>}
              </Stack>
            )}

          <Box flexGrow={1}>{children}</Box>
        </Flex>
      )}
    </Grid>
  )
}

AccountWorkspace.defaultProps = {
  isDetail: false,
  isRoot: false
}

export default AccountWorkspace
