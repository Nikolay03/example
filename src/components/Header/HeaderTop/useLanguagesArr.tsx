import { useEffect, useState } from 'react'
import { CircleFlag, CircleFlagProps } from 'react-circle-flags'

import { TLanguage } from './Languages'

import { DEV_HOST } from '~/constants/constants'

function StyledCircleFlag (props: CircleFlagProps) {
  return (
    <CircleFlag
      height={'15'}
      width={'15'}
      style={{ minWidth: '15px' }}
      {...props}
    />
  )
}

const useLanguagesArr = () => {
  const [languages, setLanguages] = useState([])
  useEffect(() => {
    const languagesArr: TLanguage[] = [
      {
        id: 'uz',
        name: 'O\'zbekcha',
        flag: <StyledCircleFlag countryCode={'uz'} />
      },
      {
        id: 'ru',
        name: 'Русский',
        flag: <StyledCircleFlag countryCode={'ru'} />
      }
    ].filter(i => i)
    setLanguages(languagesArr)
  }, [])
  return {
    languages
  }
}

export default useLanguagesArr
