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
import { Eye, CheckCircle, XCircle, Code, LayoutTemplate } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

interface EmailTemplate {
  id: string
  orgName: string
  orgLogoUrl?: string
  orgColorClass: string
  templateName: string
  type: string
  subject: string
  status: 'verified' | 'pending' | 'rejected'
  htmlBody: string
}

const dummyData: EmailTemplate[] = [
  {
    id: 'tpl-1',
    orgName: 'Acme org',
    orgLogoUrl: '',
    orgColorClass: 'bg-blue-500 text-white',
    templateName: 'Welcome Email',
    type: 'Onboarding',
    subject: 'Welcome to Acme Corp!',
    status: 'verified',
    htmlBody: `<!DOCTYPE html>\n<html>\n<body style="font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #f9f9f9;">\n<h1 style="color: #333;">Welcome!</h1>\n<p>We are thrilled to have you here.</p>\n<button style="background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer;">Get Started</button>\n</body>\n</html>`,
  },
  {
    id: 'tpl-2',
    orgName: 'Vertex AI',
    orgLogoUrl: '',
    orgColorClass: 'bg-emerald-500 text-white',
    templateName: 'Password Reset',
    type: 'Security',
    subject: 'Reset your password',
    status: 'pending',
    htmlBody: `<!DOCTYPE html>\n<html><body style="font-family: Arial, sans-serif; text-align: center; padding: 40px;"><h2 style="color: #d9534f;">Password Reset Request</h2><p>Click the link below to reset your password.</p><a href="#" style="color: #007bff; font-weight: bold;">Reset Password</a></body></html>`,
  },
  {
    id: 'tpl-3',
    orgName: 'Skyline Corp',
    orgLogoUrl: '',
    orgColorClass: 'bg-orange-500 text-white',
    templateName: 'Monthly Newsletter',
    type: 'Marketing',
    subject: 'Your October Update from Skyline',
    status: 'rejected',
    htmlBody: `<!DOCTYPE html><html><body style="font-family: Arial, sans-serif; padding: 20px;"><div style="background: #eee; padding: 20px; border-radius: 8px;"><h3>Monthly Updates</h3><p>Here is what happened this month...</p></div></body></html>`,
  },
]

export function EmailTemplatesTable() {
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  const handleReviewClick = (template: EmailTemplate) => {
    setSelectedTemplate(template)
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
      case 'pending':
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
              {dummyData.map((tpl) => (
                <TableRow key={tpl.id} className='h-20'>
                  <TableCell className='pl-6'>
                    <div className='flex items-center gap-3'>
                      <Avatar className='h-10 w-10 border-none'>
                        <AvatarImage src={tpl.orgLogoUrl} alt={tpl.orgName} />
                        <AvatarFallback
                          className={`${tpl.orgColorClass} text-sm font-semibold`}
                        >
                          {tpl.orgName.substring(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                      <div className='flex flex-col'>
                        <span className='text-foreground text-sm font-bold'>
                          {tpl.orgName}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='text-foreground font-medium'>
                    {tpl.templateName}
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
                      onClick={() => handleReviewClick(tpl)}
                      className='border-primary/20 hover:bg-primary/5 text-primary'
                    >
                      <Eye className='mr-2 h-4 w-4' />
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <TablePagination
            currentPage={1}
            pageSize={3}
            totalItems={dummyData.length}
            entityName='templates'
            className='border-t'
          />
        </CardContent>
      </Card>

      <ReviewTemplateDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        template={selectedTemplate}
      />
    </>
  )
}

function ReviewTemplateDialog({
  open,
  onOpenChange,
  template,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: EmailTemplate | null
}) {
  if (!template) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-[95vh] w-full flex-col overflow-hidden p-6 sm:h-[90vh] sm:max-w-6xl'>
        <DialogHeader className='flex-none'>
          <div className='flex items-start justify-between'>
            <div>
              <DialogTitle className='text-xl font-bold'>
                {template.templateName}
              </DialogTitle>
              <div className='text-muted-foreground mt-2 flex items-center gap-3 text-sm'>
                <span className='bg-muted rounded-md px-2 py-0.5 font-medium'>
                  {template.type}
                </span>
                <span className='text-xl'>•</span>
                <span className='font-mono text-xs font-medium'>Subject:</span>
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
                  srcDoc={template.htmlBody}
                  title={`${template.templateName} Preview`}
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
                    {template.htmlBody}
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
          >
            Cancel
          </Button>
          <div className='flex items-center gap-3'>
            <Button
              variant='destructive'
              className='px-6'
              onClick={() => onOpenChange(false)}
            >
              Reject
            </Button>
            <Button
              className='bg-emerald-600 px-6 text-white hover:bg-emerald-700'
              onClick={() => onOpenChange(false)}
            >
              Approve Template
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
