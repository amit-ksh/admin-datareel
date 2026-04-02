import { FeaturesSettings } from './features-settings'
import { LanguagesSettings } from './languages-settings'
import { PersonaOnboardingSettings } from './persona-onboarding-settings'
import { TokenSettings } from './token-settings'
import { DailyReportSettings } from './daily-report-settings'

export function OrganisationOverview() {
  return (
    <div className='space-y-6'>
      <div className='mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center'>
        <div>
          <h2 className='text-lg font-bold tracking-tight'>Overview</h2>
          <p className='text-muted-foreground text-sm'>
            Manage your organisation settings and configurations.
          </p>
        </div>
      </div>

      <FeaturesSettings />
      <TokenSettings />
      <DailyReportSettings />
      <LanguagesSettings />
      <PersonaOnboardingSettings />
      {/* <DangerZone /> */}
    </div>
  )
}
