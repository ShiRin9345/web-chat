import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createFileRoute('/(main)/group/$groupId')({
  beforeLoad: async ({ params }) => {
    const groupId = params.groupId
    await axios.get('/api/canAccess', {
      params: {
        groupId,
      },
    })
  },
  errorComponent: () => {
    return (
      <div className="w-full h-dvh text-center content-center">
        You are not in this group
      </div>
    )
  },
})
