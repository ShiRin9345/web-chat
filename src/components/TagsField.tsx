import { Plus, X } from 'lucide-react'
import { useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  savedTags: Array<string>
  currentTags: Array<string>
  onChange: (tags: Array<string>) => void
}

const TagsField: React.FC<Props> = ({ savedTags, currentTags, onChange }) => {
  const combined = useMemo(
    () => Array.from(new Set([...savedTags, ...currentTags])),
    [savedTags, currentTags],
  )

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2 w-full max-w-[20rem]">
        {combined.map((tag) => {
          const isSaved = savedTags.includes(tag)
          const inCurrent = currentTags.includes(tag)
          const baseClasses =
            'inline-flex items-center gap-1 px-2 py-1 text-sm rounded-full'
          const savedClasses =
            'bg-blue-100 dark:bg-blue-900/30 orange:bg-orange-100 text-blue-800 dark:text-blue-300 orange:text-orange-800'
          const addClasses =
            'bg-emerald-100 dark:bg-emerald-900/30 orange:bg-green-100 text-emerald-800 dark:text-emerald-300 orange:text-green-800'
          const removeClasses =
            'bg-gray-200 dark:bg-gray-700 orange:bg-orange-200 text-gray-600 dark:text-gray-300 orange:text-orange-700 line-through opacity-60'

          return (
            <div
              key={tag}
              className={`${baseClasses} ${inCurrent && isSaved ? savedClasses : inCurrent && !isSaved ? addClasses : removeClasses}`}
            >
              <span>{tag}</span>
              {inCurrent ? (
                <button
                  type="button"
                  onClick={() => onChange(currentTags.filter((t) => t !== tag))}
                  className="ml-1 hover:bg-blue-200 dark:hover:bg-blue-800/50 orange:hover:bg-orange-200 rounded-full p-0.5"
                  aria-label="Remove tag"
                >
                  <X className="w-3 h-3" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (currentTags.length < 8 && !currentTags.includes(tag)) {
                      onChange([...currentTags, tag])
                    }
                  }}
                  className="ml-1 hover:bg-emerald-200 dark:hover:bg-emerald-800/50 orange:hover:bg-green-200 rounded-full p-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Add tag back"
                  disabled={currentTags.length >= 8}
                >
                  <Plus className="w-3 h-3" />
                </button>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Add a tag..."
          maxLength={20}
          disabled={currentTags.length >= 8}
          className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 placeholder:text-gray-500 dark:placeholder:text-gray-400 orange:placeholder:text-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              const input = e.target as HTMLInputElement
              const newTag = input.value.trim()
              if (
                newTag &&
                newTag.length <= 20 &&
                currentTags.length < 8 &&
                !currentTags.includes(newTag)
              ) {
                onChange([...currentTags, newTag])
                input.value = ''
              }
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentTags.length >= 8}
          onClick={() => {
            const input = document.querySelector(
              'input[placeholder="Add a tag..."]',
            ) as HTMLInputElement
            const newTag = input.value.trim()
            if (
              newTag &&
              newTag.length <= 20 &&
              currentTags.length < 8 &&
              !currentTags.includes(newTag)
            ) {
              onChange([...currentTags, newTag])
              input.value = ''
            }
          }}
          className="bg-white dark:bg-gray-700 orange:bg-orange-100 border-gray-300 dark:border-gray-600 orange:border-orange-300 text-gray-900 dark:text-white orange:text-orange-900 hover:bg-gray-50 dark:hover:bg-gray-600 orange:hover:bg-orange-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default TagsField
