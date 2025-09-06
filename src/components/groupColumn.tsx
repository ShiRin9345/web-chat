import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  Loader,
  PanelLeftClose,
  PanelRightClose,
  UserIcon,
  Users,
} from 'lucide-react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { Pill, PillIcon } from './ui/shadcn-io/pill'
import { MemberList } from './group/MemberList'
import { useGroupColumnStore } from '@/store/useGroupColumnStore.ts'
import { groupWithMembersAndModeratorsAndOwnerQueryOptions } from '@/features/reactQuery/options.ts'
import { Button } from '@/components/ui/button.tsx'
import { useCountSocket } from '@/hooks/useCountSocket'

const GroupColumn = () => {
  const { open, changeOpen } = useGroupColumnStore()
  const { groupId } = useParams({ from: '/(main)/group/$groupId' })
  const { data: group } = useQuery(
    groupWithMembersAndModeratorsAndOwnerQueryOptions(groupId),
  )
  const count = useCountSocket(groupId)
  const navigate = useNavigate()
  const { user } = useUser()
  const queryClient = useQueryClient()

  const { mutate: leaveGroupMutate, isPending: isLeavingGroup } = useMutation({
    mutationFn: async (targetGroupId: string) => {
      await axios.delete('/api/leaveGroup', {
        data: { groupId: targetGroupId },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      navigate({ to: '/' })
    },
    onError: (error) => {
      console.error('Failed to leave group:', error)
      alert('Failed to leave group. Please try again.')
    },
  })

  const handleLeaveGroup = () => {
    if (!group || !user) return

    const isOwner = group.ownerId === user.id
    const confirmationMessage = isOwner
      ? 'Are you sure you want to delete this group? This action cannot be undone.'
      : 'Are you sure you want to leave this group?'

    if (window.confirm(confirmationMessage)) {
      leaveGroupMutate(group.id)
    }
  }

  useGSAP(() => {
    gsap.set('#column', {
      width: open ? 320 : 0,
    })
  }, [])
  useGSAP(() => {
    gsap.to('#column', {
      width: open ? 320 : 0,
      duration: 0.3,
      ease: 'power2.out',
    })
  }, [open])

  return (
    <div
      id="column"
      className="bg-white relative dark:bg-gray-900 orange:bg-orange-50 border-l border-gray-200 dark:border-gray-700 orange:border-orange-200 h-full flex flex-col w-[320px] shadow-lg"
    >
      <div className="absolute -left-4  top-1/2 -translate-y-1/2 z-10">
        <button
          onClick={changeOpen}
          className="group relative flex items-center justify-center cursor-pointer w-8 h-8 rounded-full bg-white dark:bg-gray-800 orange:bg-orange-100 border border-gray-200 dark:border-gray-600 orange:border-orange-300 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
        >
          {open ? (
            <PanelRightClose className="w-4 h-4 text-gray-600 dark:text-gray-300 orange:text-orange-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 orange:group-hover:text-orange-600 transition-colors duration-200" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-gray-600 dark:text-gray-300 orange:text-orange-700 group-hover:text-blue-600 dark:group-hover:text-blue-400 orange:group-hover:text-orange-600 transition-colors duration-200" />
          )}

          {/* 悬停时的背景光晕效果 */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20 orange:from-orange-500/20 orange:to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      </div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 orange:border-orange-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 orange:from-orange-50 orange:to-orange-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-gray-900 dark:text-white orange:text-orange-900">
              {group?.name || 'Group'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 orange:text-orange-700">
              Group Chat
            </p>
          </div>
          <Pill className="bg-blue-50 dark:bg-blue-900/20 orange:bg-orange-100 text-blue-700 dark:text-blue-300 orange:text-orange-800 border-blue-200 dark:border-blue-700 orange:border-orange-300">
            <PillIcon icon={UserIcon} />
            <span className="text-xs font-medium">{count} online</span>
          </Pill>
        </div>

        {/* Group Stats */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400 orange:text-orange-700">
              {group?.members.length || 0} members
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400 orange:text-orange-700">
              {group?.moderators.length || 0} moderators
            </span>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-hidden">
        <MemberList group={group} />
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 orange:border-orange-200 bg-gray-50 dark:bg-gray-800 orange:bg-orange-100">
        <Button
          variant="destructive"
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white"
          onClick={handleLeaveGroup}
          disabled={isLeavingGroup}
        >
          {isLeavingGroup ? <Loader className="animate-spin" /> : 'Leave Group'}
        </Button>
      </div>
    </div>
  )
}

export default GroupColumn
