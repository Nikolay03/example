import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { GetServerSidePropsContext } from 'next'

import { COOKIE_LOCALE_KEY, COOKIE_TOKEN_KEY, getLocale, getToken, removeToken } from './cookies'
import toSnakeCase from './toSnakeCase'
import transformAxiosResponse from './transformResponse'

import { getApiBaseURL } from '~/constants/api'
import { TObject } from '~/types/constants'
import { Locales } from '~/types/enums'

type ServerRequest = GetServerSidePropsContext['req']

interface RequestConfig extends Omit<AxiosRequestConfig, 'transformResponse'> {
  req?: ServerRequest
  transformResponse?: boolean
}

const onFulfilled = response => response

const onRejected = (error: AxiosError) => {
  if (error.response.status === 401) {
    if (typeof window !== 'undefined') {
      removeToken()
      window.location.replace('/')
    }
  }

  if (error.message === 'Network Error') {
    const networkError = {
      response: {
        data: {
          nonFieldErrors: ['No internet.']
        }
      }
    }

    return Promise.reject(networkError)
  }

  return Promise.reject(error)
}

async function getAxiosHeaders (req?: ServerRequest) {
  const token: string = req ? req.cookies[COOKIE_TOKEN_KEY] : getToken()
  const defaultLocale = Locales.UZ
  const locale = req ? req.cookies[COOKIE_LOCALE_KEY] || defaultLocale : getLocale(defaultLocale)

  if (token) {
    return {
      'Accept-Language': locale,
      Authorization: `${process.env.NEXT_PUBLIC_TOKEN_TYPE} ${token}`
    }
  }

  return {
    'Accept-Language': locale
  }
}

function getAxiosInstance (config: RequestConfig) {
  const { req, transformResponse = true, ...axiosConfig } = config

  const baseURL = getApiBaseURL(req)

  const instance = axios.create({
    baseURL,
    transformResponse: transformResponse ? [transformAxiosResponse] : undefined,
    ...axiosConfig
  })

  instance.interceptors.response.use(onFulfilled, onRejected)

  return instance
}

export interface Request {
  get: <T = any>(url: string, params?: TObject) => Promise<AxiosResponse<T>>
  post: <T = any>(url: string, data?: TObject) => Promise<AxiosResponse<T>>
  put: <T = any>(url: string, data?: TObject) => Promise<AxiosResponse<T>>
  delete: <T = any>(url: string, data?: TObject) => Promise<AxiosResponse<T>>
  upload: <T = any>(url: string, data?: TObject, onUploadProgress?: (event: any) => void) => Promise<AxiosResponse<T>>
}

export default function request (config: RequestConfig = {}): Request {
  const { req } = config

  return {
    get: async function<T> (url, params?) {
      const api = getAxiosInstance({
        ...config,
        headers: await getAxiosHeaders(req)
      })

      return api.get<T>(url, {
        params: toSnakeCase(params)
      })
    },
    post: async function<T> (url, data?) {
      const api = getAxiosInstance({
        ...config,
        headers: await getAxiosHeaders(req)
      })

      return api.post<T>(url, toSnakeCase(data))
    },
    put: async function<T> (url, data?) {
      const api = getAxiosInstance({
        ...config,
        headers: await getAxiosHeaders(req)
      })

      return api.put<T>(url, toSnakeCase(data))
    },
    delete: async function<T> (url, data?) {
      const api = getAxiosInstance({
        ...config,
        headers: await getAxiosHeaders(req)
      })

      return api.delete<T>(url, {
        data: toSnakeCase(data)
      })
    },
    upload: async function (url: string, data?, onUploadProgress?) {
      const headers = await getAxiosHeaders(req)
      const uploadApi = getAxiosInstance(config)

      return uploadApi({
        url,
        method: 'post',
        data,
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress
      })
    }
  }
}
