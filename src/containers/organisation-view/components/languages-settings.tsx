import { useState } from 'react'
import { Globe2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useOrganisationView } from '../use-organisation-view.hook'

export function LanguagesSettings() {
  const { isUpdating } = useOrganisationView()
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // Implement save logic here when API is ready
    setIsEditing(false)
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
              <Globe2 className='h-5 w-5 text-blue-500' />
              Languages
            </CardTitle>
            <CardDescription>
              Supported languages for video generation and localization in this
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
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          <Badge variant='secondary' className='px-3 py-1'>
            English (US)
          </Badge>
          <Badge variant='secondary' className='px-3 py-1'>
            English (UK)
          </Badge>
          <Badge variant='secondary' className='px-3 py-1'>
            Spanish (Spain)
          </Badge>
          <Badge variant='secondary' className='px-3 py-1'>
            French (France)
          </Badge>
          <Badge variant='secondary' className='px-3 py-1'>
            German
          </Badge>
          {isEditing && (
            <Badge
              variant='outline'
              className='hover:bg-muted text-muted-foreground cursor-pointer border-dashed px-3 py-1'
            >
              + Add Language
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
