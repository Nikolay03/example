import { ReactElement, useState } from 'react'
import { isEmpty, not, prop } from 'ramda'
import { sprintf } from 'sprintf-js'
import { Map } from 'react-feather'
import { Button, SimpleGrid, Stack, Text, useDisclosure, Image as ChakraImage } from '@chakra-ui/react'

import { TRADE_DETAIL } from '~/constants/api'
import { ROOT_URL, TRADES_URL } from '~/constants/routes'
import { TradeStatuses } from '~/types/enums'
import { TTrades } from '~/types/trades'
import { useTranslate } from '~/utils/translate'
import { useDateFormat } from '~/utils/date'
import { useDetailRequest } from '~/hooks/api'
import PageWrapper from '~/components/PageWrapper'
import { PageLayout } from '~/components/Layouts'
import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbItem,
  BreadcrumbLink
} from '~/components/Breadcumb'
import { PageGrid } from '~/components/Grids'
import { Title } from '~/components/Titles'
import { DetailValue } from '~/components/Misc'
import { ClientRender } from '~/components/Utils'
import {
  TradeDetailAside,
  TradeDetailProduct,
  TradeParticipants,
  TradeOtherList,
  TradeTimer
} from '~/components/PageComponents/Trades/TradeDetail'
import { PopModal } from '~/components/Modal'
import YandexMap from '~/components/YandexMap'
import { latLonToCoords } from '~/utils/map'
import { Image } from '~/components/Images'
import { TFile } from '~/types/files'

export interface TradeDetailProps {
  data: TTrades
}

export default function TradeDetail (props: TradeDetailProps): ReactElement {
  const { data } = props

  const detailAPI = sprintf(TRADE_DETAIL, prop('id', data))

  const { data: detail, refetch, isLoading } = useDetailRequest<TTrades>(detailAPI, {
    initialData:
    data
  })

  const { t, translateData } = useTranslate()

  const { dateFormat } = useDateFormat()

  const {
    isOpen: isOpenMap,
    onOpen: onOpenMap,
    onClose: onCloseMap
  } = useDisclosure()

  const [selectedImage, setSelectedImage] = useState<TFile>(null)

  const onOpenImageModal = (image: TFile) => {
    setSelectedImage(image)
  }

  const onCloseImageModal = () => {
    setSelectedImage(null)
  }

  const id = prop('id', detail)
  const type = prop('bargainType', detail)
  const status = prop('status', detail)
  const bargainEndDatetime = prop('bargainEndDatetime', detail)
  const termsOfPurchase = prop('termsOfPurchase', detail)
  const deliveryStartDate = dateFormat(prop('deliveryStartDate', detail))
  const deliveryEndDate = dateFormat(prop('deliveryEndDate', detail))
  const deliveryDistrict = prop('deliveryDistrict', detail)
  const deliveryRegion = prop('region', deliveryDistrict)
  const deliveryCountry = prop('country', deliveryRegion)
  const deliveryAddress = prop('deliveryAddress', detail)
  const lat = prop('lat', detail)
  const lon = prop('lon', detail)
  const deliveryCoords = latLonToCoords({ lat, lon })

  const product = prop('commodityGroupClassifier', detail)
  const productName = translateData(product, 'name')
  const images = prop('images', detail) || []
  const hasImages = not(isEmpty(images))
  const imagesContent = (
    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={6}>
      {images.map((image, index) => {
        const imgCount = index + 1
        const imgId = prop('id', image)
        const imgTitle = `${productName} ${imgCount}`
        const imgSrc = prop('file', image)

        return (
          <Image
            key={imgId}
            alt={imgTitle}
            cursor={'pointer'}
            src={imgSrc}
            borderRadius={'xl'}
            height={28}
            onClick={() => onOpenImageModal(image)}
          />
        )
      })}
    </SimpleGrid>
  )

  return (
    <PageWrapper title={t('trades_detail_page_title')}>
      <PageLayout>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={ROOT_URL}>
              {t('home_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={TRADES_URL}>
              {t('trades_page_title')}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbCurrent>
              {t('trades_detail_page_title')}
            </BreadcrumbCurrent>
          </BreadcrumbItem>
        </Breadcrumb>

        <Stack
          align={{ base: 'baseline', md: 'center' }}
          direction={{ base: 'column', md: 'row' }}
          mb={8}
          spacing={{ base: 2, md: 6 }}>
          <Title as={'h1'} fontSize={'2xl'}>
            {t('trades_detail_id', { id })}
          </Title>

          {status === TradeStatuses.ACTIVE && (
            <ClientRender>
              <TradeTimer endDate={bargainEndDatetime} />
            </ClientRender>
          )}
        </Stack>

        <Stack spacing={14}>
          <PageGrid>
            <Stack spacing={10}>
              <Stack spacing={6}>
                {hasImages && (
                  <DetailValue
                    label={t('trades_detail_product_images_label')}
                    value={imagesContent}
                    variant={'block'}
                    fontWeight={'semibold'}
                  />
                )}
                <DetailValue
                  label={t(`input_trades_${type}_terms_label`)}
                  value={<Text>{termsOfPurchase}</Text>}
                  variant={'block'}
                  fontWeight={'semibold'}
                />
                <DetailValue
                  label={t(`input_trades_${type}_transfer_start_date_label`)}
                  value={deliveryStartDate}
                />
                <DetailValue
                  label={t(`input_trades_${type}_transfer_end_date_label`)}
                  value={deliveryEndDate}
                />
                <DetailValue
                  label={t(`input_trades_${type}_transfer_country_label`)}
                  value={translateData(deliveryCountry, 'name')}
                />
                <DetailValue
                  label={t(`input_trades_${type}_transfer_region_label`)}
                  value={translateData(deliveryRegion, 'name')}
                />
                <DetailValue
                  label={t(`input_trades_${type}_transfer_district_label`)}
                  value={translateData(deliveryDistrict, 'name')}
                />
                <DetailValue
                  label={t(`input_trades_${type}_transfer_address_label`)}
                  value={deliveryAddress}
                />
                {deliveryCoords && (
                  <DetailValue
                    label={t('trades_detail_geolocation_label')}
                    value={(
                      <Button leftIcon={<Map />} variant={'link'} onClick={onOpenMap}>
                        {t('trades_detail_show_map_label')}
                      </Button>
                    )}
                  />
                )}
              </Stack>

              <TradeDetailProduct data={detail} />
            </Stack>

            <TradeDetailAside data={detail} refetch={refetch} />
          </PageGrid>

          <TradeParticipants
            data={detail}
            isLoading={isLoading}
            refetch={refetch}
          />

          <TradeOtherList data={detail} />
        </Stack>
      </PageLayout>

      {deliveryCoords && (
        <PopModal isOpen={isOpenMap} onClose={onCloseMap} size={'5xl'}>
          <YandexMap
            coords={deliveryCoords}
            defaultState={{ center: deliveryCoords, zoom: 15 }}
          />
        </PopModal>
      )}
      <PopModal
        title={productName}
        isOpen={!!selectedImage}
        onClose={onCloseImageModal}
        closeOnOverlayClick={true}
        size={'2xl'}>
        {selectedImage && (
          <ChakraImage
            alt={productName}
            src={selectedImage.file}
            fallbackSrc={'/assets/dots.png'}
            borderRadius={'md'}
            h={'full'}
            maxW={'full'}
            m={'auto'}
          />
        )}
      </PopModal>
    </PageWrapper>
  )
}
