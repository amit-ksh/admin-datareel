import { AxiosError } from 'axios'

export type AppError = {
  message?: string
  details?: any
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<AppError>
  }
}
