import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import type { NewFriendRequest, User } from 'generated/index'
import { Button } from '@/components/ui/button.tsx'

type RequestWithFrom = NewFriendRequest & {
  from: User
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
  return (
    <div>
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        data?.map((request) => (
          <div key={request.id}>
            <img
              src={request.from.imageUrl}
              className="aspect-square rounded-full size-12"
              alt="avatar"
            />
            <Button
              onClick={async () => {
                await axios.post('/api/handleRequest', {
                  request,
                  state: 'agreed',
                })
              }}
            >
              agree
            </Button>
          </div>
        ))
      )}
    </div>
  )
}
