import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ExternalLink } from 'lucide-react'
import { TablePagination } from '@/components/ui/table-pagination'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Organization {
  id: string
  name: string
  joinDate: string
  usage: string
  videos: string
  approvalRate: string
  viewerSatisfaction: string
  logoUrl?: string
  externalLink?: string
}

const dummyData: Organization[] = [
  {
    id: '#1234',
    name: 'Acme org',
    joinDate: '1 Jan 2026',
    usage: '12K',
    videos: '5K',
    approvalRate: '95%',
    viewerSatisfaction: '4.5/5',
    logoUrl: '',
    externalLink: '#',
  },
  {
    id: '#1235',
    name: 'Datareel',
    joinDate: '1 Feb 2026',
    usage: '2K',
    videos: '1.2K',
    approvalRate: '85%',
    viewerSatisfaction: '4.75/5',
    logoUrl: '',
    externalLink: '#',
  },
  {
    id: '#1236',
    name: 'Stark Industries',
    joinDate: '1 Mar 2026',
    usage: '10K',
    videos: '3K',
    approvalRate: '90%',
    viewerSatisfaction: '4/5',
    logoUrl: '',
    externalLink: '#',
  },
]

export function TopOrganizationsTable() {
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
              <TableHead>Join at</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Videos</TableHead>
              <TableHead>Approval Rate</TableHead>
              <TableHead>Viewer Satisfaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((org) => (
              <TableRow key={org.id} className='h-20'>
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-3'>
                    <Avatar className='h-10 w-10 border-none'>
                      <AvatarImage src={org.logoUrl} alt={org.name} />
                      <AvatarFallback className='bg-primary text-primary-foreground text-sm font-semibold'>
                        {org.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <div className='text-foreground flex items-center text-sm font-bold'>
                        {org.name}
                        {org.externalLink && (
                          <a
                            href={org.externalLink}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-muted-foreground hover:text-foreground ml-1.5 transition-colors'
                          >
                            <ExternalLink className='h-3 w-3' />
                          </a>
                        )}
                      </div>
                      <span className='text-muted-foreground mt-0.5 text-xs'>
                        {org.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className='text-foreground text-sm font-medium'>
                  {org.joinDate}
                </TableCell>
                <TableCell className='text-foreground text-sm font-medium'>
                  {org.usage}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.videos}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.approvalRate}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.viewerSatisfaction}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          currentPage={1}
          pageSize={10}
          totalItems={24}
          entityName='top organisations'
          className='border-t'
        />
      </CardContent>
    </Card>
  )
}
