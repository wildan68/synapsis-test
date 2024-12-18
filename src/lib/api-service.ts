import api from "@/lib/api"

export const ApiService = {
  getUser: {
    call: ({ accessToken }: { accessToken: string }) => {
      return api.get("/users?access-token=" + accessToken)
    },
    key: "get-user",
  },
}