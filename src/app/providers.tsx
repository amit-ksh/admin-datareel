import { TooltipProvider } from '@/components/ui/tooltip'
import AppQueryClientProvider from '@/providers/app-query-client-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <AppQueryClientProvider>{children}</AppQueryClientProvider>
    </TooltipProvider>
  )
}
