import { ReactElement, useState } from 'react'
import { equals, isNil, not, path, prop } from 'ramda'
import { Box, Button, Flex, Stack, useDisclosure } from '@chakra-ui/react'

import TradeUser from './TradeUser'
import TradeDetailContract from './TradeDetailContract'
import TradeUploadContractForm from './TradeUploadContractForm'
import TradeReviewForm from './TradeReviewForm'
import TradeDetailContractTemplates from './TradeDetailContractTemplates'

import * as API from '~/constants/api'
import * as CONST from '~/constants/constants'
import * as ENUMS from '~/types/enums'
import { TTrades } from '~/types/trades'
import { TRefetchDetail } from '~/types/hooks'
import { toNumber } from '~/utils/number'
import { useTranslate } from '~/utils/translate'
import { DATE_FORMATS, useDateFormat } from '~/utils/date'
import { useToast } from '~/hooks/index'
import { useProtectedFunction } from '~/hooks/auth'
import { useCreate } from '~/hooks/crud'
import { Aside } from '~/components/Aside'
import { DetailValue } from '~/components/Misc'
import { TradesStatus } from '~/components/PageComponents/Trades'
import { PopModal } from '~/components/Modal'
import { favouriteSerializer } from '~/components/PageComponents/Home/ProductsSection/ProductsCardActions'

function reviewSerializer (values) {
  return {
    bargain: prop('bargain', values),
    star: prop('star', values),
    comment: prop('comment', values)
  }
}

function uploadContractSerializer (values) {
  return {
    bargain: prop('bargain', values),
    file: path(['file', 'id'], values)
  }
}

interface Props {
  data: TTrades
  refetch: TRefetchDetail
}

export default function TradeDetailAside (props: Props): ReactElement {
  const { data, refetch } = props

  const { t } = useTranslate()

  const { dateFormat } = useDateFormat()

  const toast = useToast()

  const {
    isOpen: isOpenReview,
    onOpen: onOpenReview,
    onClose: onCloseReview
  } = useDisclosure()

  const {
    isOpen: isOpenUpload,
    onOpen: onOpenUpload,
    onClose: onCloseUpload
  } = useDisclosure()

  const onOpenReviewModal = useProtectedFunction(onOpenReview)

  const reviewCreate = useCreate(API.TRADE_CREATE_REVIEW)
  const contractCreate = useCreate(API.TRADE_UPLOAD_CONTRACT)

  function onSubmitReview (values) {
    return reviewCreate.create(reviewSerializer(values))
      .then(() => {
        toast({
          title: t('reviews_submit_success_title'),
          description: t('reviews_submit_success_message'),
          status: 'success'
        })
      })
      .then(refetch)
      .then(onCloseReview)
  }

  function onSubmitContract (values) {
    return contractCreate.create(uploadContractSerializer(values))
      .then(() => {
        toast({
          title: t('trades_upload_contract_success_title'),
          description: t('trades_upload_contract_success_message'),
          status: 'success'
        })
      })
      .then(refetch)
      .then(onCloseUpload)
  }

  const favourite = prop('isFavourite', data)
  const id = prop('id', data)
  const [isFavourite, setFavourite] = useState(favourite)
  const favouriteCreate = useCreate(API.FAVOURITE_CREATE)
  function onSubmitFavourite () {
    favouriteCreate.create(favouriteSerializer({ id })).then(() => {
      setFavourite(!isFavourite)
    })
  }

  const contract = prop('contract', data)
  const user = prop('user', data)
  const status = prop('status', data)
  const hasWon = prop('hasWon', data)
  const winner = prop('winner', data)
  const isClosed = equals(status, ENUMS.TradeStatuses.CLOSED)
  const isOrganizer = prop('isOrganizer', data)
  const isReviewed = prop('isReviewed', data)

  const canSubmitReview = (isOrganizer
    ? not(isNil(winner))
    : hasWon && isClosed
  ) && isClosed && not(isReviewed)

  const canUploadFile = isClosed && isOrganizer && !!winner && not(contract)
  const canDownloadContract = contract && (isOrganizer || hasWon)
  const canSeeContractTemplates = isClosed && isOrganizer && !!winner

  const kind = prop('kind', data)
  const kindName = CONST.TRADES_KIND.object[kind]
  const isAuction = kind === ENUMS.TradeKinds.AUCTION

  const position = prop('position', data)
  const positionName = CONST.TRADES_POSITION.object[position]

  const type = prop('bargainType', data)
  const typeName = CONST.TRADES_TYPE.object[type]

  const bargainStartDatetime = prop('bargainStartDatetime', data)
  const bargainEndDatetime = prop('bargainEndDatetime', data)
  const startDate = dateFormat(bargainStartDatetime, DATE_FORMATS.DATETIME_FORMAT_SHORT)
  const endDate = dateFormat(bargainEndDatetime, DATE_FORMATS.DATETIME_FORMAT_SHORT)

  const privacy = prop('privacy', data)
  const privacyName = CONST.TRADES_PRIVACY.object[privacy]

  const visibility = prop('visibility', data)
  const visibilityName = CONST.TRADES_VISIBILITY.object[visibility]

  const vat = prop('vat', data)
  const vatIsIncludedInThePrice = prop('vatIsIncludedInThePrice', data)
  const vatPercent = `${vat}%`
  const vatContent = vatIsIncludedInThePrice
    ? `${vatPercent} ${t('trades_detail_vat_is_included_label')}`
    : toNumber(vat) > 0
      ? `${vatPercent} ${t('trades_detail_vat_is_not_included_label')}`
      : vatPercent
  const responsibleContactPerson = prop('responsibleContactPerson', data)

  const defaultValues = { bargain: id }

  const modalTitle = isOrganizer
    ? t('trades_review_winner_modal_title')
    : t('trades_review_organizer_modal_title')

  const modalDescription = isOrganizer
    ? t('trades_review_winner_modal_description')
    : t('trades_review_organizer_modal_description')

  const modalStarLabel = isOrganizer
    ? t('input_trades_review_winner_rating_label')
    : t('input_trades_review_organizer_rating_label')

  const customTitle = (
    <Flex align={'center'} justify={'space-between'}>
      <Box>{t('trades_detail_page_title')}</Box>
      {canSubmitReview && (
        <Button size={'xs'} onClick={onOpenReviewModal}>
          {t('trades_send_review_button')}
        </Button>
      )}
    </Flex>
  )

  return (
    <Stack gridRow={{ base: 1, lg: 'unset' }} spacing={4}>
      <Aside title={customTitle} py={{ base: 6, md: 8 }}>
        <Stack spacing={5}>
          <DetailValue
            label={t('trades_table_th_organizer')}
            value={<TradeUser user={user} />}
          />
          {winner && (
            <DetailValue
              label={t('trades_detail_winner_label')}
              value={<TradeUser user={winner} />}
            />
          )}
          <DetailValue
            label={t('trades_table_th_status')}
            value={<TradesStatus status={status} />}
          />
          <DetailValue
            label={t('trades_detail_kind_label')}
            value={t(kindName)}
          />
          {isAuction && (
            <DetailValue
              label={t('trades_detail_position_label')}
              value={t(positionName)}
            />
          )}
          <DetailValue
            label={t('trades_detail_type_label')}
            value={t(typeName)}
          />
          <DetailValue
            label={t('trades_detail_start_date_label')}
            value={startDate}
            whiteSpace={'pre-wrap'}
          />
          <DetailValue
            label={t('trades_detail_end_date_label')}
            value={endDate}
            whiteSpace={'pre-wrap'}
          />
          <DetailValue
            label={t('trades_detail_privacy_label')}
            value={t(privacyName)}
          />
          <DetailValue
            label={t('trades_detail_visibility_label')}
            value={t(visibilityName)}
          />
          <DetailValue
            label={t('trades_detail_vat_label')}
            value={vatContent}
          />
          <DetailValue
            label={t('trades_detail_contact_person_label')}
            value={responsibleContactPerson}
          />
        </Stack>
      </Aside>

      {canUploadFile && (
        <Button
          alignSelf={'center'}
          colorScheme={'gray'}
          size={'lg'}
          onClick={onOpenUpload}>
          {t('trades_upload_contract')}
        </Button>
      )}

      <Button
        isLoading={favouriteCreate.isLoading}
        size={'lg'}
        colorScheme={isFavourite ? 'gray' : 'primary'}
        onClick={onSubmitFavourite}>
        {isFavourite ? t('favourite_button_remove') : t('favourite_button_add')}
      </Button>

      {canDownloadContract && (
        <TradeDetailContract file={contract} />
      )}

      {canSeeContractTemplates && (
        <TradeDetailContractTemplates />
      )}

      <PopModal
        title={modalTitle}
        isOpen={isOpenReview}
        onClose={onCloseReview}>
        <TradeReviewForm
          onSubmit={onSubmitReview}
          defaultValues={defaultValues}
          description={modalDescription}
          isLoading={reviewCreate.isLoading}
          starLabel={modalStarLabel}
        />
      </PopModal>

      <PopModal
        title={t('trades_upload_contract')}
        isOpen={isOpenUpload}
        onClose={onCloseUpload}>
        <TradeUploadContractForm
          onSubmit={onSubmitContract}
          defaultValues={defaultValues}
          isLoading={contractCreate.isLoading}
        />
      </PopModal>
    </Stack>
  )
}
