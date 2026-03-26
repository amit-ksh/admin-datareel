import { AxiosError } from 'axios'

export type AppError = {
  message?: string
  details?: Record<string, unknown>
  detail?: string
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<AppError>
  }
}
