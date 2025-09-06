import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  ArrowLeft,
  Check,
  Loader,
  UserIcon,
  UserPlus,
  Users,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'
import type { Group, NewFriendRequest, User } from 'generated/index'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'

// Helper function to format date
const formatDate = (date: Date | string) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

type RequestWithFrom = NewFriendRequest & {
  from: User
  to: User
}

type GroupJoinRequestWithDetails = {
  id: string
  groupId: string
  userId: string
  state: 'PENDING' | 'AGREED' | 'REJECTED'
  createdAt: Date
  updatedAt: Date
  group: Group
  user: User
}

const requestQueryOptions = queryOptions({
  queryKey: ['request'],
  queryFn: async () => {
    const response =
      await axios.get<Array<RequestWithFrom>>('/api/friendRequest')
    return response.data
  },
})

const groupJoinRequestQueryOptions = queryOptions({
  queryKey: ['groupJoinRequests'],
  queryFn: async () => {
    const response = await axios.get<Array<GroupJoinRequestWithDetails>>(
      '/api/groupJoinRequests',
    )
    return response.data
  },
})

const sentGroupJoinRequestQueryOptions = queryOptions({
  queryKey: ['sentGroupJoinRequests'],
  queryFn: async () => {
    const response = await axios.get<Array<GroupJoinRequestWithDetails>>(
      '/api/sentGroupJoinRequests',
    )
    return response.data
  },
})

export const Route = createFileRoute('/(main)/friendRequest/')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(requestQueryOptions)
    context.queryClient.ensureQueryData(groupJoinRequestQueryOptions)
    context.queryClient.ensureQueryData(sentGroupJoinRequestQueryOptions)
  },
})

function RouteComponent() {
  const { isLoading, data } = useQuery(requestQueryOptions)
  const { data: groupJoinRequests } = useQuery(groupJoinRequestQueryOptions)
  const { data: sentGroupJoinRequests } = useQuery(
    sentGroupJoinRequestQueryOptions,
  )
  const queryClient = useQueryClient()

  // 分离自己发送的请求和收到的请求
  // 需要从API获取当前用户ID，这里暂时使用一个假设的逻辑
  // 实际应该从认证上下文获取当前用户ID
  const { user } = useUser()
  const currentUserId = user?.id

  const sentRequests =
    data?.filter((request) => request.fromUserId === currentUserId) || []
  const receivedRequests =
    data?.filter((request) => request.toUserId === currentUserId) || []

  // Filter group join requests for groups owned by current user (show all states)
  const receivedGroupJoinRequests =
    groupJoinRequests?.filter((request) => {
      return request.group.ownerId === currentUserId
    }) || []

  const handleRequest = async (
    request: RequestWithFrom,
    state: 'agreed' | 'rejected',
  ) => {
    try {
      await axios.post('/api/handleRequest', {
        request,
        state,
      })

      // 刷新数据
      await queryClient.invalidateQueries({ queryKey: ['request'] })

      toast.success(
        state === 'agreed'
          ? `Accepted friend request from ${request.from.fullName}`
          : `Rejected friend request from ${request.from.fullName}`,
      )
    } catch (error) {
      toast.error('Operation failed, please try again')
    }
  }

  const handleGroupJoinRequest = async (
    request: GroupJoinRequestWithDetails,
    state: 'agreed' | 'rejected',
  ) => {
    try {
      await axios.post('/api/handleGroupJoinRequest', {
        requestId: request.id,
        state,
      })

      // 刷新数据
      await queryClient.invalidateQueries({ queryKey: ['groupJoinRequests'] })
      await queryClient.invalidateQueries({
        queryKey: ['sentGroupJoinRequests'],
      })

      toast.success(
        state === 'agreed'
          ? `Accepted join request from ${request.user.fullName} to ${request.group.name}`
          : `Rejected join request from ${request.user.fullName} to ${request.group.name}`,
      )
    } catch (error) {
      toast.error('Operation failed, please try again')
    }
  }

  return (
    <div className="flex relative flex-col h-screen bg-gray-50 dark:bg-gray-900 orange:bg-orange-50">
      {/* Header */}
      <div className="h-12 w-full p-2 flex relative items-center bg-white dark:bg-gray-800 orange:bg-orange-100">
        <Button variant="ghost" size="icon">
          <AnimatedLink url="/">
            <ArrowLeft className="text-gray-600 dark:text-gray-300 orange:text-orange-600" />
          </AnimatedLink>
        </Button>
        <div className="ml-3 flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400 orange:text-orange-600" />
          <span className="font-semibold text-lg text-gray-900 dark:text-white orange:text-orange-900">
            Friend Requests
          </span>
          {sentRequests.length +
            receivedRequests.length +
            receivedGroupJoinRequests.length +
            (sentGroupJoinRequests?.length || 0) >
            0 && (
            <Badge variant="secondary" className="ml-2">
              {sentRequests.length +
                receivedRequests.length +
                receivedGroupJoinRequests.length +
                (sentGroupJoinRequests?.length || 0)}
            </Badge>
          )}
        </div>
      </div>
      <Separator />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400 orange:text-orange-600" />
          </div>
        ) : sentRequests.length > 0 ||
          receivedRequests.length > 0 ||
          receivedGroupJoinRequests.length > 0 ? (
          <div className="space-y-6">
            {/* 收到的请求 */}
            {receivedRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white orange:text-orange-900 mb-4 flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400 orange:text-orange-600" />
                  Received Requests
                </h3>
                <div className="space-y-4">
                  {receivedRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 orange:bg-orange-100 rounded-lg border border-gray-200 dark:border-gray-700 orange:border-orange-300 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={request.from.imageUrl}
                            alt="avatar"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-lg bg-gray-200 dark:bg-gray-600 orange:bg-orange-200 text-gray-700 dark:text-gray-300 orange:text-orange-800">
                            {request.from.fullName
                              ? request.from.fullName.charAt(0)
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white orange:text-orange-900">
                              {request.from.fullName}
                            </h3>
                            <Badge
                              variant={
                                request.state === 'PENDING'
                                  ? 'outline'
                                  : request.state === 'AGREED'
                                    ? 'default'
                                    : 'destructive'
                              }
                              className="text-xs"
                            >
                              {request.state === 'PENDING'
                                ? 'Pending'
                                : request.state === 'AGREED'
                                  ? 'Accepted'
                                  : 'Rejected'}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400 orange:text-orange-700">
                              Code: {request.from.code}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 orange:text-orange-600">
                              • {formatDate(request.createdAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {request.state === 'PENDING' ? (
                            <>
                              <Button
                                onClick={() => handleRequest(request, 'agreed')}
                                variant="outline"
                                size="sm"
                                className="border-green-300 dark:border-green-600 orange:border-green-400 text-green-600 dark:text-green-400 orange:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 orange:hover:bg-green-100"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                onClick={() =>
                                  handleRequest(request, 'rejected')
                                }
                                variant="outline"
                                size="sm"
                                className="border-red-300 dark:border-red-600 orange:border-red-400 text-red-600 dark:text-red-400 orange:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 orange:hover:bg-red-100"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          ) : (
                            <Badge
                              variant={
                                request.state === 'AGREED'
                                  ? 'default'
                                  : 'destructive'
                              }
                              className="text-sm"
                            >
                              {request.state === 'AGREED'
                                ? 'Request Accepted'
                                : 'Request Rejected'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 群组加入请求 */}
            {receivedGroupJoinRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white orange:text-orange-900 mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600 dark:text-purple-400 orange:text-orange-600" />
                  Group Join Requests
                </h3>
                <div className="space-y-4">
                  {receivedGroupJoinRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 orange:bg-orange-100 rounded-lg border border-gray-200 dark:border-gray-700 orange:border-orange-300 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={request.user.imageUrl}
                            alt="avatar"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-lg bg-gray-200 dark:bg-gray-600 orange:bg-orange-200 text-gray-700 dark:text-gray-300 orange:text-orange-800">
                            {request.user.fullName
                              ? request.user.fullName.charAt(0)
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white orange:text-orange-900">
                              {request.user.fullName}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 orange:text-orange-700">
                              Code: {request.user.code}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 orange:text-orange-600">
                              • {formatDate(request.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 orange:text-orange-600">
                            <Users className="h-4 w-4" />
                            <span>Group: {request.group.name}</span>
                            <span>•</span>
                            <span>Code: {request.group.code}</span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            request.state === 'PENDING'
                              ? 'outline'
                              : request.state === 'AGREED'
                                ? 'default'
                                : 'destructive'
                          }
                          className="text-sm"
                        >
                          {request.state === 'PENDING'
                            ? 'Wants to join'
                            : request.state === 'AGREED'
                              ? 'Request Accepted'
                              : 'Request Rejected'}
                        </Badge>

                        {request.state === 'PENDING' && (
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                handleGroupJoinRequest(request, 'agreed')
                              }
                              variant="outline"
                              size="sm"
                              className="border-green-300 dark:border-green-600 orange:border-green-400 text-green-600 dark:text-green-400 orange:text-green-700 hover:bg-green-50 dark:hover:bg-green-900/20 orange:hover:bg-green-100"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Accept
                            </Button>
                            <Button
                              onClick={() =>
                                handleGroupJoinRequest(request, 'rejected')
                              }
                              variant="outline"
                              size="sm"
                              className="border-red-300 dark:border-red-600 orange:border-red-400 text-red-600 dark:text-red-400 orange:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 orange:hover:bg-red-100"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 发送的请求 */}
            {sentRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white orange:text-orange-900 mb-4 flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5 text-green-600 dark:text-green-400 orange:text-orange-600" />
                  Sent Requests
                </h3>
                <div className="space-y-4">
                  {sentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 orange:bg-orange-100 rounded-lg border border-gray-200 dark:border-gray-700 orange:border-orange-300 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={request.to.imageUrl}
                            alt="avatar"
                            className="object-cover"
                          />
                          <AvatarFallback className="text-lg bg-gray-200 dark:bg-gray-600 orange:bg-orange-200 text-gray-700 dark:text-gray-300 orange:text-orange-800">
                            {request.to.fullName
                              ? request.to.fullName.charAt(0)
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white orange:text-orange-900">
                              {request.to.fullName}
                            </h3>
                            <Badge
                              variant={
                                request.state === 'PENDING'
                                  ? 'outline'
                                  : request.state === 'AGREED'
                                    ? 'default'
                                    : 'destructive'
                              }
                              className="text-xs"
                            >
                              {request.state === 'PENDING'
                                ? 'Sent'
                                : request.state === 'AGREED'
                                  ? 'Accepted'
                                  : 'Rejected'}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400 orange:text-orange-700">
                              Code: {request.to.code}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 orange:text-orange-600">
                              • {formatDate(request.createdAt)}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Badge
                            variant={
                              request.state === 'PENDING'
                                ? 'outline'
                                : request.state === 'AGREED'
                                  ? 'default'
                                  : 'destructive'
                            }
                            className="text-sm"
                          >
                            {request.state === 'PENDING'
                              ? 'Waiting for response'
                              : request.state === 'AGREED'
                                ? 'Request accepted'
                                : 'Request rejected'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 发送的加群请求 */}
            {sentGroupJoinRequests && sentGroupJoinRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white orange:text-orange-900 mb-4 flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5 text-purple-600 dark:text-purple-400 orange:text-orange-600" />
                  Sent Group Join Requests
                </h3>
                <div className="space-y-4">
                  {sentGroupJoinRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 orange:bg-orange-100 rounded-lg border border-gray-200 dark:border-gray-700 orange:border-orange-300 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={request.group.imageUrl}
                            className="object-cover"
                            alt="group avatar"
                          />
                          <AvatarFallback className="text-lg bg-gray-200 dark:bg-gray-600 orange:bg-orange-200 text-gray-700 dark:text-gray-300 orange:text-orange-800">
                            <Users className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white orange:text-orange-900">
                              {request.group.name}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400 orange:text-orange-700">
                              Code: {request.group.code}
                            </p>
                            <span className="text-xs text-gray-400 dark:text-gray-500 orange:text-orange-600">
                              • {formatDate(request.createdAt)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 orange:text-orange-600">
                            <UserIcon className="h-4 w-4" />
                            <span>Requested to join</span>
                          </div>
                        </div>

                        <Badge
                          variant={
                            request.state === 'PENDING'
                              ? 'outline'
                              : request.state === 'AGREED'
                                ? 'default'
                                : 'destructive'
                          }
                          className="text-sm"
                        >
                          {request.state === 'PENDING'
                            ? 'Waiting for response'
                            : request.state === 'AGREED'
                              ? 'Request accepted'
                              : 'Request rejected'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 orange:text-orange-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white orange:text-orange-900 mb-2">
              No Friend Requests
            </h3>
            <p className="text-gray-500 dark:text-gray-400 orange:text-orange-700 max-w-sm">
              When someone sends you a friend request, it will appear here. You
              can choose to accept or reject it.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
