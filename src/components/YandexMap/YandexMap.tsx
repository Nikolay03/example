import { ReactElement } from 'react'
import { Map, SearchControl, YMaps, MapState, Placemark } from 'react-yandex-maps'
import { useBreakpointValue } from '@chakra-ui/react'

interface Props {
  coords?: number[]
  onLoad?: (map) => void
  onClick?: (event) => void
  onBoundsChange?: (event) => void
  defaultState?: MapState
}

export default function YandexMap (props: Props): ReactElement {
  const { coords, defaultState, onLoad, onClick, onBoundsChange } = props

  const mapHeight = useBreakpointValue({ base: '60vh', md: '600px' })

  return (
    // @ts-ignore
    <YMaps
      query={{
        apikey: process.env.NEXT_PUBLIC_YANDEX_MAP_API_KEY,
        lang: 'ru_RU',
        mode: 'debug'
      }}
      preload={true}>
      {/*  @ts-ignore */}
      <Map
        height={mapHeight}
        width={'100%'}
        onLoad={onLoad}
        modules={['geocode']}
        onBoundsChange={onBoundsChange}
        onClick={onClick}
        defaultState={defaultState}>
        {/*  @ts-ignore */}
        <SearchControl options={{ float: 'left' }} />
        {/*  @ts-ignore */}
        {coords && <Placemark geometry={coords} />}
      </Map>
    </YMaps>
  )
}
