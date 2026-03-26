import { Zap } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface FeaturesSettingsProps {
  isEditing: boolean
}

export function FeaturesSettings({ isEditing }: FeaturesSettingsProps) {
  return (
    <Card>
      <CardHeader className='pb-4'>
        <CardTitle className='flex items-center gap-2 text-lg'>
          <Zap className='h-5 w-5 text-blue-500' />
          Settings
        </CardTitle>
        <CardDescription>
          Manage beta features and specific module access for this organization.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Content AI</Label>
            <p className='text-muted-foreground text-sm'>
              Enable AI-powered video generation and text-to-speech features.
            </p>
          </div>
          <Switch defaultChecked disabled={!isEditing} />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Avatar AI</Label>
            <p className='text-muted-foreground text-sm'>
              Allow creation and usage of custom AI avatars.
            </p>
          </div>
          <Switch defaultChecked disabled={!isEditing} />
        </div>

        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>HLS & CDN</Label>
            <p className='text-muted-foreground text-sm'>
              Enable high-performance streaming and content delivery network.
            </p>
          </div>
          <Switch defaultChecked disabled={!isEditing} />
        </div>
      </CardContent>
    </Card>
  )
}
