import { useState } from 'react'
import { Zap } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useOrganisationView } from '../use-organisation-view.hook'

export function FeaturesSettings() {
  const { organisation, updateOrganisation, isUpdating } = useOrganisationView()
  const [isEditing, setIsEditing] = useState(false)

  const [settings, setSettings] = useState({
    enable_content_ai: false,
    enable_avatar_ai: false,
    enable_hls: false,
    enable_cdn: false,
  })

  const handleEdit = () => {
    if (organisation) {
      setSettings({
        enable_content_ai: organisation.enable_content_ai,
        enable_avatar_ai: organisation.enable_avatar_ai,
        enable_hls: organisation.enable_hls,
        enable_cdn: organisation.enable_cdn,
      })
    }
    setIsEditing(true)
  }

  const handleSave = () => {
    updateOrganisation(
      {
        enable_content_ai: settings.enable_content_ai,
        enable_avatar_ai: settings.enable_avatar_ai,
        enable_hls: settings.enable_hls,
        enable_cdn: settings.enable_cdn,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    )
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Zap className='h-5 w-5 text-blue-500' />
              Settings
            </CardTitle>
            <CardDescription>
              Manage beta features and specific module access for this
              organization.
            </CardDescription>
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            {isEditing ? (
              <>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleCancel}
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button size='sm' onClick={handleSave} disabled={isUpdating}>
                  {isUpdating ? 'Saving…' : 'Save'}
                </Button>
              </>
            ) : (
              <Button
                variant='outline'
                size='sm'
                onClick={handleEdit}
                disabled={!organisation}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Content AI</Label>
            <p className='text-muted-foreground text-sm'>
              Enable AI-powered video generation and text-to-speech features.
            </p>
          </div>
          <Switch
            checked={settings.enable_content_ai}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, enable_content_ai: checked }))
            }
            disabled={!isEditing}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Avatar AI</Label>
            <p className='text-muted-foreground text-sm'>
              Allow creation and usage of custom AI avatars.
            </p>
          </div>
          <Switch
            checked={settings.enable_avatar_ai}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, enable_avatar_ai: checked }))
            }
            disabled={!isEditing}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>HLS & CDN</Label>
            <p className='text-muted-foreground text-sm'>
              Enable high-performance streaming and content delivery network.
            </p>
          </div>
          <Switch
            checked={settings.enable_hls && settings.enable_cdn}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({
                ...prev,
                enable_hls: checked,
                enable_cdn: checked,
              }))
            }
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  )
}
