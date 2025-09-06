import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useUser } from '@clerk/clerk-react'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import axios from 'axios'
import type { User, Group } from 'generated/index'
import AnimatedLink from '@/components/animatedLink.tsx'
import UserSearchPanel from '@/components/UserSearchPanel.tsx'
import RecommendationsList from '@/components/RecommendationsList.tsx'

const AddUserSidebarList = () => {
  const { user: currentUser } = useUser()
  const queryClient = useQueryClient()

  // 获取当前好友列表，用于过滤搜索结果
  const { data: currentFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: async () => {
      const response = await axios.get<Array<User>>('/api/friends')
      return response.data
    },
  })

  // 获取当前用户加入的群组列表
  const { data: currentGroups } = useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const response = await axios.get<Array<Group>>('/api/groups')
      return response.data
    },
  })

  const sendFriendRequest = async (toUserId: string) => {
    try {
      await axios.post('/api/friendRequest', {
        toUserId,
      })
      toast.success('Friend request sent successfully')
      // Optionally, you could trigger a refetch in child components via props/state
    } catch (error) {
      toast.error('Failed to send friend request')
    }
  }

  const sendGroupJoinRequest = async (groupId: string) => {
    try {
      const response = await axios.post('/api/sendGroupJoinRequest', {
        groupId,
      })
      if (response.data.success) {
        toast.success(response.data.message)
        // Refresh sent group join requests data
        queryClient.invalidateQueries({ queryKey: ['sentGroupJoinRequests'] })
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('Failed to send join request')
    }
  }

  return (
    <div className="px-2 space-y-4">
      <div className="space-y-2">
        <AnimatedLink url="/friendRequest">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 orange:text-orange-800 flex items-center gap-2 hover:text-gray-900 dark:hover:text-white orange:hover:text-orange-900 transition-colors cursor-pointer">
            <Plus className="h-4 w-4" />
            See Friend Requests
          </h3>
        </AnimatedLink>

        <UserSearchPanel
          currentUserId={currentUser?.id}
          currentFriends={currentFriends}
          currentGroups={currentGroups}
          onAdd={sendFriendRequest}
          onJoinGroup={sendGroupJoinRequest}
        />
      </div>
      <RecommendationsList
        currentUserId={currentUser?.id}
        currentFriends={currentFriends}
        onAdd={sendFriendRequest}
      />
    </div>
  )
}

export default AddUserSidebarList
