import { Fragment, ReactElement, useState } from 'react'
import { path } from 'ramda'
import { useFormContext } from 'react-hook-form'
import { Crosshair, MapPin, X } from 'react-feather'
import { Box, Button, Icon, IconButton, IconButtonProps, InputProps, Stack, useDisclosure } from '@chakra-ui/react'

import { useTranslate } from '~/utils/translate'
import { FormFieldProps } from '~/types/components'
import { Input } from '~/components/HookForm'
import { PopModal } from '~/components/Modal'
import YandexMap from '~/components/YandexMap'

const CENTER = [41.30882292588138, 69.25220409208157]

const StyledIconButton = (props: IconButtonProps) => (
  <IconButton
    color={'gray.500'}
    colorScheme={'gray'}
    h={8}
    w={8}
    minW={'unset'}
    {...props}
  />
)

export default function GeolocationSelect (props: FormFieldProps<InputProps>): ReactElement {
  const { name, ...restProps } = props

  const { t } = useTranslate()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isLoading, setLoading] = useState(true)
  const [map, setMap] = useState(null)
  const [address, setAddress] = useState(null)

  const { setValue, watch } = useFormContext()

  const value = watch(name)
  const coords = value || CENTER

  function onCancel () {
    onClose()
    setMap(null)
    setAddress(null)
  }

  function onClear () {
    setValue(name, null)
  }

  function onLoadMap (map) {
    setMap(map)
    setLoading(false)
    onLoadAddress(map, coords)
  }

  function onLoadAddress (map, coords) {
    return map.geocode(coords)
      .then(response => {
        const firstGeoObject = response.geoObjects.get(0)
        const address = firstGeoObject.getAddressLine()
        setAddress(address)
      })
  }

  function onBoundsChange (value) {
    const newCenter = path(['originalEvent', 'newCenter'], value)
    onLoadAddress(map, newCenter)
    setValue(name, newCenter)
  }

  const mapDefaultState = {
    center: coords,
    zoom: value ? 15 : 12,
    controls: []
  }

  return (
    <Fragment>
      <Input
        name={name}
        {...restProps}
        isReadOnly={true}
        rightElement={(
          <Stack direction={'row'}>
            {value && (
              <StyledIconButton
                aria-label={'Clear'}
                icon={<Icon as={X} boxSize={5} />}
                onClick={onClear}
              />
            )}
            <StyledIconButton
              aria-label={'Select geolocation'}
              icon={<Icon as={Crosshair} boxSize={5} />}
              onClick={onOpen}
            />
          </Stack>
        )}
        elementProps={{ right: 2, w: 'auto', zIndex: 'unset' }}
      />

      <PopModal
        title={t('input_trades_transfer_geo')}
        isOpen={isOpen}
        onClose={onCancel}
        size={'5xl'}>
        <Stack h={'full'} w={'full'} spacing={8}>
          <Box pos={'relative'}>
            {(address && !isLoading) && (
              <Fragment>
                <Box
                  pos={'absolute'}
                  top={'50%'}
                  left={'50%'}
                  transform={'translate(-50%, -100%)'}
                  zIndex={1}>
                  <Icon
                    as={MapPin}
                    boxSize={10}
                    color={'primary.500'}
                    fill={'currentColor'}
                    stroke={'white'}
                  />
                </Box>

                <Box
                  bgColor={'white'}
                  boxShadow={'md'}
                  borderRadius={'lg'}
                  p={3}
                  pos={'absolute'}
                  left={6}
                  right={6}
                  bottom={12}
                  textAlign={'center'}
                  zIndex={1}>
                  {address}
                </Box>
              </Fragment>
            )}
            {isLoading && <Box>Loading map...</Box>}
            <YandexMap
              defaultState={mapDefaultState}
              onBoundsChange={onBoundsChange}
              onLoad={onLoadMap}
            />
          </Box>

          {!isLoading && (
            <Stack alignSelf={'flex-end'} direction={'row'} spacing={4}>
              <Button
                borderRadius={'xl'}
                variant={'secondary'}
                size={'lg'}
                onClick={onCancel}>
                {t('button_cancel')}
              </Button>

              <Button
                borderRadius={'xl'}
                size={'lg'}
                onClick={onClose}>
                {t('button_save')}
              </Button>
            </Stack>
          )}
        </Stack>
      </PopModal>
    </Fragment>
  )
}
