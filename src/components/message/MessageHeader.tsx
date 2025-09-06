import { Badge } from '@/components/ui/badge'

interface GroupHeaderProps {
  isSelf: boolean
  isOwner: boolean
  isModerator: boolean
  senderName: string
}

export function GroupMessageHeader({
  isSelf,
  isOwner,
  isModerator,
  senderName,
}: GroupHeaderProps) {
  return (
    <div
      className={`${isSelf ? 'self-end' : 'self-start'} flex items-center gap-2`}
    >
      {isSelf && isOwner && (
        <Badge
          variant="secondary"
          className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 orange:bg-orange-100 orange:text-orange-800"
        >
          Owner
        </Badge>
      )}
      {isSelf && isModerator && (
        <Badge
          variant="secondary"
          className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 orange:bg-emerald-100 orange:text-emerald-800"
        >
          Moderator
        </Badge>
      )}
      <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
        {senderName}
      </span>
      {!isSelf && isOwner && (
        <Badge
          variant="secondary"
          className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 orange:bg-orange-100 orange:text-orange-800"
        >
          Owner
        </Badge>
      )}
      {!isSelf && isModerator && (
        <Badge
          variant="secondary"
          className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 orange:bg-emerald-100 orange:text-emerald-800"
        >
          Moderator
        </Badge>
      )}
    </div>
  )
}

interface PrivateHeaderProps {
  isSelf: boolean
  senderName: string
}

export function PrivateMessageHeader({
  isSelf,
  senderName,
}: PrivateHeaderProps) {
  return (
    <div
      className={`${isSelf ? 'self-end' : 'self-start'} flex items-center gap-2`}
    >
      <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
        {senderName}
      </span>
    </div>
  )
}
