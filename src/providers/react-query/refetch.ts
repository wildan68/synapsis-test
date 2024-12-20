import { queryClientConfig } from "@/providers/react-query/entity";

export const refetchQueries = (...queryKeys: string[]) => {
  for (const queryKey of queryKeys) {
    queryClientConfig.refetchQueries({
      queryKey: [queryKey],
      exact: false
    })
  }
}