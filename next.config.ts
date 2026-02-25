import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? 'build' : '.next',
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_NODE_ENV === 'dev' ? false : true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.datareel.ai',
      },
      {
        protocol: 'https',
        hostname: 'assistant-app-uat-video-pipeline-s3.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'assistant-app-video-pipeline-s3.s3.amazonaws.com',
      },
    ],
  },
}

export default nextConfig
