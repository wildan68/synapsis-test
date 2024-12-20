export type IPayloadLogin = {
  name: string
  token: string
}

export type IPost = {
  id: number
  body: string
  title: string
  user_id: number
}
export type IPayloadCreatePost = {
  user_id: number
  title: string
  body: string
}