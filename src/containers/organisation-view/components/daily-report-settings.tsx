import { useState, useEffect } from 'react'
import { FileText } from 'lucide-react'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function DailyReportSettings() {
  const { organisation, updateOrganisationDetail, isUpdatingDetail } =
    useOrganisationView()
  const [isEditing, setIsEditing] = useState(false)

  const [settings, setSettings] = useState({
    enable_daily_report: false,
    daily_report_hour: 0,
    daily_report_timezone: 'UTC',
  })

  useEffect(() => {
    if (organisation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings({
        enable_daily_report: organisation.enable_daily_report,
        daily_report_hour: organisation.daily_report_hour,
        daily_report_timezone: organisation.daily_report_timezone || 'UTC',
      })
    }
  }, [organisation])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    if (!organisation) return
    updateOrganisationDetail(
      {
        organisation_name: organisation.organisation_name,
        enable_cdn: organisation.enable_cdn,
        enable_hls: organisation.enable_hls,
        enable_content_ai: organisation.enable_content_ai,
        enable_avatar_ai: organisation.enable_avatar_ai,
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
        daily_report_hour: organisation.daily_report_hour,
        daily_report_timezone: organisation.daily_report_timezone || 'UTC',
      })
    }
    setIsEditing(false)
  }

  return (
    <Card>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <CardTitle className='flex items-center gap-2 text-lg'>
              <FileText className='h-5 w-5 text-emerald-500' />
              Daily Report Settings
            </CardTitle>
            <CardDescription>
              Configure daily business analytics and reports delivered via
              email.
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
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label className='text-base font-medium'>Daily Report</Label>
            <p className='text-muted-foreground text-sm'>
              Receive an automated email with daily performance metrics.
            </p>
          </div>
          <Switch
            checked={settings.enable_daily_report}
            onCheckedChange={(checked) =>
              setSettings((prev) => ({ ...prev, enable_daily_report: checked }))
            }
            disabled={!isEditing}
          />
        </div>

        {settings.enable_daily_report && (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <div className='space-y-2'>
              <Label htmlFor='report-hour'>Report Hour (24h)</Label>
              <Input
                id='report-hour'
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
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='report-timezone'>Timezone</Label>
              <Select
                value={settings.daily_report_timezone}
                onValueChange={(val) =>
                  setSettings((prev) => ({
                    ...prev,
                    daily_report_timezone: val,
                  }))
                }
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue placeholder='Select timezone' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='UTC'>UTC</SelectItem>
                  <SelectItem value='Asia/Kolkata'>IST (UTC+5:30)</SelectItem>
                  <SelectItem value='America/New_York'>EST (UTC-5)</SelectItem>
                  <SelectItem value='Europe/London'>GMT (UTC+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
