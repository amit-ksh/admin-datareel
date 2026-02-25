import { UserCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface PersonaOnboardingSettingsProps {
  isEditing: boolean
}

export function PersonaOnboardingSettings({
  isEditing,
}: PersonaOnboardingSettingsProps) {
  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <UserCircle className='h-5 w-5 text-blue-500' />
          Persona Onboarding Settings
        </CardTitle>
        <CardDescription>
          Configure content requirements and guidelines for user persona
          onboarding.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Profile Picture</Label>
            <p className='text-muted-foreground text-sm'>
              Require profile picture during persona onboarding
            </p>
          </div>
          <Switch defaultChecked disabled={!isEditing} />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Video</Label>
            <p className='text-muted-foreground text-sm'>
              Require video during persona onboarding
            </p>
          </div>
          <Switch defaultChecked disabled={!isEditing} />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Audio</Label>
            <p className='text-muted-foreground text-sm'>
              Require audio during persona onboarding
            </p>
          </div>
          <Switch defaultChecked disabled={!isEditing} />
        </div>
      </CardContent>
    </Card>
  )
}
