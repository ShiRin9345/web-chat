import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { queryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { ArrowLeft, Check, Loader, UserPlus, Users, X } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/clerk-react'
import type { NewFriendRequest, User } from 'generated/index'
import { Button } from '@/components/ui/button.tsx'
import { Separator } from '@/components/ui/separator.tsx'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import AnimatedLink from '@/components/animatedLink.tsx'

type RequestWithFrom = NewFriendRequest & {
  from: User
  to: User
}

const requestQueryOptions = queryOptions({
  queryKey: ['request'],
  queryFn: async () => {
    const response =
      await axios.get<Array<RequestWithFrom>>('/api/friendRequest')
    return response.data
  },
})

export const Route = createFileRoute('/(main)/friendRequest/')({
  component: RouteComponent,
  loader: ({ context }) => {
    context.queryClient.ensureQueryData(requestQueryOptions)
  },
})

function RouteComponent() {
  const { isLoading, data } = useQuery(requestQueryOptions)
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

  return (
    <div className="flex relative flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="h-12 w-full p-2 flex relative items-center bg-white dark:bg-gray-800">
        <AnimatedLink url="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft />
          </Button>
        </AnimatedLink>
        <div className="ml-3 flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-lg text-gray-900 dark:text-white">
            Friend Requests
          </span>
          {sentRequests.length + receivedRequests.length > 0 && (
            <Badge variant="secondary" className="ml-2">
              {sentRequests.length + receivedRequests.length}
            </Badge>
          )}
        </div>
      </div>
      <Separator />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
        ) : sentRequests.length > 0 || receivedRequests.length > 0 ? (
          <div className="space-y-6">
            {/* 收到的请求 */}
            {receivedRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Received Requests
                </h3>
                <div className="space-y-4">
                  {receivedRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={request.from.imageUrl}
                            alt="avatar"
                          />
                          <AvatarFallback className="text-lg">
                            {request.from.fullName
                              ? request.from.fullName.charAt(0)
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
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

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Code: {request.from.code}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          {request.state === 'PENDING' ? (
                            <>
                              <Button
                                onClick={() => handleRequest(request, 'agreed')}
                                className="bg-green-600 hover:bg-green-700 text-white"
                                size="sm"
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
                                className="border-red-300 dark:border-red-600 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
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

            {/* 发送的请求 */}
            {sentRequests.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <ArrowLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                  Sent Requests
                </h3>
                <div className="space-y-4">
                  {sentRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={request.to.imageUrl} alt="avatar" />
                          <AvatarFallback className="text-lg">
                            {request.to.fullName
                              ? request.to.fullName.charAt(0)
                              : 'U'}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
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

                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Code: {request.to.code}
                          </p>
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
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Users className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No Friend Requests
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm">
              When someone sends you a friend request, it will appear here. You
              can choose to accept or reject it.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
