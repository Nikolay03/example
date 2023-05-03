/* eslint-disable max-len */
import { ReactElement } from 'react'
import { Icon, IconProps, useToken } from '@chakra-ui/react'

export default function AccreditationRequired (props: IconProps): ReactElement {
  const colors = ['primary.500', 'gray.500', 'gray.200']
  const [primary500, gray500, gray200] = useToken('colors', colors)

  return (
    <Icon boxSize={24} viewBox={'0 0 96 96'} fill={'none'} {...props}>
      <path fill={'white'} stroke={gray200} d={'M74.0688 83.4998H32.3621V74.5688H78.5343V79.0343C78.5343 81.4895 76.5239 83.4998 74.0688 83.4998Z'} />
      <path fill={'white'} stroke={gray200} d={'M36.8276 74.5687H36.3276V75.0687V78.0342C36.3276 79.2747 35.8152 80.6598 34.9754 81.733C34.1337 82.8085 33.0232 83.4997 31.8621 83.4997C29.407 83.4997 27.3966 81.4893 27.3966 79.0342V16.9655C27.3966 15.1258 26.4768 13.4916 25.0741 12.5H67.862C70.3171 12.5 72.3275 14.5104 72.3275 16.9655V74.5687H36.8276Z'} />
      <path fill={gray500} d={'M59.1724 51.7243C59.1724 51.0387 59.7281 50.4829 60.4137 50.4829H67.862C68.5476 50.4829 69.1034 51.0387 69.1034 51.7243C69.1034 52.4099 68.5476 52.9657 67.862 52.9657H60.4137C59.7281 52.9657 59.1724 52.4099 59.1724 51.7243Z'} />
      <path fill={gray500} opacity={'0.34'} d={'M30.6211 51.7243C30.6211 51.0387 31.1769 50.4829 31.8625 50.4829H55.4486C56.1342 50.4829 56.6899 51.0387 56.6899 51.7243C56.6899 52.4099 56.1342 52.9657 55.4486 52.9657H31.8625C31.1769 52.9657 30.6211 52.4099 30.6211 51.7243Z'} />
      <path fill={gray500} opacity={'0.5'} d={'M44.2759 56.6896C44.2759 56.004 44.8317 55.4482 45.5173 55.4482H67.862C68.5476 55.4482 69.1034 56.004 69.1034 56.6896C69.1034 57.3752 68.5476 57.931 67.862 57.931H45.5173C44.8317 57.931 44.2759 57.3752 44.2759 56.6896Z'} />
      <path fill={gray500} opacity={'0.3'} d={'M30.6208 56.6896C30.6208 56.004 31.1766 55.4482 31.8622 55.4482H40.5518C41.2374 55.4482 41.7932 56.004 41.7932 56.6896C41.7932 57.3752 41.2374 57.931 40.5518 57.931H31.8622C31.1766 57.931 30.6208 57.3752 30.6208 56.6896Z'} />
      <path fill={gray500} opacity={'0.2'} d={'M52.9653 66.6208C52.9653 65.9352 53.5211 65.3794 54.2067 65.3794H67.8618C68.5474 65.3794 69.1032 65.9352 69.1032 66.6208C69.1032 67.3064 68.5474 67.8622 67.8618 67.8622H54.2067C53.5211 67.8622 52.9653 67.3064 52.9653 66.6208Z'} />
      <path fill={gray500} opacity={'0.8'} d={'M30.6208 66.6208C30.6208 65.9352 31.1766 65.3794 31.8622 65.3794H49.2415C49.927 65.3794 50.4828 65.9352 50.4828 66.6208C50.4828 67.3064 49.927 67.8622 49.2415 67.8622H31.8622C31.1766 67.8622 30.6208 67.3064 30.6208 66.6208Z'} />
      <path fill={primary500} d={'M48.3723 35.0895L49.2415 35.5859L50.1107 35.0895C54.207 32.3583 56.6897 27.6413 56.6897 22.6758V19.4481L49.2415 16.9653L41.7932 19.4481V22.6758C41.7932 27.6413 44.276 32.234 48.3723 35.0895Z'} />
      <path fill={'white'} d={'M48.7448 30.3721L47.3792 28.2621C49.117 27.0207 50.3583 25.1587 50.4826 22.9238L52.9653 23.1723C52.7168 26.1515 51.1033 28.7585 48.7448 30.3721Z'} />
      <path fill={gray500} opacity={'0.3'} d={'M44.2759 46.7585C44.2759 46.0729 44.8317 45.5171 45.5172 45.5171H67.862C68.5476 45.5171 69.1034 46.0729 69.1034 46.7585C69.1034 47.444 68.5476 47.9998 67.862 47.9998H45.5172C44.8317 47.9998 44.2759 47.444 44.2759 46.7585Z'} />
      <path fill={gray500} opacity={'0.5'} d={'M30.6208 46.7585C30.6208 46.0729 31.1766 45.5171 31.8622 45.5171H40.5518C41.2374 45.5171 41.7932 46.0729 41.7932 46.7585C41.7932 47.444 41.2374 47.9998 40.5518 47.9998H31.8622C31.1766 47.9998 30.6208 47.444 30.6208 46.7585Z'} />
      <path fill={gray500} d={'M40.5518 40.5519C40.5518 39.8663 41.1075 39.3105 41.7931 39.3105H56.6896C57.3752 39.3105 57.931 39.8663 57.931 40.5519C57.931 41.2375 57.3752 41.7933 56.6896 41.7933H41.7931C41.1075 41.7933 40.5518 41.2375 40.5518 40.5519Z'} />
      <path fill={'white'} stroke={gray200} d={'M22.9311 12.5C25.3862 12.5 27.3966 14.5104 27.3966 16.9655V25.1551H18.4656V16.9655C18.4656 14.5104 20.4759 12.5 22.9311 12.5Z'} />
    </Icon>
  )
}