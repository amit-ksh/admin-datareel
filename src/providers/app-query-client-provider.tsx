"use client";

import type { FC, ReactNode } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 0,
      staleTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AppQueryClientProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NEXT_PUBLIC_NODE_ENV === "dev" && (
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      )}
      {children}
    </QueryClientProvider>
  );
};

export default AppQueryClientProvider;
