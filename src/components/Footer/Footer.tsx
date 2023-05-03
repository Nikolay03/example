import React, { Fragment, ReactElement } from 'react'
import { prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Box, BoxProps, SimpleGrid, Stack, StackProps } from '@chakra-ui/react'

import FooterNavTitle from './FooterNavTitle'
import FooterCopyright from './FooterCopyright'

import * as ROUTES from '~/constants/routes'
import { TUseRequest } from '~/types/hooks'
import { TStaticPage } from '~/types/projectConfig'
import { useTranslate } from '~/utils/translate'
import { useETPData } from '~/components/Utils/Contexts'
import Container from '~/components/Container'
import Logo from '~/components/Logo'
import EtpInfo, { EtpInfoClock, EtpInfoPhone } from '~/components/EtpInfo'
import Link, { LinkProps } from '~/components/Link'
import { ClientRender } from '~/components/Utils'

const LinksStack = (props: StackProps) => (
  <Stack lineHeight={'none'} spacing={5} {...props} />
)

const CustomLink = (props: LinkProps) => (
  <Link w={'fit-content'} {...props} />
)

interface StaticPageMapProps {
  data: TUseRequest<TStaticPage>
}

function StaticPageMap (props: StaticPageMapProps) {
  const { data } = props

  const { translateData } = useTranslate()
  const results = prop('results', data) || []

  return (
    <Fragment>
      {results.map(page => {
        const key = prop('key', page)
        const title = translateData(page, 'title')
        const url = sprintf(ROUTES.STATIC_PAGE_DETAIL_URL, key)

        return (
          <CustomLink key={key} href={url}>
            {title}
          </CustomLink>
        )
      })}
    </Fragment>
  )
}

type Props = {
  themeType?: 'azure'
} & BoxProps

export default function Footer ({ themeType, ...props }: Props): ReactElement {
  const { t } = useTranslate()
  const isAzure = themeType === 'azure'

  const { footerData } = useETPData()

  const { platformPages, helpPages } = footerData
  const gridSpacing = { base: 12, md: 8 }
  return (
    <>
      <Box
        as={'footer'}
        bgColor={isAzure ? 'none' : 'gray.100'}
        {...props}
      >
        {isAzure && <Container h={'1px'} variant={'azure'} bgColor={'gray.350'} />}
        <Box py={10}>
          <Container
            variant={isAzure && 'azure'}
          >
            <SimpleGrid
              columns={{ base: 1, md: 2, lg: isAzure ? 4 : 3 }}
              spacing={gridSpacing}>
              {isAzure
                ? (
                  <Box color={'gray.650'}>
                    <Stack spacing={7}>
                      <Logo />
                      <Box
                        gridColumn={{ base: 'unset', md: 2, lg: 'unset' }}
                        gridRow={{ base: 2, md: 1, lg: 'unset' }}>
                        <EtpInfo spacing={3} themeType={themeType}>
                          <EtpInfoClock themeType={themeType} />
                        </EtpInfo>
                      </Box>
                    </Stack>
                  </Box>
                )
                : (
                  <Stack spacing={7}>
                    <Logo themeType={themeType} />
                    <ClientRender>
                      <EtpInfoPhone fontWeight={'semibold'} />
                    </ClientRender>
                  </Stack>
                )}

              <SimpleGrid
                gridColumn={{ lg: isAzure && '2 / 4' }}
                columns={2}
                gridArea={{ base: 'unset', md: '2 / span 2', lg: 'unset' }}
                spacing={gridSpacing}>
                <Box>
                  <FooterNavTitle themeType={themeType}>
                    {t('footer_nav_title_about')}
                  </FooterNavTitle>

                  <LinksStack color={isAzure ? 'gray.650' : 'primary.500'}>
                    <CustomLink href={ROUTES.ABOUT_URL}>
                      {t('about_page_title')}
                    </CustomLink>
                    <CustomLink href={ROUTES.FEEDBACK_URL}>
                      {t('feedback_page_title')}
                    </CustomLink>

                    <StaticPageMap data={platformPages} />
                  </LinksStack>
                </Box>
                <Box>
                  <FooterNavTitle themeType={themeType}>
                    {t('footer_nav_title_help')}
                  </FooterNavTitle>

                  <LinksStack color={isAzure ? 'gray.650' : 'primary.500'}>
                    <CustomLink href={ROUTES.FAQ_URL}>
                      {t('faq_page_title')}
                    </CustomLink>
                    <StaticPageMap data={helpPages} />
                  </LinksStack>
                </Box>
              </SimpleGrid>

              {/* <Box */}
              {/*  gridColumn={{ base: 'unset', md: 2, lg: 'unset' }} */}
              {/*  gridRow={{ base: 2, md: 1, lg: 'unset' }}> */}
              {/*  <FooterNavTitle themeType={themeType}> */}
              {/*    {t('footer_nav_title_send')} */}
              {/*  </FooterNavTitle> */}
              {/*  {isAzure */}
              {/*    ? ( */}
              {/*      <HookForm onSubmit={() => null} resetOnSuccess={true}> */}
              {/*        <Flex direction={'row'} spacing={'3'}> */}
              {/*          <Input */}
              {/*            variant={'filled'} */}
              {/*            name={'position'} */}
              {/*            borderRadius={'none'} */}
              {/*            placeholder={t('input_email_placeholder')} */}
              {/*            size={'xl'} */}
              {/*          /> */}
              {/*          <Square size={'48px'} bg={'primary.500'} color={'white'} ml={4}> */}
              {/*            <Send color={'white'} /> */}
              {/*          </Square> */}
              {/*        </Flex> */}
              {/*      </HookForm> */}
              {/*    ) */}
              {/*    : ( */}
              {/*      <EtpInfo spacing={3}> */}
              {/*        <EtpInfoClock /> */}
              {/*      </EtpInfo> */}
              {/*    )} */}
              {/* </Box> */}
            </SimpleGrid>
          </Container>
        </Box>

        <FooterCopyright />
      </Box>
    </>
  )
}
