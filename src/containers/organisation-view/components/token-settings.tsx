'use client'

import { useState } from 'react'
import { Coins } from 'lucide-react'
import { useParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { useGetOrgTokenBalance, useUpdateOrgTokens } from '@/api/organisation'

export function TokenSettings() {
  const { organisationId } = useParams()
  const orgId = organisationId as string

  const { data: balance, isLoading } = useGetOrgTokenBalance(orgId)
  const { mutate: updateTokens, isPending } = useUpdateOrgTokens(orgId)

  const [isEditing, setIsEditing] = useState(false)
  const [totalTokens, setTotalTokens] = useState<number>(0)
  const [infiniteTokens, setInfiniteTokens] = useState<boolean>(false)
  const [resetUsed, setResetUsed] = useState<boolean>(false)

  const handleEdit = () => {
    setTotalTokens(balance?.total_tokens ?? 0)
    setInfiniteTokens(balance?.infinite_tokens ?? false)
    setResetUsed(false)
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setResetUsed(false)
  }

  const handleSave = () => {
    updateTokens(
      {
        total_tokens: infiniteTokens ? undefined : totalTokens,
        infinite_tokens: infiniteTokens,
        reset_used: resetUsed,
      },
      { onSuccess: () => setIsEditing(false) },
    )
  }

  const usedPercent =
    balance && !balance.infinite_tokens && balance.total_tokens > 0
      ? Math.min(
          100,
          Math.round((balance.used_tokens / balance.total_tokens) * 100),
        )
      : 0

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Coins className='h-5 w-5 text-amber-500' />
              Token Management
            </CardTitle>
            <CardDescription className='mt-1'>
              Control video generation token allocation for this organisation.
            </CardDescription>
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            {isEditing ? (
              <>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleCancel}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button size='sm' onClick={handleSave} disabled={isPending}>
                  {isPending ? 'Saving…' : 'Save'}
                </Button>
              </>
            ) : (
              <Button
                variant='outline'
                size='sm'
                onClick={handleEdit}
                disabled={isLoading}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-6'>
        {isLoading ? (
          <div className='text-muted-foreground text-sm'>
            Loading token data…
          </div>
        ) : !balance ? (
          <div className='text-muted-foreground text-sm'>
            Could not load token data.
          </div>
        ) : isEditing ? (
          /* ── Edit mode ── */
          <div className='space-y-5'>
            {/* Infinite toggle */}
            <div className='flex items-center justify-between'>
              <div className='space-y-0.5'>
                <Label className='text-base font-medium'>
                  Unlimited tokens
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Organisation can generate videos without a token limit.
                </p>
              </div>
              <Switch
                checked={infiniteTokens}
                onCheckedChange={setInfiniteTokens}
              />
            </div>

            {/* Total tokens input — hidden when infinite */}
            {!infiniteTokens && (
              <div className='space-y-1.5'>
                <Label htmlFor='total-tokens' className='text-base font-medium'>
                  Total token allocation
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Number of videos this organisation can generate.
                </p>
                <Input
                  id='total-tokens'
                  type='number'
                  min={0}
                  value={totalTokens}
                  onChange={(e) => setTotalTokens(Number(e.target.value))}
                  className='max-w-xs'
                />
              </div>
            )}

            {/* Reset used */}
            <div className='flex items-start gap-3'>
              <Checkbox
                id='reset-used'
                checked={resetUsed}
                onCheckedChange={(checked) => setResetUsed(checked === true)}
                className='mt-0.5'
              />
              <div className='space-y-0.5'>
                <Label
                  htmlFor='reset-used'
                  className='cursor-pointer text-base font-medium'
                >
                  Reset consumed tokens
                </Label>
                <p className='text-muted-foreground text-sm'>
                  Set used tokens back to 0 (cannot be undone).
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ── View mode ── */
          <div className='space-y-4'>
            {balance.infinite_tokens ? (
              <div className='flex items-center gap-3'>
                <Badge className='border-0 bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'>
                  Unlimited
                </Badge>
                <span className='text-muted-foreground text-sm'>
                  This organisation has unlimited video generation tokens.
                </span>
              </div>
            ) : (
              <>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Used</span>
                  <span className='font-medium'>
                    {balance.used_tokens.toLocaleString()} /{' '}
                    {balance.total_tokens.toLocaleString()} tokens
                  </span>
                </div>
                <Progress value={usedPercent} className='h-2' />
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>Remaining</span>
                  <span className='font-semibold'>
                    {(balance.remaining_tokens ?? 0).toLocaleString()} tokens
                  </span>
                </div>
                {balance.total_tokens === 0 && (
                  <Badge
                    variant='outline'
                    className='text-muted-foreground border-dashed'
                  >
                    No tokens allocated
                  </Badge>
                )}
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
