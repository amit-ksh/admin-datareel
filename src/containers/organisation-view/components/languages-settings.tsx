import { useState } from 'react'
import { Globe2, X, Check } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { useOrganisationView } from '../use-organisation-view.hook'

const LANGUAGE_MAP: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  de: 'German',
  fr: 'French',
  es: 'Spanish',
  it: 'Italian',
  pt: 'Portuguese',
  nl: 'Dutch',
  ru: 'Russian',
  ja: 'Japanese',
  ko: 'Korean',
  zh: 'Chinese',
  ar: 'Arabic',
  tr: 'Turkish',
  pl: 'Polish',
  sv: 'Swedish',
  da: 'Danish',
  no: 'Norwegian',
  fi: 'Finnish',
  th: 'Thai',
  vi: 'Vietnamese',
  id: 'Indonesian',
  ms: 'Malay',
  cs: 'Czech',
  ro: 'Romanian',
  hu: 'Hungarian',
  el: 'Greek',
  he: 'Hebrew',
  uk: 'Ukrainian',
  ca: 'Catalan',
  ta: 'Tamil',
  te: 'Telugu',
  bn: 'Bengali',
  gu: 'Gujarati',
  kn: 'Kannada',
  mr: 'Marathi',
  pa: 'Punjabi',
  ml: 'Malayalam',
  ur: 'Urdu',
  sw: 'Swahili',
  fil: 'Filipino',
  bg: 'Bulgarian',
  hr: 'Croatian',
  sk: 'Slovak',
  sl: 'Slovenian',
  sr: 'Serbian',
  lt: 'Lithuanian',
  lv: 'Latvian',
  et: 'Estonian',
}

function getLanguageLabel(code: string): string {
  return LANGUAGE_MAP[code] ?? code
}

const ALL_LANGUAGE_CODES = Object.keys(LANGUAGE_MAP)

export function LanguagesSettings() {
  const { organisation, updateOrganisation, isUpdating } = useOrganisationView()
  const [isEditing, setIsEditing] = useState(false)
  const [editedLanguages, setEditedLanguages] = useState<string[]>([])
  const [popoverOpen, setPopoverOpen] = useState(false)

  const orgLanguages = organisation?.languages ?? []

  const displayedLanguages = isEditing ? editedLanguages : orgLanguages

  const handleStartEditing = () => {
    setEditedLanguages([...orgLanguages])
    setIsEditing(true)
  }

  const handleSave = () => {
    updateOrganisation(
      { languages: editedLanguages },
      {
        onSuccess: () => {
          setIsEditing(false)
        },
      },
    )
  }

  const handleCancel = () => {
    setEditedLanguages([])
    setIsEditing(false)
  }

  const handleAddLanguage = (code: string) => {
    if (!editedLanguages.includes(code)) {
      setEditedLanguages((prev) => [...prev, code])
    }
    setPopoverOpen(false)
  }

  const handleRemoveLanguage = (code: string) => {
    setEditedLanguages((prev) => prev.filter((l) => l !== code))
  }

  const availableToAdd = ALL_LANGUAGE_CODES.filter(
    (code) => !editedLanguages.includes(code),
  )

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
                  {isUpdating ? 'Saving...' : 'Save'}
                </Button>
              </>
            ) : (
              <Button variant='outline' size='sm' onClick={handleStartEditing}>
                Edit
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-2'>
          {displayedLanguages.map((code) => (
            <Badge
              key={code}
              variant='secondary'
              className='flex items-center gap-1 px-3 py-1'
            >
              {getLanguageLabel(code)}
              {isEditing && (
                <button
                  type='button'
                  onClick={() => handleRemoveLanguage(code)}
                  className='text-muted-foreground hover:text-foreground ml-1'
                >
                  <X className='h-3 w-3' />
                </button>
              )}
            </Badge>
          ))}
          {isEditing && (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Badge
                  variant='outline'
                  className='hover:bg-muted text-muted-foreground cursor-pointer border-dashed px-3 py-1'
                >
                  + Add Language
                </Badge>
              </PopoverTrigger>
              <PopoverContent className='w-64 p-0' align='start'>
                <Command>
                  <CommandInput placeholder='Search languages...' />
                  <CommandList>
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {availableToAdd.map((code) => (
                        <CommandItem
                          key={code}
                          value={getLanguageLabel(code)}
                          onSelect={() => handleAddLanguage(code)}
                        >
                          <Check className='mr-2 h-4 w-4 opacity-0' />
                          {getLanguageLabel(code)}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}
          {displayedLanguages.length === 0 && !isEditing && (
            <span className='text-muted-foreground text-sm'>
              No languages configured.
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
