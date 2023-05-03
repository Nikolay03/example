import { AxiosResponse, AxiosError } from 'axios'

export const getDataFromSuccess = <T = any> (response: AxiosResponse): T => {
  if (response && response.data) {
    return response.data
  }
}

export const getDataFromError = (error: AxiosError): any => {
  const response = error.response

  if (response.data) {
    return response.data
  }
}
