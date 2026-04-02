import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import AppQueryClientProvider from '@/providers/app-query-client-provider'
import { AuthProvider } from '@/providers/auth-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AppQueryClientProvider>
        <AuthProvider>
          {children}
          <Toaster richColors theme='light' />
        </AuthProvider>
      </AppQueryClientProvider>
    </TooltipProvider>
  )
}
