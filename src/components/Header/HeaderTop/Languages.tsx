import { forwardRef, Fragment, ReactElement } from 'react'
import { not, pipe, propEq } from 'ramda'
import { useRouter } from 'next/router'
import { ChevronDown } from 'react-feather'
import {
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackProps
} from '@chakra-ui/react'

import { setLocale } from '~/utils/cookies'
import { ClientRender } from '~/components/Utils'
import useLanguagesArr from '~/components/Header/HeaderTop/useLanguagesArr'

export type TLanguage = {
  id: string
  name: string
  flag: ReactElement
}

interface CustomMenuButtonProps extends StackProps {
  isOpen: boolean
  isOpenMenu: boolean
  currentLocale: TLanguage
}

const CustomMenuButton = forwardRef<HTMLDivElement>(
  function ForwardedComponent (props: CustomMenuButtonProps, ref) {
    const { isOpen, currentLocale, ...restProps } = props

    return (
      <HStack ref={ref} spacing={2} cursor={'pointer'} {...restProps}>
        <Box>{currentLocale.flag}</Box>
        <Box>{currentLocale.name}</Box>
        <Box
          as={ChevronDown}
          size={18}
          transition={'all 200ms'}
          transform={isOpen ? 'rotate(180deg)' : 'none'}
        />
      </HStack>
    )
  }
)

export default function Languages (props: StackProps): ReactElement {
  const { languages } = useLanguagesArr()
  const { locale, pathname, query, ...router } = useRouter()
  const filteredLanguages = languages.filter(pipe(propEq('id', locale), not))
  const currentLocaleObj = languages.find(propEq('id', locale))

  function onChangeLocale (locale: string) {
    return router.replace({ pathname, query }, null, { locale, shallow: true })
      .then(() => {
        setLocale(locale)
      })
  }

  return (
    <ClientRender>
      <HStack spacing={0} {...props}>
        <Menu id={'locales'} placement={'bottom-end'}>
          {({ isOpen }: { isOpen: boolean }) => (
            <Fragment>
              <MenuButton
                // @ts-ignore
                isOpen={isOpen}
                as={CustomMenuButton}
                currentLocale={currentLocaleObj}
              />
              <MenuList zIndex={'dropdown'} color={'palette.text.default'}>
                {filteredLanguages.map(item => (
                  <MenuItem
                    key={item.id}
                    aria-label={`Change locale to ${item.id}`}
                    fontWeight={'medium'}
                    icon={item.flag}
                    onClick={onChangeLocale.bind(null, item.id)}>
                    <Box>{item.name}</Box>
                  </MenuItem>
                ))}
              </MenuList>
            </Fragment>
          )}
        </Menu>
      </HStack>
    </ClientRender>
  )
}
