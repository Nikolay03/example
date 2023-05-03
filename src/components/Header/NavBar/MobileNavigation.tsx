import { ReactElement, useEffect } from 'react'
import { ArrowRight } from 'react-feather'
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  Stack,
  useDisclosure
} from '@chakra-ui/react'

import Languages from '../HeaderTop/Languages'

import nav from '~/constants/nav'
import { useTranslate } from '~/utils/translate'
import { useMediaBreakpoint } from '~/hooks/index'
import EtpMenu from '~/icons/common/EtpMenu'
import { NavLink } from '~/components/Link'
import { AuthButton } from '~/components/Buttons'

export default function MobileNavigation (): ReactElement {
  const { t } = useTranslate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const isLargerThanLG = useMediaBreakpoint({ breakpoint: 'lg' })

  useEffect(() => {
    if (isLargerThanLG) {
      onClose()
    }
  }, [isLargerThanLG])

  return (
    <Box display={{ base: 'block', lg: 'none' }}>
      <IconButton
        aria-label={'Open nav'}
        icon={<EtpMenu />}
        minW={'44px'}
        variant={'white'}
        onClick={onOpen}
      />

      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'right'}
        preserveScrollBarGap={true}
        size={'sm'}>
        <DrawerOverlay>
          <DrawerContent>
            <Flex
              align={'center'}
              justify={'space-between'}
              h={'60px'}
              pl={8}
              pr={4}
              pos={'relative'}>
              <Languages />

              <IconButton
                aria-label={'Close nav'}
                icon={<ArrowRight />}
                minW={'44px'}
                variant={'white'}
                onClick={onClose}
              />
            </Flex>

            <DrawerBody
              as={Flex}
              borderTop={'1px'}
              borderColor={'gray.200'}
              direction={'column'}
              px={8}
              py={4}>
              <Stack
                lineHeight={'base'}
                flexGrow={1}
                mb={8}
                spacing={8}>
                {nav.map(menu => (
                  <NavLink
                    key={menu.url}
                    href={menu.url}
                    fontSize={'xl'}
                    sx={{
                      '&.active': {
                        color: 'primary.500'
                      },
                      '&:hover': {
                        color: 'primary.500'
                      }
                    }}>
                    {t(menu.title)}
                  </NavLink>
                ))}
              </Stack>

              <AuthButton isFullWidth={true} />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  )
}
