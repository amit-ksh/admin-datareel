export type ServiceContainerKeys =
  | 'auth_service'
  | 'video_service'
  | 'lip_sync_consumer'
  | 'presentation_consumer'
  | 'content_consumer'
  | 'redis'
  | 'nginx'

export type ServerContainersHealthResponse = {
  app: string
  mode: string
  status: number
  success: boolean
  uptime: number
  version: string
  containers: {
    [K in ServiceContainerKeys]: {
      status: 'healthy' | 'unhealthy' | 'running'
      state: 'healthy' | 'unhealthy'
      restart_count: number
      health: unknown
    }
  }
}

export type AuthServerContainersHealthResponse = {
  app: string
  database_connected: boolean
  mode: string
  redis_connected: boolean
  status: number
  success: boolean
  uptime: number
  version: string
}

export type VideoServerContainersHealthResponse = {
  app: string
  bhashini_lock_present: string
  clone_consumer_lock: string
  database_connected: boolean
  gpu_instance_status: string
  gpu_server_lock_present: string
  kafka_consumer_running: boolean
  kafka_producer_initialized: boolean
  latentsync_lock_present: string
  mode: string
  pipeline_semaphore_count: number
  redis_connected: boolean
  status: number
  success: boolean
  uptime: number
  version: string
}

export type SERVICE_IMPACT_TYPE = {
  label: string
  impacts: string[]
}

export type ServiceImpactMap = Record<string, SERVICE_IMPACT_TYPE>
