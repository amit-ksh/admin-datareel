import axios from 'axios'

const API_VERSION = {
  V1: `api/v1`,
  V2: `api/v2`,
}

export const PublicAxiosWithoutVersion = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

export const VideoAxiosWithoutVersion = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIDEO_API_BASE_URL,
})

export const PublicAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + API_VERSION.V1,
  withCredentials: true,
})

export const PrivateAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + API_VERSION.V1,
  withCredentials: true,
})
