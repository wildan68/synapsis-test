import api, { post } from "@/lib/api"
import { IPost, IPayloadCreatePost } from "@/types/index.type"

export const ApiService = {
  getUser: {
    call: ({ accessToken }: { accessToken: string }) => {
      return api.get("/users?access-token=" + accessToken)
    },
    key: "get-user",
  },
  getPosts: {
    call: (userId: number) => {
      return api.get<IPost[]>(`/users/${userId}/posts`)
    },
    key: "get-posts",
  },
  getPost: {
    call: (postId: number) => {
      return api.get<IPost>(`/posts/${postId}`)
    },
    key: "get-post"
  },
  postPost: {
    call: (payload: IPayloadCreatePost) => {
      return api.post<IPost>("/posts", payload)
    },
    key: "create-post",
  },
  putPost: {
    call: (postId: number,payload: IPayloadCreatePost) => {
      return api.put<IPost>(`/posts/${postId}`, payload)
    },
    key: "put-post",
  },
  deletePost: {
    call: (postId: number) => {
      return api.delete<IPost>(`/posts/${postId}`)
    },
    key: "delete-post",
  }
}