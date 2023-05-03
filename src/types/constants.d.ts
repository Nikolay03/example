export type TSelectListItem<T = string | number> = {
  id: T
  name: string
}

export type TObject<T = any> = Record<string, T>
