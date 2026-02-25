import { QUERY_KEYS } from '@/lib/query-keys'
import {
  AuthServerContainersHealthResponse,
  ServerContainersHealthResponse,
  VideoServerContainersHealthResponse,
} from '@/types/service-health'
import { useQuery } from '@tanstack/react-query'
import { PublicAxiosWithoutVersion, VideoAxiosWithoutVersion } from '.'

const getAuthServiceHealth = () => {
  return PublicAxiosWithoutVersion.get<AuthServerContainersHealthResponse>(
    '/health',
  )
}

export const useGetAuthServiceHealth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.AUTH_HEALTH_SERVICE],
    queryFn: getAuthServiceHealth,
  })
}

const getVideoServiceHealth = () => {
  return VideoAxiosWithoutVersion.get<VideoServerContainersHealthResponse>(
    '/health',
  )
}

export const useGetVideoServiceHealth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.VIDEO_HEALTH_SERVICE],
    queryFn: getVideoServiceHealth,
  })
}

const getServerContainersHealth = () => {
  return VideoAxiosWithoutVersion.get<ServerContainersHealthResponse>(
    '/health/containers',
  )
}

export const useGetServerContainersHealth = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SERVER_CONTAINERS_HEALTH],
    queryFn: getServerContainersHealth,
  })
}
