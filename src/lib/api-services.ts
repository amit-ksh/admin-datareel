export const SERVICE_IMPACT_MAP = {
  auth_service: {
    label: "Authentication",
    impacts: ["Login", "Forgot password", "Email verification"],
  },
  video_service: {
    label: "Video Engine",
    impacts: ["Video generation", "Asset uploads", "Project workflows"],
  },
  lip_sync_consumer: {
    label: "Lip Sync Processing",
    impacts: ["Video creation (Lip Sync for  Talking Avatar / Content PiP )"],
  },
  presentation_consumer: {
    label: "Scene/Slide Rendering",
    impacts: ["Video creation (Bullets points / Charts / Custom HTML)"],
  },
  content_consumer: {
    label: "Content Processing",
    impacts: ["Video creation (Content Video)"],
  },
  redis: {
    label: "Realtime Cache Layer",
    impacts: ["Performance & responsiveness", "Session/state caching"],
  },
  nginx: {
    label: "Edge Gateway",
    impacts: ["Static delivery", "Request routing"],
  },
} as const;

export type ServiceKey = keyof typeof SERVICE_IMPACT_MAP;
export type ServiceImpactMap = typeof SERVICE_IMPACT_MAP;
