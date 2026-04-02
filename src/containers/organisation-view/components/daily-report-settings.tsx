import { useState, useEffect, useMemo } from 'react'
import { Bell, Plus, X } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useOrganisationView } from '../use-organisation-view.hook'
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxEmpty,
} from '@/components/ui/combobox'
import { toast } from 'sonner'

const TIMEZONES = Intl.supportedValuesOf('timeZone')

export function DailyReportSettings() {
  const { organisation, updateOrganisationDetail, isUpdatingDetail } =
    useOrganisationView()
  const [isEditing, setIsEditing] = useState(false)
  const [emailInput, setEmailInput] = useState('')
  const [timezoneSearch, setTimezoneSearch] = useState('')

  const [settings, setSettings] = useState({
    enable_daily_report: false,
    daily_report_hour: 0,
    daily_report_timezone: 'Asia/Calcutta',
    additional_emails: [] as string[],
  })

  useEffect(() => {
    if (organisation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings({
        enable_daily_report: organisation.enable_daily_report,
        daily_report_hour: organisation.daily_report_hour ?? 0,
        daily_report_timezone:
          organisation.daily_report_timezone || 'Asia/Calcutta',
        additional_emails: organisation.additional_emails || [],
      })
    }
  }, [organisation])

  const filteredTimezones = useMemo(() => {
    if (!timezoneSearch) return TIMEZONES
    return TIMEZONES.filter((tz) =>
      tz.toLowerCase().includes(timezoneSearch.toLowerCase()),
    )
  }, [timezoneSearch])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleAddEmail = () => {
    if (!emailInput) return
    if (!emailInput.includes('@')) {
      toast.error('Invalid email address')
      return
    }
    if (settings.additional_emails.includes(emailInput)) {
      toast.error('Email already exists')
      return
    }
    setSettings((prev) => ({
      ...prev,
      additional_emails: [...prev.additional_emails, emailInput],
    }))
    setEmailInput('')
  }

  const handleRemoveEmail = (email: string) => {
    setSettings((prev) => ({
      ...prev,
      additional_emails: prev.additional_emails.filter((e) => e !== email),
    }))
  }

  const handleSave = () => {
    if (!organisation) return
    updateOrganisationDetail(
      {
        organisation_name: organisation.organisation_name,
        enable_cdn: organisation.enable_cdn,
        enable_hls: organisation.enable_hls,
        enable_content_ai: organisation.enable_content_ai,
        enable_avatar_ai: organisation.enable_avatar_ai ?? false,
        infinite_tokens: organisation.infinite_tokens,
        total_tokens: organisation.total_tokens,
        ...settings,
      },
      {
        onSuccess: () => setIsEditing(false),
      },
    )
  }

  const handleCancel = () => {
    if (organisation) {
      setSettings({
        enable_daily_report: organisation.enable_daily_report,
        daily_report_hour: organisation.daily_report_hour ?? 0,
        daily_report_timezone:
          organisation.daily_report_timezone || 'Asia/Calcutta',
        additional_emails: organisation.additional_emails || [],
      })
    }
    setIsEditing(false)
    setEmailInput('')
  }

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <Bell className='h-5 w-5 text-blue-500' />
              Notifications
            </CardTitle>
            <CardDescription>
              Manage your organisation notifications and daily report settings.
            </CardDescription>
          </div>
          <div className='flex shrink-0 items-center gap-2'>
            {isEditing ? (
              <>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleCancel}
                  disabled={isUpdatingDetail}
                >
                  Cancel
                </Button>
                <Button
                  size='sm'
                  onClick={handleSave}
                  disabled={isUpdatingDetail}
                >
                  {isUpdatingDetail ? 'Saving…' : 'Save'}
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
        <div className='space-y-4'>
          <div className='flex items-start justify-between'>
            <div className='space-y-0.5'>
              <Label className='text-base font-medium'>Daily Report</Label>
              <p className='text-muted-foreground text-sm'>
                Get a daily report of your organisation’s activity
              </p>
            </div>
            <Switch
              checked={settings.enable_daily_report}
              onCheckedChange={(checked) =>
                setSettings((prev) => ({
                  ...prev,
                  enable_daily_report: checked,
                }))
              }
              disabled={!isEditing}
            />
          </div>

          {(settings.enable_daily_report || isEditing) && (
            <div className='ml-1 space-y-6 border-l-2 border-slate-100 pl-6'>
              <div className='space-y-3'>
                <Label className='text-xs font-semibold tracking-wider text-slate-500 uppercase'>
                  Recipients for daily activity report emails
                </Label>
                <div className='flex max-w-2xl gap-2'>
                  <Input
                    placeholder='Enter email address…'
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={!isEditing}
                    className='h-10'
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddEmail()
                      }
                    }}
                  />
                  <Button
                    type='button'
                    onClick={handleAddEmail}
                    disabled={!isEditing || !emailInput}
                    className='h-10 bg-blue-600 hover:bg-blue-700'
                  >
                    <Plus className='mr-1 h-4 w-4' />
                    Add
                  </Button>
                </div>

                <div className='flex flex-wrap gap-2 pt-1'>
                  {settings.additional_emails.length === 0 ? (
                    <span className='text-sm text-slate-400'>
                      No recipients configured
                    </span>
                  ) : (
                    settings.additional_emails.map((email) => (
                      <div
                        key={email}
                        className='flex items-center gap-1 rounded-md border bg-slate-50 px-2 py-1 text-sm'
                      >
                        <span className='font-medium text-slate-700'>
                          {email}
                        </span>
                        {isEditing && (
                          <button
                            type='button'
                            onClick={() => handleRemoveEmail(email)}
                            className='ml-1 text-slate-400 hover:text-slate-600'
                          >
                            <X className='h-3 w-3' />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className='space-y-3'>
                <div className='space-y-0.5'>
                  <Label className='text-sm font-semibold text-slate-900'>
                    Report Time
                  </Label>
                  <p className='text-xs text-slate-500'>
                    Hour (0-23): {settings.daily_report_hour}:00 in{' '}
                    {settings.daily_report_timezone}
                  </p>
                </div>
                <div className='flex max-w-2xl gap-3'>
                  <Input
                    type='number'
                    min={0}
                    max={23}
                    value={settings.daily_report_hour}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        daily_report_hour: parseInt(e.target.value) || 0,
                      }))
                    }
                    disabled={!isEditing}
                    className='h-10 w-24 text-center'
                  />
                  <Combobox
                    value={settings.daily_report_timezone || 'Asia/Calcutta'}
                    onValueChange={(val) =>
                      setSettings((prev) => ({
                        ...prev,
                        daily_report_timezone: val || 'Asia/Calcutta',
                      }))
                    }
                    inputValue={timezoneSearch}
                    onInputValueChange={setTimezoneSearch}
                    disabled={!isEditing}
                  >
                    <ComboboxInput
                      placeholder='Search timezone…'
                      className='h-10 w-[240px]'
                    />
                    <ComboboxContent>
                      <ComboboxList>
                        {filteredTimezones.map((tz) => (
                          <ComboboxItem key={tz} value={tz}>
                            {tz}
                          </ComboboxItem>
                        ))}
                      </ComboboxList>
                      <ComboboxEmpty>No timezone found.</ComboboxEmpty>
                    </ComboboxContent>
                  </Combobox>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
