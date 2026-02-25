import { SidebarTrigger } from '../ui/sidebar'

export const AppHeader = () => {
  return (
    <header className='sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-4'>
      <SidebarTrigger className='-ml-1' />
    </header>
  )
}
