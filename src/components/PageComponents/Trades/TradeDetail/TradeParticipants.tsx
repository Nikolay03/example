import { ReactElement } from 'react'
import { equals, not, pathOr, prop, propOr } from 'ramda'
import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react'

import TradeParticipantsTable from './TradeParticipantsTable'

import * as API from '~/constants/api'
import * as ENUMS from '~/types/enums'
import { TTrades } from '~/types/trades'
import { TRefetchDetail } from '~/types/hooks'
import { numberFormat, toNumber } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { useAccreditation, useToast } from '~/hooks/index'
import { useProtectedFunction } from '~/hooks/auth'
import { useCreate } from '~/hooks/crud'
import { SubTitle } from '~/components/Titles'
import { PopModal, ModalDescription } from '~/components/Modal'
import { HookForm, FileUpload, NumberInput, Textarea } from '~/components/HookForm'
import { AccredDenyModal } from '~/components/PageComponents/Modals'

function serializer (values) {
  return {
    bargain: prop('bargain', values),
    document: pathOr(null, ['document', 'id'], values),
    description: propOr(null, 'description', values),
    proposedAmount: prop('proposedAmount', values)
  }
}

interface Props {
  data: TTrades
  isLoading: boolean
  refetch: TRefetchDetail
}

export default function TradeParticipants (props: Props): ReactElement {
  const { data, isLoading, refetch } = props

  const { t, translateData } = useTranslate()

  const toast = useToast()

  const { userCanTrade } = useAccreditation()

  const {
    isOpen: isOpenParticipate,
    onOpen: onOpenParticipate,
    onClose: onCloseParticipate
  } = useDisclosure()

  const {
    isOpen: isOpenDeny,
    onOpen: onOpenDeny,
    onClose: onCloseDeny
  } = useDisclosure()

  const onOpenParticipateModal = useProtectedFunction(function () {
    if (userCanTrade) return onOpenParticipate()
    return onOpenDeny()
  })

  const participate = useCreate(API.TRADE_PARTICIPATE)

  const id = prop('id', data)
  const participants = prop('participants', data) || []
  const currency = prop('currency', data)
  const currencyName = translateData(currency, 'designation')

  const kind = prop('kind', data)
  const position = prop('position', data)
  const status = prop('status', data)
  const isActive = equals(ENUMS.TradeStatuses.ACTIVE, status)
  const isAuction = equals('auction', kind)
  const isCompetition = equals('competition', kind)
  const isOrganizer = prop('isOrganizer', data)
  const isUserAccepted = prop('isUserAccepted', data)

  const price = toNumber(prop('price', data))
  const formedPrice = numberFormat(price, currencyName)

  const canParticipate = isActive && not(isUserAccepted) && not(isOrganizer)

  const modalTitle = isAuction
    ? t('trades_participate_auction_modal_title')
    : t('trades_participate_competition_modal_title')

  const auctionModalDescription = t('trades_participate_auction_modal_description')
  const auctionModalDescriptionHint = t(`trades_participate_auction_${position}_modal_description_hint`, {
    price: formedPrice
  })

  const modalDescription = isAuction
    ? `${auctionModalDescription} ${auctionModalDescriptionHint}`
    : t('trades_participate_competition_modal_description', { price: formedPrice })

  const defaultValues = { bargain: id }

  function onSubmitParticipate (values) {
    return participate.create(serializer(values))
      .then(() => {
        toast({
          title: t('trades_participate_success_title'),
          description: t('trades_participate_success_message'),
          status: 'success'
        })
      })
      .then(refetch)
      .then(onCloseParticipate)
  }

  return (
    <Box>
      <SubTitle>
        {t('trades_participants_title')}
      </SubTitle>

      <Stack spacing={10}>
        <TradeParticipantsTable
          participants={participants}
          currencyName={currencyName}
          isLoading={isLoading}
          isCompetition={isCompetition}
        />

        {canParticipate && (
          <Button
            alignSelf={'center'}
            size={'lg'}
            onClick={onOpenParticipateModal}>
            {t('trades_participate_button')}
          </Button>
        )}
      </Stack>

      <AccredDenyModal
        isOpen={isOpenDeny}
        onClose={onCloseDeny}
        description={t('accreditation_deny_modal_trades_participate_description')}
      />

      <PopModal
        title={modalTitle}
        isOpen={isOpenParticipate}
        onClose={onCloseParticipate}>
        <HookForm onSubmit={onSubmitParticipate} defaultValues={defaultValues}>
          <Stack spacing={6}>
            <ModalDescription
              dangerouslySetInnerHTML={{ __html: modalDescription }}
              sx={{
                '& span': {
                  color: 'palette.text.default',
                  fontWeight: 'semibold'
                }
              }}
            />

            <NumberInput
              name={'proposedAmount'}
              label={t('input_trades_participate_proposed_amount_label')}
              isRequired={true}
              rules={{ required: true }}
              min={0}
              size={'xl'}
            />

            {isCompetition && (
              <Textarea
                name={'description'}
                label={t('input_trades_participate_description_label')}
                isRequired={isCompetition}
                rules={{ required: isCompetition }}
                size={'lg'}
              />
            )}

            {isCompetition && (
              <FileUpload
                name={'document'}
                label={t('input_trades_participate_document_label')}
                size={'lg'}
              />
            )}

            <Button
              borderRadius={'xl'}
              isLoading={participate.isLoading}
              size={'lg'}
              type={'submit'}>
              {t('trades_participate_competition_button')}
            </Button>
          </Stack>
        </HookForm>
      </PopModal>
    </Box>
  )
}
