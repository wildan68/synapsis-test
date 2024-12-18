"use client";

import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClientConfig } from "@/providers/react-query/client";

export function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(queryClientConfig);

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
