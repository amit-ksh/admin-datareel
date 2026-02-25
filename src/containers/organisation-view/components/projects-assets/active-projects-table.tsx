import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { TablePagination } from '@/components/ui/table-pagination'
import { Search, Filter, Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatDuration } from '@/lib/utils'

export function ActiveProjectsTable() {
  const activeProjects = [
    {
      id: '1',
      initials: 'MT',
      name: 'Marketing Tooling',
      totalVideos: 124,
      totalDuration: 2_23_234, // in seconds
      avgDuration: 1800,
      approvalRate: 80,
      feedback: 4.8,
      avatarColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: '2',
      initials: 'OB',
      name: 'Onboarding Flow',
      totalVideos: 89,
      totalDuration: 2_23_234,
      avgDuration: 2509,
      approvalRate: 80,
      feedback: 4.5,
      avatarColor: 'bg-purple-100 text-purple-700',
    },
    {
      id: '3',
      initials: 'AS',
      name: 'Ad Series A/B',
      totalVideos: 210,
      totalDuration: 2_23_234,
      avgDuration: 1063,
      approvalRate: 80,
      feedback: 4.9,
      avatarColor: 'bg-red-100 text-red-700',
    },
  ]

  return (
    <div className='space-y-6'>
      {/* Active Projects Header */}
      <div className='flex flex-col items-start justify-between gap-4 pt-2 sm:flex-row sm:items-center'>
        <h3 className='text-lg font-bold'>Active Projects</h3>
        <div className='flex w-full items-center gap-3 sm:w-auto'>
          <div className='relative w-full sm:w-64'>
            <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
            <Input
              placeholder='Search projects...'
              className='bg-muted/30 focus-visible:border-primary h-9 border-transparent pl-9 shadow-none focus-visible:ring-1'
            />
          </div>
          <Button variant='outline' className='h-9 gap-2 border shadow-none'>
            <Filter className='h-4 w-4' />
            Filter
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <Card className='bg-card w-full overflow-hidden rounded-xl border p-0 shadow-none'>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='text-muted-foreground w-[300px] pl-6 text-xs font-bold tracking-wider uppercase'>
                  Project
                </TableHead>
                <TableHead className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                  Total Videos
                </TableHead>
                <TableHead className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                  Total Duration
                </TableHead>
                <TableHead className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                  Approval Rate
                </TableHead>
                <TableHead className='text-muted-foreground text-xs font-bold tracking-wider uppercase'>
                  Viewer Sattification
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activeProjects.map((project) => (
                <TableRow key={project.id} className='h-16'>
                  <TableCell className='pl-6'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-8 w-8 rounded bg-transparent'>
                        <AvatarFallback
                          className={`${project.avatarColor} rounded text-xs font-bold uppercase`}
                        >
                          {project.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className='text-foreground text-sm font-bold'>
                        {project.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className='text-foreground text-sm font-medium'>
                    {project.totalVideos}
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm font-medium'>
                    <div className='flex items-center gap-2'>
                      <span className='text-foreground'>
                        {formatDuration(project.totalDuration)}
                      </span>
                      <Badge
                        variant='secondary'
                        className='bg-muted text-muted-foreground hover:bg-muted border-none px-2 py-0 text-xs font-normal shadow-none'
                      >
                        {formatDuration(project.avgDuration)} avg
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1.5 text-sm font-bold'>
                      {project.approvalRate}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center gap-1.5 text-sm font-bold'>
                      <Star className='h-3.5 w-3.5 border-none fill-yellow-400 text-yellow-400' />
                      {project.feedback}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            currentPage={1}
            pageSize={3}
            totalItems={12}
            entityName='projects'
            className='bg-card border-t py-2'
          />
        </CardContent>
      </Card>
    </div>
  )
}
