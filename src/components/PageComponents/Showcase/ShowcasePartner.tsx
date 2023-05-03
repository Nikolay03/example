import { ReactElement } from 'react'
import { equals, not, prop } from 'ramda'
import { useRouter } from 'next/router'
import { Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

import ShowcaseUserTrades from './ShowcaseUserTrades'

import { FeedbackTypes } from '~/types/enums'
import { TUserShowcase } from '~/types/showcase'
import { useTranslate } from '~/utils/translate'
import { useAuth } from '~/components/AuthProvider'
import { PageGrid } from '~/components/Grids'
import { FaqForm } from '~/components/PageForms'
import { ShowcaseUserInfo } from '~/components/PageComponents/Showcase/index'
import { ServicesInlineGrid, ServiceCardInline } from '~/components/PageComponents/Services'

interface Props {
  data: TUserShowcase
}

export default function ShowcasePartner (props: Props): ReactElement {
  const { data } = props

  const { t } = useTranslate()

  const { query: { slug } } = useRouter()

  const { isUserLoading, user } = useAuth()

  const companyName = prop('name', data)
  const services = prop('services', data)

  const formTitle = t('showcase_partner_feedback_title', {
    companyName
  })

  const initialValues = { recipient: slug }

  const authUserId = prop('id', user)
  const isSameUser = equals(Number(slug), authUserId)
  const showForm = not(isUserLoading) && not(isSameUser)

  return (
    <PageGrid
      templateColumns={{
        base: '100%',
        lg: showForm ? 'minmax(1px, 100%) 375px' : '100%'
      }}>
      <Stack spacing={6}>
        <ShowcaseUserInfo data={data} showAvatar={true} />
        <Tabs isLazy={true} variant={'enclosed'}>
          <TabList>
            <Tab>{t('showcase_partner_services')}</Tab>
            <Tab>{t('showcase_users_trades')}</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ServicesInlineGrid isLoading={false}>
                {services.map(service => (
                  <ServiceCardInline key={service.id} data={service} />
                ))}
              </ServicesInlineGrid>
            </TabPanel>
            <TabPanel>
              <ShowcaseUserTrades />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>

      {showForm && (
        <FaqForm
          title={formTitle}
          initialValues={initialValues}
          type={FeedbackTypes.SHOW_CASE}
        />
      )}
    </PageGrid>
  )
}
