import { useState } from 'react'
import { UserCircle } from 'lucide-react'
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

export function PersonaOnboardingSettings() {
  const { organisation, updateOrganisation, isUpdating } = useOrganisationView()
  const [isEditing, setIsEditing] = useState(false)

  const [settings, setSettings] = useState({
    require_thumbnail: false,
    require_video: false,
    require_audio: false,
  })

  const handleEdit = () => {
    if (organisation?.persona_onboarding_config) {
      setSettings({
        require_thumbnail:
          organisation.persona_onboarding_config.require_thumbnail,
        require_video: organisation.persona_onboarding_config.require_video,
        require_audio: organisation.persona_onboarding_config.require_audio,
      })
    }
    setIsEditing(true)
  }

  const handleSave = () => {
    updateOrganisation(
      {
        persona_onboarding_config: {
          require_thumbnail: settings.require_thumbnail,
          require_video: settings.require_video,
          require_audio: settings.require_audio,
        },
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
              <UserCircle className='h-5 w-5 text-blue-500' />
              Persona Onboarding Settings
            </CardTitle>
            <CardDescription>
              Configure content requirements and guidelines for user persona
              onboarding.
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
            <Label className='text-base font-medium'>Profile Picture</Label>
            <p className='text-muted-foreground text-sm'>
              Require profile picture during persona onboarding
            </p>
          </div>
          <Switch
            checked={settings.require_thumbnail}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, require_thumbnail: checked }))
            }
            disabled={!isEditing}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Video</Label>
            <p className='text-muted-foreground text-sm'>
              Require video during persona onboarding
            </p>
          </div>
          <Switch
            checked={settings.require_video}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, require_video: checked }))
            }
            disabled={!isEditing}
          />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Audio</Label>
            <p className='text-muted-foreground text-sm'>
              Require audio during persona onboarding
            </p>
          </div>
          <Switch
            checked={settings.require_audio}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, require_audio: checked }))
            }
            disabled={!isEditing}
          />
        </div>
      </CardContent>
    </Card>
  )
}
