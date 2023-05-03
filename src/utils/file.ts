import { toNumber } from '~/utils/number'

export function humanizeFileSize (size: number | string): string {
  const sizeNum = toNumber(size)

  if (!sizeNum) return null

  const sizes = ['B', 'kB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(sizeNum) / Math.log(1024))
  const value = (sizeNum / Math.pow(1024, i)).toFixed(2)

  return value + ' ' + sizes[i]
}
