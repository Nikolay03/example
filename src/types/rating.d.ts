import { RatingDesignations } from '~/types/enums'

export type TRating = {
  id: number
  designation: RatingDesignations
  point: number
}
