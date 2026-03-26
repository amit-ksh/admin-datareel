'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TablePagination } from '@/components/ui/table-pagination'
import {
  Eye,
  CheckCircle,
  XCircle,
  Code,
  LayoutTemplate,
  Loader2,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  EmailTemplateListitem,
  useGetEmailTemplate,
  useApproveEmailTemplate,
} from '@/api/email-templates'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

interface EmailTemplatesTableProps {
  data: EmailTemplateListitem[]
  meta?: {
    total: number
    page: number
    limit: number
    last_page: number
  }
  isLoading: boolean
  onPageChange: (page: number) => void
}

export function EmailTemplatesTable({
  data,
  meta,
  isLoading,
  onPageChange,
}: EmailTemplatesTableProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null,
  )
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const handleReviewClick = (id: string) => {
    setSelectedTemplateId(id)
    setIsReviewDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <Badge
            variant='default'
            className='border-0 bg-emerald-500 text-white hover:bg-emerald-600'
          >
            <CheckCircle className='mr-1 h-3 w-3' /> Verified
          </Badge>
        )
      case 'not-verified':
        return (
          <Badge
            variant='secondary'
            className='border-0 bg-amber-100 text-amber-800 hover:bg-amber-200'
          >
            <LayoutTemplate className='mr-1 h-3 w-3' /> Pending
          </Badge>
        )
      case 'rejected':
        return (
          <Badge variant='destructive' className='border-0'>
            <XCircle className='mr-1 h-3 w-3' /> Rejected
          </Badge>
        )
      default:
        return <Badge variant='outline'>{status}</Badge>
    }
  }

  const getFallbackColor = (name: string) => {
    const colors = [
      'bg-blue-500',
      'bg-emerald-500',
      'bg-orange-500',
      'bg-purple-500',
      'bg-pink-500',
    ]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <>
      <Card className='bg-card w-full overflow-hidden rounded-lg border p-0'>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[250px] pl-6'>Organisation</TableHead>
                <TableHead>Template Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='pr-6 text-right'>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className='h-20'>
                    <TableCell className='pl-6'>
                      <div className='flex items-center gap-3'>
                        <Skeleton className='h-10 w-10 rounded-full' />
                        <Skeleton className='h-4 w-24' />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-32' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-20' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-4 w-40' />
                    </TableCell>
                    <TableCell>
                      <Skeleton className='h-6 w-16' />
                    </TableCell>
                    <TableCell className='pr-6 text-right'>
                      <Skeleton className='ml-auto h-8 w-20' />
                    </TableCell>
                  </TableRow>
                ))
              ) : data.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className='text-muted-foreground h-32 text-center'
                  >
                    No email templates found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((tpl) => (
                  <TableRow key={tpl.id} className='h-20'>
                    <TableCell className='pl-6'>
                      <div className='flex items-center gap-3'>
                        <Avatar className='h-10 w-10 border-none'>
                          <AvatarImage
                            src={tpl.organisation_logo || ''}
                            alt={tpl.organisation_name}
                          />
                          <AvatarFallback
                            className={`${getFallbackColor(tpl.organisation_name)} text-sm font-semibold text-white`}
                          >
                            {tpl.organisation_name.substring(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                          <span className='text-foreground text-sm font-bold'>
                            {tpl.organisation_name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='text-foreground font-medium'>
                      {tpl.template_name}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant='outline'
                        className='bg-muted/50 text-muted-foreground border-transparent font-medium'
                      >
                        {tpl.type}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className='max-w-[200px] truncate'
                      title={tpl.subject}
                    >
                      {tpl.subject}
                    </TableCell>
                    <TableCell>{getStatusBadge(tpl.status)}</TableCell>
                    <TableCell className='pr-6 text-right'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handleReviewClick(tpl.id)}
                        className='border-primary/20 hover:bg-primary/5 text-primary'
                      >
                        <Eye className='mr-2 h-4 w-4' />
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {meta && (
            <TablePagination
              currentPage={meta.page}
              pageSize={meta.limit}
              totalItems={meta.total}
              entityName='templates'
              className='border-t'
              onPageChange={onPageChange}
            />
          )}
        </CardContent>
      </Card>

      <ReviewTemplateDialog
        open={isReviewDialogOpen}
        onOpenChange={(open) => {
          setIsReviewDialogOpen(open)
          if (!open) setSelectedTemplateId(null)
        }}
        templateId={selectedTemplateId}
      />
    </>
  )
}

function ReviewTemplateDialog({
  open,
  onOpenChange,
  templateId,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  templateId: string | null
}) {
  const { data: template, isLoading } = useGetEmailTemplate(templateId)
  const { mutate: approve, isPending: isApproving } = useApproveEmailTemplate()

  const handleApprove = () => {
    if (!templateId) return

    approve(templateId, {
      onSuccess: (res) => {
        if (res.approve) {
          toast.success('Template approved successfully')
          onOpenChange(false)
        } else {
          toast.error('Failed to approve template')
        }
      },
      onError: () => {
        toast.error('An error occurred while approving the template')
      },
    })
  }

  if (!templateId) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-[95vh] w-full flex-col overflow-hidden p-6 sm:h-[90vh] sm:max-w-6xl'>
        {isLoading ? (
          <div className='flex flex-1 items-center justify-center'>
            <div className='border-primary h-8 w-8 animate-spin rounded-full border-b-2'></div>
          </div>
        ) : template ? (
          <>
            <DialogHeader className='flex-none'>
              <div className='flex items-start justify-between'>
                <div>
                  <DialogTitle className='text-xl font-bold'>
                    {template.template_name}
                  </DialogTitle>
                  <div className='text-muted-foreground mt-2 flex items-center gap-3 text-sm'>
                    <span className='bg-muted rounded-md px-2 py-0.5 font-medium'>
                      {template.email_type}
                    </span>
                    <span className='text-xl'>•</span>
                    <span className='font-mono text-xs font-medium'>
                      Subject:
                    </span>
                    <span className='text-foreground font-medium'>
                      {template.subject}
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            <div className='bg-muted/30 mt-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-md border'>
              <Tabs
                defaultValue='preview'
                className='flex min-h-0 w-full flex-1 flex-col'
              >
                <div className='bg-background z-10 flex shrink-0 items-center justify-between border-b px-4 py-2'>
                  <span className='text-muted-foreground text-sm font-semibold'>
                    Content Viewer
                  </span>
                  <TabsList className='bg-muted h-8 p-0.5'>
                    <TabsTrigger
                      value='preview'
                      className='data-[state=active]:bg-background data-[state=active] px-3 py-1 text-xs'
                    >
                      <LayoutTemplate className='mr-1.5 h-3.5 w-3.5' />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value='raw'
                      className='data-[state=active]:bg-background data-[state=active] px-3 py-1 text-xs'
                    >
                      <Code className='mr-1.5 h-3.5 w-3.5' />
                      Raw HTML
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent
                  value='preview'
                  className='m-0 min-h-0 flex-1 flex-col bg-gray-50/50 p-4 data-[state=active]:flex'
                >
                  <div className='relative flex-1 overflow-hidden rounded-md border bg-white'>
                    <iframe
                      srcDoc={template.email_body}
                      title={`${template.template_name} Preview`}
                      className='absolute inset-0 h-full w-full border-0 bg-white'
                      sandbox='allow-same-origin'
                    />
                  </div>
                </TabsContent>

                <TabsContent
                  value='raw'
                  className='m-0 min-h-0 flex-1 flex-col p-0 data-[state=active]:flex'
                >
                  <ScrollArea className='size-full flex-1'>
                    <div className='size-full p-4'>
                      <pre className='text-muted-foreground bg-card rounded-md border p-4 font-mono text-sm break-all whitespace-pre-wrap'>
                        {template.email_body}
                      </pre>
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className='mt-6 w-full flex-none items-center sm:justify-between'>
              <Button
                variant='outline'
                onClick={() => onOpenChange(false)}
                className='px-6'
                disabled={isApproving}
              >
                Cancel
              </Button>
              <div className='flex items-center gap-3'>
                <Button
                  variant='destructive'
                  className='px-6'
                  onClick={() => onOpenChange(false)}
                  disabled={isApproving}
                >
                  Reject
                </Button>
                <Button
                  className='bg-emerald-600 px-6 text-white hover:bg-emerald-700'
                  onClick={handleApprove}
                  disabled={isApproving || template.status === 'verified'}
                >
                  {isApproving ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Approving...
                    </>
                  ) : (
                    'Approve Template'
                  )}
                </Button>
              </div>
            </DialogFooter>
          </>
        ) : (
          <div className='text-muted-foreground flex flex-1 items-center justify-center'>
            Failed to load template.
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
