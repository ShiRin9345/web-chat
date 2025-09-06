import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Users } from 'lucide-react'
import { AvatarLabel } from './AvatarLabel.tsx'
import type { GroupWithMembersAndModeratorsAndOwner } from '@/type'

interface MemberListProps {
  group: GroupWithMembersAndModeratorsAndOwner | undefined
}

export const MemberList: React.FC<MemberListProps> = ({ group }) => {
  const userCount =
    (group?.members.length || 0) + (group?.moderators.length || 0) + 1
  const { user } = useUser()
  const role =
    user?.id === group?.owner.userId
      ? 'owner'
      : group?.moderators.some((moderator) => moderator.userId === user?.id)
        ? 'moderator'
        : 'member'

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-gray-600 dark:text-gray-400 orange:text-orange-600" />
        <h2 className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
          Members ({userCount})
        </h2>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {/* Owner */}
        {group && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 orange:from-orange-50 orange:to-orange-100 rounded-lg p-3 border border-amber-200 dark:border-amber-700 orange:border-orange-200">
            <AvatarLabel role={role} type="owner" user={group.owner} />
          </div>
        )}

        {/* Moderators */}
        {group?.moderators.map((moderator) => (
          <div
            key={moderator.id}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 orange:from-orange-50 orange:to-orange-100 rounded-lg p-3 border border-blue-200 dark:border-blue-700 orange:border-orange-200"
          >
            <AvatarLabel
              key={moderator.id}
              type="moderator"
              role={role}
              user={moderator}
            />
          </div>
        ))}

        {/* Members */}
        {group?.members.map((member) => (
          <div
            key={member.id}
            className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800 orange:from-orange-50 orange:to-orange-100 rounded-lg p-3 border border-gray-200 dark:border-gray-600 orange:border-orange-200"
          >
            <AvatarLabel
              key={member.id}
              type="member"
              role={role}
              user={member}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
