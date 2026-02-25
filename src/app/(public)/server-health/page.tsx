'use client'

import {
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Server,
  Database,
  Zap,
  Clock,
  Activity,
} from 'lucide-react'
import Image from 'next/image'
import {
  useGetAuthServiceHealth,
  useGetServerContainersHealth,
  useGetVideoServiceHealth,
} from '@/api/server-health'

const StatusPage = () => {
  const {
    data: authServiceHealth,
    isLoading: isAuthServiceLoading,
    refetch: refreshAuthService,
    isRefetching: isAuthServiceRefetching,
    dataUpdatedAt: authServiceDataUpdatedAt,
  } = useGetAuthServiceHealth()
  const {
    data: videoServiceHealth,
    isLoading: isVideoServiceLoading,
    refetch: refreshVideoService,
    isRefetching: isVideoServiceRefetching,
  } = useGetVideoServiceHealth()
  const {
    data: serverContainersHealth,
    isLoading: isServerContainersLoading,
    refetch: refreshServerContainers,
    isRefetching: isServerContainersRefetching,
  } = useGetServerContainersHealth()

  const authService = authServiceHealth?.data
  const videoService = videoServiceHealth?.data
  const containers = serverContainersHealth?.data

  const isLoading =
    Boolean(isAuthServiceLoading) ||
    Boolean(isVideoServiceLoading) ||
    Boolean(isServerContainersLoading)

  const isRefreshing =
    isAuthServiceRefetching ||
    isVideoServiceRefetching ||
    isServerContainersRefetching

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const getStatusColor = (status: string, state: string | null = null) => {
    if (status === 'running' && (state === 'healthy' || state === null))
      return 'text-green-500'
    if (status === 'running' && state !== 'healthy') return 'text-yellow-500'
    return 'text-red-500'
  }

  const getStatusIcon = (status: string, state: string | null = null) => {
    if (status === 'running' && (state === 'healthy' || state === null))
      return <CheckCircle className='h-5 w-5 text-green-500' />
    if (status === 'running' && state !== 'healthy')
      return <AlertCircle className='h-5 w-5 text-yellow-500' />
    return <XCircle className='h-5 w-5 text-red-500' />
  }

  const handleRefresh = () => {
    refreshAuthService()
    refreshVideoService()
    refreshServerContainers()
  }

  const overallStatus = () => {
    const allHealthy =
      Object.values(containers?.containers ?? {}).every(
        (container) =>
          container.status === 'running' && container.state === 'healthy',
      ) &&
      authService?.success &&
      videoService?.success

    return allHealthy ? 'operational' : 'degraded'
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        {/* Header: left brand + uptime, right service status + last-updated */}
        {isLoading ? (
          <div className='mb-8'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-6'>
                <div className='h-12 w-48 animate-pulse rounded bg-slate-200' />
                <div className='space-y-2'>
                  <div className='h-4 w-32 animate-pulse rounded bg-slate-200' />
                  <div className='h-3 w-40 animate-pulse rounded bg-slate-200' />
                </div>
              </div>

              <div className='space-y-2 text-right'>
                <div className='mx-auto h-5 w-32 animate-pulse rounded bg-slate-200' />
                <div className='mx-auto h-3 w-48 animate-pulse rounded bg-slate-200' />
              </div>
            </div>
          </div>
        ) : (
          <div className='mb-8'>
            <header className='flex items-center justify-between'>
              <div className='flex items-center gap-6'>
                <Image
                  src='/datareel/brand/logo-light.svg'
                  alt='datereel.ai logo'
                  width={240}
                  height={80}
                  className='object-contain'
                />
              </div>

              <div className='text-right'>
                <h2 className='text-xl font-semibold text-slate-800'>
                  Service status
                </h2>
                <div className='mt-1 flex items-center justify-end gap-3 text-sm text-slate-500'>
                  <div className='flex items-center gap-2'>
                    <Clock className='h-4 w-4' />
                    <span>
                      Last updated:{' '}
                      {authServiceDataUpdatedAt
                        ? new Date(
                            authServiceDataUpdatedAt,
                          ).toLocaleTimeString()
                        : '--'}
                    </span>
                  </div>
                  <div>|</div>
                  <div>
                    System Uptime: {formatUptime(containers?.uptime || 0)}
                  </div>
                </div>
              </div>
            </header>
          </div>
        )}

        {/* Overall Status Banner */}
        {isLoading ? (
          <div className='mb-8 rounded-xl border-2 p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div className='h-8 w-8 animate-pulse rounded bg-slate-200' />
                <div>
                  <div className='h-6 w-64 animate-pulse rounded bg-slate-200' />
                  <div className='mt-2 h-4 w-80 animate-pulse rounded bg-slate-200' />
                </div>
              </div>
              <div className='h-8 w-24 animate-pulse rounded bg-slate-200' />
            </div>
          </div>
        ) : (
          <div
            className={`mb-8 rounded-xl border-2 p-6 ${
              overallStatus() === 'operational'
                ? 'border-green-200 bg-green-50'
                : 'border-yellow-200 bg-yellow-50'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                {overallStatus() === 'operational' ? (
                  <CheckCircle className='h-8 w-8 text-green-600' />
                ) : (
                  <AlertCircle className='h-8 w-8 text-yellow-600' />
                )}
                <div>
                  <h2
                    className={`text-2xl font-semibold ${
                      overallStatus() === 'operational'
                        ? 'text-green-800'
                        : 'text-yellow-800'
                    }`}
                  >
                    {overallStatus() === 'operational'
                      ? 'All Systems Operational'
                      : 'Partial Outage'}
                  </h2>
                  <p
                    className={`${
                      overallStatus() === 'operational'
                        ? 'text-green-700'
                        : 'text-yellow-700'
                    }`}
                  >
                    {overallStatus() === 'operational'
                      ? 'All services are running normally'
                      : 'Some services may be experiencing issues'}
                  </p>
                </div>
              </div>
              <button
                onClick={handleRefresh}
                className='flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 transition-colors hover:bg-slate-50'
                disabled={isRefreshing}
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`}
                />
                Refresh
              </button>
            </div>
          </div>
        )}

        {/* Service Status Grid */}
        {isLoading ? (
          <div className='mb-8 grid gap-6 lg:grid-cols-2'>
            <div className='rounded-xl border border-slate-200 bg-white p-6'>
              <div className='mb-4 h-6 w-40 animate-pulse rounded bg-slate-200' />
              <div className='space-y-3'>
                <div className='h-4 w-full animate-pulse rounded bg-slate-200' />
                <div className='h-4 w-full animate-pulse rounded bg-slate-200' />
                <div className='h-4 w-3/4 animate-pulse rounded bg-slate-200' />
              </div>
            </div>
            <div className='rounded-xl border border-slate-200 bg-white p-6'>
              <div className='mb-4 h-6 w-40 animate-pulse rounded bg-slate-200' />
              <div className='space-y-3'>
                <div className='h-4 w-full animate-pulse rounded bg-slate-200' />
                <div className='h-4 w-full animate-pulse rounded bg-slate-200' />
                <div className='h-4 w-3/4 animate-pulse rounded bg-slate-200' />
              </div>
            </div>
          </div>
        ) : (
          <div className='mb-8 grid gap-6 lg:grid-cols-2'>
            {/* Auth Service */}
            <div className='rounded-xl border border-slate-200 bg-white p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Server className='h-6 w-6 text-blue-600' />
                  <h3 className='text-xl font-semibold text-slate-800'>
                    Auth Service
                  </h3>
                </div>
                {getStatusIcon(
                  authService?.success ? 'running' : 'stopped',
                  'healthy',
                )}
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Application:</span>
                  <span className='font-medium text-slate-800'>
                    {authService?.app}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Version:</span>
                  <span className='font-medium text-slate-800'>
                    {authService?.version}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Uptime:</span>
                  <span className='font-medium text-slate-800'>
                    {formatUptime(authService?.uptime || 0)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Mode:</span>
                  <span className='inline-flex rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800'>
                    {authService?.mode}
                  </span>
                </div>

                <div className='border-t border-slate-200 pt-3'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='flex items-center gap-2'>
                      <Database className='h-4 w-4' />
                      <span className='text-sm text-slate-600'>Database</span>
                      {authService?.database_connected ? (
                        <CheckCircle className='h-4 w-4 text-green-500' />
                      ) : (
                        <XCircle className='h-4 w-4 text-red-500' />
                      )}
                    </div>
                    <div className='flex items-center gap-2'>
                      <Zap className='h-4 w-4' />
                      <span className='text-sm text-slate-600'>Redis</span>
                      {authService?.redis_connected ? (
                        <CheckCircle className='h-4 w-4 text-green-500' />
                      ) : (
                        <XCircle className='h-4 w-4 text-red-500' />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Service */}
            <div className='rounded-xl border border-slate-200 bg-white p-6'>
              <div className='mb-4 flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <Server className='h-6 w-6 text-purple-600' />
                  <h3 className='text-xl font-semibold text-slate-800'>
                    Video Service
                  </h3>
                </div>
                {getStatusIcon(
                  videoService?.success ? 'running' : 'stopped',
                  'healthy',
                )}
              </div>

              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Application:</span>
                  <span className='font-medium text-slate-800'>
                    {videoService?.app}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Version:</span>
                  <span className='font-medium text-slate-800'>
                    {videoService?.version}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Uptime:</span>
                  <span className='font-medium text-slate-800'>
                    {formatUptime(videoService?.uptime || 0)}
                  </span>
                </div>
                <div className='flex items-center justify-between'>
                  <span className='text-slate-600'>Mode:</span>
                  <span className='inline-flex rounded-full bg-purple-100 px-2 py-1 text-xs font-semibold text-purple-800'>
                    {videoService?.mode}
                  </span>
                </div>

                <div className='border-t border-slate-200 pt-3'>
                  <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                    <div className='flex items-center gap-2'>
                      <Database className='h-4 w-4' />
                      <span className='text-sm text-slate-600'>Database</span>
                      {videoService?.database_connected ? (
                        <CheckCircle className='h-4 w-4 text-green-500' />
                      ) : (
                        <XCircle className='h-4 w-4 text-red-500' />
                      )}
                    </div>

                    <div className='flex items-center gap-2'>
                      <Zap className='h-4 w-4' />
                      <span className='text-sm text-slate-600'>Redis</span>
                      {videoService?.redis_connected ? (
                        <CheckCircle className='h-4 w-4 text-green-500' />
                      ) : (
                        <XCircle className='h-4 w-4 text-red-500' />
                      )}
                    </div>

                    <div className='flex items-center gap-2'>
                      <Server className='h-4 w-4' />
                      <span className='text-sm text-slate-600'>
                        GPU Instance
                      </span>
                      {videoService?.gpu_instance_status === 'running' ? (
                        <CheckCircle className='h-4 w-4 text-green-500' />
                      ) : videoService?.gpu_instance_status ? (
                        <XCircle className='h-4 w-4 text-red-500' />
                      ) : (
                        <AlertCircle className='h-4 w-4 text-yellow-500' />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Container Status */}
        {isLoading ? (
          <div className='rounded-xl border border-slate-200 bg-white p-6'>
            <div className='mb-6 flex items-center gap-3'>
              <div className='h-6 w-6 animate-pulse rounded bg-slate-200' />
              <div className='h-6 w-40 animate-pulse rounded bg-slate-200' />
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='rounded-lg border border-slate-200 p-4'>
                  <div className='mb-2 flex items-center justify-between'>
                    <div className='h-4 w-32 animate-pulse rounded bg-slate-200' />
                    <div className='h-4 w-4 animate-pulse rounded bg-slate-200' />
                  </div>
                  <div className='space-y-2 text-sm'>
                    <div className='h-3 w-full animate-pulse rounded bg-slate-200' />
                    <div className='h-3 w-3/4 animate-pulse rounded bg-slate-200' />
                    <div className='h-3 w-1/2 animate-pulse rounded bg-slate-200' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className='rounded-xl border border-slate-200 bg-white p-6'>
            <div className='mb-6 flex items-center gap-3'>
              <Activity className='h-6 w-6 text-green-600' />
              <h3 className='text-xl font-semibold text-slate-800'>
                Container Status
              </h3>
              <span className='text-sm text-slate-500'>
                ({Object.keys(containers?.containers ?? {}).length} containers)
              </span>
            </div>

            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
              {Object.entries(containers?.containers ?? {}).map(
                ([name, container]) => (
                  <div
                    key={name}
                    className='rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-sm'
                  >
                    <div className='mb-2 flex items-center justify-between'>
                      <h4 className='font-medium text-slate-800 capitalize'>
                        {name.replace(/_/g, ' ')}
                      </h4>
                      {getStatusIcon(container.status, container.state)}
                    </div>

                    <div className='space-y-2 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-slate-600'>Status:</span>
                        <span
                          className={`font-medium capitalize ${getStatusColor(container.status, container.state)}`}
                        >
                          {container.status}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-slate-600'>State:</span>
                        <span
                          className={`font-medium capitalize ${getStatusColor(container.status, container.state)}`}
                        >
                          {container.state}
                        </span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-slate-600'>Restarts:</span>
                        <span className='font-medium text-slate-800'>
                          {container.restart_count}
                        </span>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatusPage
