'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Search, Mail } from 'lucide-react'

import { ACCESS_ORGANISATION_TEST_IDS } from './test-ids'

interface EmailSearchCardProps {
  email: string
  onEmailChange: (value: string) => void
  onFetch: () => void
  loading?: boolean
}

export function EmailSearchCard({
  email,
  onEmailChange,
  onFetch,
  loading,
}: EmailSearchCardProps) {
  return (
    <Card
      className='border'
      data-testid={ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.CONTAINER}
    >
      <CardContent className='flex flex-col gap-4'>
        <div className='grid gap-2'>
          <Label
            htmlFor='user-email'
            className='text-foreground text-sm font-medium'
          >
            User Email
          </Label>
          <div className='relative'>
            <Mail className='text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
            <Input
              id='user-email'
              type='email'
              placeholder='name@company.com'
              className='pl-9'
              disabled={loading}
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onFetch()}
              data-testid={ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.INPUT}
            />
          </div>
        </div>
        <Button
          className='w-full bg-blue-600 font-medium text-white hover:bg-blue-700'
          onClick={onFetch}
          disabled={loading || !email.trim()}
          data-testid={
            ACCESS_ORGANISATION_TEST_IDS.EMAIL_SEARCH_CARD.SUBMIT_BUTTON
          }
        >
          <Search className='mr-2 h-4 w-4' />
          {loading ? 'Fetching...' : 'Fetch Organisations'}
        </Button>
      </CardContent>
    </Card>
  )
}
