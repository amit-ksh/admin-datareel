'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck } from 'lucide-react'

import { ACCESS_ORGANISATION_TEST_IDS } from './test-ids'

interface UserDetails {
  name: string
  email: string
  role: string
  lastLogin: string
  status: 'active' | 'inactive'
}

interface UserDetailsCardProps {
  user: UserDetails
}

export function UserDetailsCard({ user }: UserDetailsCardProps) {
  return (
    <Card
      className='border'
      data-testid={ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.CONTAINER}
    >
      <CardContent>
        <div className='mb-4 flex items-center justify-between'>
          <span className='text-foreground text-lg font-semibold'>
            User Details
          </span>
          <Badge
            variant='outline'
            className='flex items-center gap-1.5 rounded-full border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-600'
          >
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-green-500' />
            ACTIVE
          </Badge>
        </div>

        <div className='grid grid-cols-2 gap-x-8 gap-y-4'>
          <div>
            <p className='text-muted-foreground mb-0.5 text-[11px] font-semibold tracking-wider uppercase'>
              Name
            </p>
            <p
              className='text-foreground text-sm font-semibold'
              data-testid={ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.NAME}
            >
              {user.name}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground mb-0.5 text-[11px] font-semibold tracking-wider uppercase'>
              Email
            </p>
            <p
              className='text-foreground text-sm font-semibold'
              data-testid={ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.EMAIL}
            >
              {user.email}
            </p>
          </div>
          <div>
            <p className='text-muted-foreground mb-0.5 text-[11px] font-semibold tracking-wider uppercase'>
              Role
            </p>
            <div className='flex items-center gap-1.5'>
              <ShieldCheck className='h-3.5 w-3.5 text-blue-500' />
              <span
                className='text-sm font-bold text-blue-600'
                data-testid={
                  ACCESS_ORGANISATION_TEST_IDS.USER_DETAILS_CARD.ROLE
                }
              >
                {user.role}
              </span>
            </div>
          </div>
          <div>
            <p className='text-muted-foreground mb-0.5 text-[11px] font-semibold tracking-wider uppercase'>
              Last Login
            </p>
            <p className='text-foreground text-sm font-semibold'>
              {user.lastLogin}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
