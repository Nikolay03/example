import { TObject } from '~/types/constants'

export type TDeletePromise = (url: string, data?: TObject) => Promise<void>
export type TGetPromise<T = any> = (params?: TObject) => Promise<T>
export type TPostPromise = (data?: TObject) => Promise<any>
export type TPutPromise = (data?: TObject) => Promise<any>
export type TUseUploadPromise = (data, onProgress?) => Promise<any>
