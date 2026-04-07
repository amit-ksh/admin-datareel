import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Copy, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import Link from 'next/link'

interface Organization {
  id: string
  name: string
  joinDate: string
  usage: string
  videos: string
  approvalRate: string
  viewerSatisfaction: string
  logoUrl?: string
}

interface TopOrganizationsTableProps {
  data?: Organization[]
  isLoading?: boolean
}

export function TopOrganizationsTable({
  data = [],
  isLoading,
}: TopOrganizationsTableProps) {
  if (isLoading) {
    return (
      <Card className='bg-card w-full gap-0 overflow-hidden rounded-lg border p-0 shadow-none'>
        <CardHeader className='px-6 py-4'>
          <CardTitle className='text-base font-bold'>
            Top Organisation
          </CardTitle>
        </CardHeader>
        <CardContent className='flex items-center justify-center p-8'>
          <Skeleton className='h-[400px] w-full' />
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className='bg-card w-full gap-0 overflow-hidden rounded-lg border p-0 shadow-none'>
      <CardHeader className='px-6 py-4'>
        <CardTitle className='text-base font-bold'>Top Organisation</CardTitle>
      </CardHeader>
      <CardContent className='p-0'>
        <Table className='border-t'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[300px] pl-6'>Organisation</TableHead>
              <TableHead className='text-nowrap'>Join at</TableHead>
              <TableHead>Videos</TableHead>
              <TableHead className='text-nowrap'>Usage</TableHead>
              <TableHead className='text-nowrap'>Avg. Feedback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((org) => (
              <TableRow key={org.id} className='h-20'>
                <TableCell className='pl-6'>
                  <Link
                    href={`/organisations/${org.id}`}
                    className='flex items-center gap-3'
                  >
                    <Avatar className='h-10 w-10 border-none'>
                      <AvatarImage src={org.logoUrl} alt={org.name} />
                      <AvatarFallback className='bg-primary text-primary-foreground text-sm font-semibold'>
                        {org.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <div className='text-foreground flex items-center text-sm font-bold text-nowrap'>
                        {org.name}
                        <span className='text-muted-foreground hover:text-foreground ml-1.5 transition-colors'>
                          <ExternalLink className='h-3 w-3' />
                        </span>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        <span className='text-muted-foreground line-clamp-1 max-w-[80px] font-mono text-[10px] font-normal opacity-70'>
                          ID: {org.id}
                        </span>
                        <button
                          onClick={async (e) => {
                            try {
                              e.stopPropagation()
                              await navigator.clipboard.writeText(org.id)
                              toast.success('ID copied to clipboard')
                            } catch {
                              toast.error('Failed to copy ID')
                            }
                          }}
                          className='text-muted-foreground hover:text-foreground transition-colors'
                          aria-label='Copy template ID'
                          type='button'
                        >
                          <Copy className='h-2.5 w-2.5' />
                        </button>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className='text-foreground text-sm font-medium text-nowrap'>
                  {org.joinDate}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.videos}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.usage}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.viewerSatisfaction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <TablePagination
          currentPage={1}
          pageSize={10}
          totalItems={24}
          entityName='top organisations'
          className='border-t'
        /> */}
      </CardContent>
    </Card>
  )
}
