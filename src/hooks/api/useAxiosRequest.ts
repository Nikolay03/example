import request, { Request } from '~/utils/request'

export default function useAxiosRequest (): Request {
  return request()
}
