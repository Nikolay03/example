import { Fragment, ReactElement } from 'react'
import { Box, Button, Text, useDisclosure } from '@chakra-ui/react'
import { prop } from 'ramda'

import ReportOrderForm from './ReportOrderForm'

import { useTranslate } from '~/utils/translate'
import { useETPData } from '~/components/Utils/Contexts'
import { Title } from '~/components/Titles'
import { PopModal } from '~/components/Modal'
import { phoneNumberParse } from '~/utils/fieldParsers'

export default function ReportBanner (): ReactElement {
  const { t } = useTranslate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { configData } = useETPData()

  const data = prop('data', configData)

  const contactPhone = prop('REPORT_PHONE_NUMBER', data)
  const contactPhoneParsed = phoneNumberParse(contactPhone)
  const contactEmail = prop('REPORT_EMAIL', data)
  const contactTelegram = prop('REPORT_TELEGRAM_USER', data)
  const contacts = [contactPhoneParsed, contactEmail, contactTelegram]
    .filter(Boolean)
    .join(', ')

  const descriptionHtml = {
    __html: t('home_section_reports_banner_description', {
      contacts
    })
  }

  return (
    <Fragment>
      <Box
        bgColor={'palette.common.lightGray'}
        bgImage={{ base: 'none', md: 'url(/assets/report_man_gradient.jpg)' }}
        bgSize={{ base: 'cover', lg: 'contain' }}
        bgRepeat={'no-repeat'}
        bgPos={'right'}
        borderRadius={'2xl'}
        position={'relative'}
        overflow={'hidden'}
        p={{ base: 8, md: 14 }}
        mt={20}>
        <Box maxW={{ base: '100%', md: '50%' }}>
          <Title>
            {t('home_section_reports_banner_title')}
          </Title>
          <Text
            color={'gray.500'}
            fontSize={{ base: 'md', md: 'lg' }}
            fontWeight={'semibold'}
            mt={4}
            mb={6}
            sx={{
              '& span': { color: 'primary.500' }
            }}
            dangerouslySetInnerHTML={descriptionHtml}
          />
          <Button size={'lg'} onClick={onOpen}>
            {t('reports_order_button')}
          </Button>
        </Box>
      </Box>

      <PopModal
        title={t('reports_order_modal_title')}
        isOpen={isOpen}
        onClose={onClose}>
        <ReportOrderForm onSuccess={onClose} />
      </PopModal>
    </Fragment>
  )
}
