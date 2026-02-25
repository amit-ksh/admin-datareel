import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { FeaturesSettings } from './features-settings'
import { LanguagesSettings } from './languages-settings'
import { PersonaOnboardingSettings } from './persona-onboarding-settings'
import { DangerZone } from './danger-zone'

export function OrganisationOverview() {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Implement cancel logic here
    setIsEditing(false)
  }

  return (
    <div className='space-y-6'>
      <div className='mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h2 className='text-lg font-bold tracking-tight'>Overview</h2>
          <p className='text-muted-foreground text-sm'>
            Manage your organisation settings and configurations.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          {isEditing ? (
            <>
              <Button variant='outline' onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </div>

      <FeaturesSettings isEditing={isEditing} />
      <LanguagesSettings isEditing={isEditing} />
      <PersonaOnboardingSettings isEditing={isEditing} />
      <DangerZone />
    </div>
  )
}
