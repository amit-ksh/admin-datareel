import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ExternalLink, Star, ArrowUpDown } from 'lucide-react'
import { TablePagination } from '@/components/ui/table-pagination'
import { Card, CardContent } from '@/components/ui/card'

interface Organisation {
  id: string
  name: string
  joinDate: string
  usage: {
    type?: string
    provider?: string
  }
  videos: string
  views: string
  lastVideoCreated?: string
  feedback: string
  logoUrl?: string
  externalLink?: string
  avatarColorClass: string
}

const dummyData: Organisation[] = [
  {
    id: '#1234',
    name: 'Acme org',
    joinDate: '1 Jan 2026',
    usage: {
      type: 'Lipsync',
      provider: 'Elevenlabs',
    },
    videos: '5K',
    views: '50K',
    lastVideoCreated: '20 Feb 2026',
    feedback: '3.9/5',
    logoUrl: '',
    externalLink: '#',
    avatarColorClass: 'bg-blue-500 text-white',
  },
  {
    id: '#5678',
    name: 'Vertex AI',
    joinDate: '12 Feb 2026',
    usage: {
      type: 'Lipsync',
    },
    videos: '1.2K',
    views: '15K',
    lastVideoCreated: '19 Feb 2026',
    feedback: '4.8/5',
    logoUrl: '',
    externalLink: '#',
    avatarColorClass: 'bg-emerald-500 text-white',
  },
  {
    id: '#8821',
    name: 'Skyline Corp',
    joinDate: '5 Mar 2026',
    usage: {
      provider: 'Elevenlabs',
    },
    videos: '8.4K',
    views: '120K',
    lastVideoCreated: '15 Feb 2026',
    feedback: '4.2/5',
    logoUrl: '',
    externalLink: '#',
    avatarColorClass: 'bg-orange-500 text-white',
  },
]

export function OrganisationsTable() {
  return (
    <Card className='bg-card w-full overflow-hidden rounded-lg border p-0 shadow-none'>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[300px] pl-6'>Organisation</TableHead>
              <TableHead>
                <div className='hover:text-foreground flex cursor-pointer items-center gap-2 select-none'>
                  Join at
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>
                <div className='hover:text-foreground flex cursor-pointer items-center gap-2 select-none'>
                  Videos
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Last Video</TableHead>
              <TableHead>
                <div className='hover:text-foreground flex cursor-pointer items-center gap-2 select-none'>
                  Feedback
                  <ArrowUpDown className='h-3.5 w-3.5' />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((org) => (
              <TableRow key={org.id} className='h-20'>
                <TableCell className='pl-6'>
                  <div className='flex items-center gap-3'>
                    <Avatar className={`h-10 w-10 border-none`}>
                      <AvatarImage src={org.logoUrl} alt={org.name} />
                      <AvatarFallback
                        className={`${org.avatarColorClass} text-sm font-semibold`}
                      >
                        {org.name.substring(0, 1)}
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
                <TableCell>
                  <div className='flex flex-col items-start gap-1.5'>
                    {org.usage.type && (
                      <div className='rounded-sm bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700'>
                        {org.usage.type}
                      </div>
                    )}
                    {org.usage.provider && (
                      <div className='rounded-sm bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700'>
                        {org.usage.provider}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.videos}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  {org.views}
                </TableCell>
                <TableCell className='text-foreground text-sm font-medium'>
                  {org.lastVideoCreated || 'N/A'}
                </TableCell>
                <TableCell className='text-foreground text-sm font-bold'>
                  <div className='flex items-center gap-1.5'>
                    {org.feedback}
                    <Star className='h-4 w-4 border-none fill-yellow-400 text-yellow-400' />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Footer */}
        <TablePagination
          currentPage={1}
          pageSize={3}
          totalItems={24}
          entityName='organisations'
          className='border-t'
        />
      </CardContent>
    </Card>
  )
}
