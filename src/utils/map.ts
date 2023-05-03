import { TGeolocation } from '~/types/geo'
import { toNumber } from '~/utils/number'

export function latLonToCoords (latLonObj: TGeolocation): number[] {
  if (!latLonObj || !latLonObj?.lat || !latLonObj?.lon) return null

  const { lat, lon } = latLonObj
  return [toNumber(lat), toNumber(lon)]
}
