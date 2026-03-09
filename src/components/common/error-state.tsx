'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShieldAlert,
  Ban,
  SearchX,
  WifiOff,
  AlertTriangle,
  ServerCrash,
  RefreshCw,
  ClipboardCheck,
  Copy,
  ExternalLink,
  ChevronUp,
  ChevronDown,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { AxiosError } from 'axios'

function normalizeError(err: AxiosError) {
  if (!err) return { code: 'UNKNOWN', message: 'Something went wrong.' }

  // axios-like
  const status = err?.response?.status ?? err?.status
  const data = err?.response?.data as Record<string, unknown>
  const message =
    data?.message || err?.message || data?.error || 'Something went wrong.'

  const requestId =
    err?.response?.headers?.['x-request-id'] ||
    err?.response?.headers?.['request-id'] ||
    data?.requestId

  return {
    code: status ?? 'UNKNOWN',
    message,
    raw: err,
    requestId,
    sessionId: data?.sessionId,
    resourceId: data?.resourceId,
    extension: data?.extension,
    content: data?.content,
  }
}

const presets = {
  401: {
    title: 'Authentication required',
    Icon: ShieldAlert,
    hint: 'Sign in and try again.',
  },
  403: {
    title: 'No access',
    Icon: Ban,
    hint: 'You don’t have permission to view this.',
  },
  404: {
    title: 'Not found',
    Icon: SearchX,
    hint: 'The resource may have been moved or deleted.',
  },
  408: {
    title: 'Request timeout',
    Icon: WifiOff,
    hint: 'Network seems slow. Retry in a moment.',
  },
  429: {
    title: 'Too many requests',
    Icon: AlertTriangle,
    hint: "You've hit a rate limit. Please wait and retry.",
  },
  500: {
    title: 'Server error',
    Icon: ServerCrash,
    hint: 'Our server had an issue. Try again shortly.',
  },
  NETWORK: {
    title: 'Network error',
    Icon: WifiOff,
    hint: 'Check your connection and try again.',
  },
  UNKNOWN: {
    title: 'Something went wrong',
    Icon: AlertTriangle,
    hint: 'Please try again.',
  },
} as const

type PresetKey = keyof typeof presets

interface ErrorStateProps {
  error?: AxiosError
  title?: string
  description?: string
  onRetry?: () => void
  primaryAction?: {
    href?: string
    label: string
    onClick?: () => void
  }
  details?: Record<string, unknown>
  className?: string
}

export default function ErrorState({
  error,
  title,
  description,
  onRetry,
  primaryAction,
  details,
  className,
}: ErrorStateProps) {
  const router = useRouter()
  const [copiedAll, setCopiedAll] = useState(false)
  const [open, setOpen] = useState(true)

  const norm = useMemo(() => normalizeError(error as AxiosError), [error])

  const key =
    typeof norm.code === 'number'
      ? norm.code
      : norm.code === 'NETWORK'
        ? 'NETWORK'
        : 'UNKNOWN'

  const preset = presets[key as PresetKey] || presets.UNKNOWN
  const Icon = preset.Icon

  const summary = useMemo(
    () => ({
      'Error code': norm.code ?? '—',
      Message: norm.message ?? '—',
      Content: norm.content ?? '—',
      Timestamp: new Date().toISOString(),
      ...(details || {}),
    }),
    [norm, details],
  )

  const copyAll = async () => {
    const text = Object.entries(summary)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n')
    await navigator.clipboard.writeText(text)
    setCopiedAll(true)
    toast.success('Copied to clipboard', {
      id: 'copy-all-error-details',
    })
    setTimeout(() => setCopiedAll(false), 1200)
  }

  return (
    <div
      className={cn('flex w-full items-center justify-center p-6', className)}
    >
      <div className='w-full max-w-3xl rounded-xl border bg-white p-6 shadow-sm'>
        <div className='flex items-start gap-4'>
          <div className='flex size-12 items-center justify-center rounded-full border bg-gray-50'>
            <Icon className='size-6 text-gray-600' />
          </div>
          <div className='flex-1'>
            <div className='flex items-start justify-between gap-2'>
              <div>
                <div className='flex items-center gap-2'>
                  <h2 className='text-lg font-semibold'>
                    {title || preset.title}
                  </h2>
                  {onRetry && (
                    <button
                      type='button'
                      onClick={onRetry}
                      className={buttonVariants({
                        variant: 'ghost',
                        className: 'inline-flex items-center gap-2',
                      })}
                    >
                      <RefreshCw className='size-4' />
                      Retry
                    </button>
                  )}
                </div>
                <p className='mt-1 text-sm text-gray-600'>
                  {description || preset.hint}
                </p>
              </div>

              <button
                type='button'
                onClick={copyAll}
                className={cn(
                  'inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-gray-600 hover:bg-gray-50',
                )}
                title='Copy error details'
              >
                {copiedAll ? (
                  <>
                    <ClipboardCheck className='size-3.5' />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className='size-3.5' />
                    Copy
                  </>
                )}
              </button>
            </div>

            <div className='mt-4 flex flex-wrap items-center gap-2'>
              {primaryAction?.href ? (
                <Link
                  href={primaryAction.href}
                  className={buttonVariants({
                    className: 'inline-flex items-center gap-2',
                  })}
                >
                  {primaryAction.label}
                  <ExternalLink className='size-4' />
                </Link>
              ) : primaryAction?.onClick ? (
                <button
                  type='button'
                  onClick={primaryAction.onClick}
                  className={buttonVariants({
                    className: 'inline-flex items-center gap-2',
                  })}
                >
                  {primaryAction.label}
                </button>
              ) : (
                <button
                  type='button'
                  onClick={() => router.back()}
                  className={buttonVariants({
                    className: 'inline-flex items-center gap-2',
                  })}
                >
                  Go back
                </button>
              )}
            </div>

            <div className='mt-6 rounded-lg border bg-gray-50'>
              <button
                type='button'
                className='flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-700'
                onClick={() => setOpen((v) => !v)}
              >
                <span className='font-medium'>Summary</span>
                {open ? (
                  <ChevronUp className='size-4' />
                ) : (
                  <ChevronDown className='size-4' />
                )}
              </button>
              {open && (
                <div className='grid grid-cols-1 gap-3 border-t p-3 sm:grid-cols-2'>
                  {Object.entries(summary).map(([k, v]) => (
                    <div
                      key={k}
                      className='rounded-md bg-white p-3 shadow-sm ring-1 ring-gray-100'
                    >
                      <div className='flex items-center justify-between'>
                        <span className='text-xs font-medium text-gray-500'>
                          {k}
                        </span>
                        {v && v !== '—' && (
                          <button
                            type='button'
                            title='Copy'
                            className='text-gray-400 hover:text-gray-600'
                            onClick={() => {
                              navigator.clipboard.writeText(String(v))
                              toast.success(
                                `Copied to clipboard - ${String(k)}`,
                                {
                                  id: `copy-error-detail-${k}`,
                                },
                              )
                            }}
                          >
                            <Copy className='size-3.5' />
                          </button>
                        )}
                      </div>
                      <div className='mt-1 truncate text-sm text-gray-900'>
                        {String(v)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
