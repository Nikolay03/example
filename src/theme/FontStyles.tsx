import { ReactElement } from 'react'
import { css, Global } from '@emotion/react'

export default function FontStyles (): ReactElement {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'Gilroy';
          font-style: normal;
          font-weight: 400;
          font-display: fallback;
          src: url('/fonts/Gilroy-Regular.woff') format('woff');
        }
        @font-face {
          font-family: Gilroy;
          font-style: italic;
          font-weight: 400;
          font-display: fallback;
          src: url('/fonts/Gilroy-RegularItalic.woff') format('woff');
        }

        @font-face {
          font-family: Gilroy;
          font-style: normal;
          font-weight: 500;
          font-display: fallback;
          src: url('/fonts/Gilroy-Medium.woff') format('woff');
        }
        @font-face {
          font-family: Gilroy;
          font-style: italic;
          font-weight: 500;
          font-display: fallback;
          src: url('/fonts/Gilroy-MediumItalic.woff') format('woff');
        }

        @font-face {
          font-family: Gilroy;
          font-style: normal;
          font-weight: 600;
          font-display: fallback;
          src: url('/fonts/Gilroy-SemiBold.woff') format('woff');
        }
        @font-face {
          font-family: Gilroy;
          font-style: italic;
          font-weight: 600;
          font-display: fallback;
          src: url('/fonts/Gilroy-SemiBoldItalic.woff') format('woff');
        }

        @font-face {
          font-family: Gilroy;
          font-style: normal;
          font-weight: 700;
          font-display: fallback;
          src: url('/fonts/Gilroy-Bold.woff') format('woff');
        }
        @font-face {
          font-family: Gilroy;
          font-style: italic;
          font-weight: 700;
          font-display: fallback;
          src: url('/fonts/Gilroy-BoldItalic.woff') format('woff');
        }
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-regular.eot'); /* IE9 Compat Modes */
    src: local('Montserrat Regular'), local('Montserrat-Regular'),
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-regular.woff2') format('woff2'), /* Super Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-regular.woff') format('woff'), /* Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-regular.ttf') format('truetype'), /* Safari, Android, iOS */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-regular.svg#Montserrat') format('svg'); /* Legacy iOS */
}
/* montserrat-500 - latin_cyrillic */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 500;
    src: url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-500.eot'); /* IE9 Compat Modes */
    src: local('Montserrat Medium'), local('Montserrat-Medium'),
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-500.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-500.woff2') format('woff2'), /* Super Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-500.woff') format('woff'), /* Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-500.ttf') format('truetype'), /* Safari, Android, iOS */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-500.svg#Montserrat') format('svg'); /* Legacy iOS */
}
/* montserrat-600 - latin_cyrillic */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    src: url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-600.eot'); /* IE9 Compat Modes */
    src: local('Montserrat SemiBold'), local('Montserrat-SemiBold'),
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-600.woff2') format('woff2'), /* Super Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-600.woff') format('woff'), /* Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-600.ttf') format('truetype'), /* Safari, Android, iOS */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-600.svg#Montserrat') format('svg'); /* Legacy iOS */
}
/* montserrat-700 - latin_cyrillic */
@font-face {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-700.eot'); /* IE9 Compat Modes */
    src: local('Montserrat Bold'), local('Montserrat-Bold'),
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-700.woff2') format('woff2'), /* Super Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-700.woff') format('woff'), /* Modern Browsers */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-700.ttf') format('truetype'), /* Safari, Android, iOS */
    url('/fonts/Montserrat/montserrat-v15-latin_cyrillic-700.svg#Montserrat') format('svg'); /* Legacy iOS */
}

      `}
    />
  )
}
