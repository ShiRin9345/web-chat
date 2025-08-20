import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import type { NewFriendRequest, User } from 'generated/index'

type RequestWithFrom = NewFriendRequest & {
  from: User
}

export const Route = createFileRoute('/(main)/friendRequest/')({
  component: RouteComponent,
  loader: async () => {
    const reponse =
      await axios.get<Array<RequestWithFrom>>('/api/friendRequest')
    return reponse.data
  },
})

function RouteComponent() {
  const data = Route.useLoaderData()
  return (
    <div>
      {data.map((request) => (
        <div>
          <img
            src={request.from.imageUrl}
            className="aspect-square rounded-full size-12"
            alt="avatar"
          />
        </div>
      ))}
    </div>
  )
}
