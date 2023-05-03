import { ReactElement } from 'react'
import { equals, not, prop } from 'ramda'
import { Box, Button, Flex, SimpleGrid, Stack, Text, Tooltip, useDisclosure } from '@chakra-ui/react'

import AccreditationModal from './AccreditationModal'

import { AccreditationStatuses } from '~/types/enums'
import { MODAL_QUERIES } from '~/constants/modals'
import { useTranslate } from '~/utils/translate'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { useRouterQuery } from '~/hooks/url'
import { useAuth } from '~/components/AuthProvider'
import { SubTitle } from '~/components/Titles'
import StatusTag from '~/components/StatusTag'

const statusColors = {
  [AccreditationStatuses.NEW]: 'palette.common.orange',
  [AccreditationStatuses.IN_PROCESS]: 'palette.common.blue',
  [AccreditationStatuses.APPROVED]: 'primary.500',
  [AccreditationStatuses.REJECTED]: 'palette.common.red'
}

export default function Accreditation (): ReactElement {
  const { t } = useTranslate()

  const { urlQuery } = useRouterQuery()

  const { dateFormat } = useDateFormat()

  const { user } = useAuth()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const accreditation = prop('accreditation', user)
  const accreditationStatus = prop('status', accreditation)
  const statusName = t(`account_accreditation_status_${accreditationStatus}`)
  const statusColor = statusColors[accreditationStatus]
  const accreditationDate = prop('modifiedDate', accreditation)
  const hasAccreditation = !!accreditation
  const isApproved = equals<AccreditationStatuses>(AccreditationStatuses.APPROVED, accreditationStatus)
  const isRejected = equals<AccreditationStatuses>(AccreditationStatuses.REJECTED, accreditationStatus)

  const queryOpenAccreditation = urlQuery[MODAL_QUERIES.OPEN_ACCREDITATION]
  const highlightFormLabel = queryOpenAccreditation ? JSON.parse(queryOpenAccreditation) : false
  const showForm = not(hasAccreditation) || isRejected

  return (
    <Box>
      <Box
        alignItems={'center'}
        display={{
          base: 'block',
          md: 'flex'
        }}
        justifyContent={'space-between'}
        flexWrap={'wrap'}
        mb={6}>
        <SubTitle fontSize={{ base: 'lg', md: 'xl' }} mb={0} mr={4}>
          {t('account_accreditation_title')}
        </SubTitle>
        {showForm && (
          <Flex lineHeight={'base'} mt={{
            base: 1,
            md: 'unset'
          }}>
            {not(accreditation) && (
              <Box as={'span'} color={'gray.500'} mr={1}>
                {t('account_no_accreditation')}
              </Box>
            )}
            <Tooltip
              bg={'palette.common.blue'}
              gutter={14}
              isOpen={highlightFormLabel && !isOpen}
              label={t('accreditation_deny_modal_title')}
              hasArrow={true}
              placement={'top'}>
              <Button
                pos={'relative'}
                variant={'link'}
                zIndex={0}
                onClick={onOpen}
                _after={{
                  bgColor: 'primary.50',
                  borderRadius: 'lg',
                  borderColor: 'primary.500',
                  borderWidth: 1,
                  content: '""',
                  display: highlightFormLabel ? 'block' : 'none',
                  pos: 'absolute',
                  top: '-6px',
                  left: '-12px',
                  right: '-12px',
                  bottom: '-6px',
                  zIndex: '-1'
                }}>
                {t('account_accreditation_fill_form')}
              </Button>
            </Tooltip>
          </Flex>
        )}
      </Box>

      {hasAccreditation
        ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <Stack spacing={4}>
              <Flex align={'center'} justify={'space-between'}>
                <Box>
                  {t('account_accreditation_status')}
                </Box>

                <StatusTag color={statusColor}>
                  {statusName}
                </StatusTag>
              </Flex>
              {isApproved && (
                <Flex>
                  <Box as={'span'} color={'gray.500'} mr={1}>
                    {t('account_accreditation_date')}
                  </Box>
                  {dateFormat(accreditationDate, DATE_FORMATS.DATE_FORMAT_DEFAULT)}
                </Flex>
              )}
            </Stack>
          </SimpleGrid>
        )
        : (
          <Text>
            {t('account_accreditation_placeholder_text')}
          </Text>
        )}

      <AccreditationModal
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  )
}
