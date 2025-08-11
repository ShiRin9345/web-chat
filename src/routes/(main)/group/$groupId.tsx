import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import type { GroupMessage } from 'generated/index'

export const groupMessagesQueryOptions = (groupId: string) => ({
  queryKey: [`${groupId}_messages`],
  queryFn: async () => {
    const response = await axios.get<Array<GroupMessage>>(
      '/api/groupMessages',
      {
        params: { groupId },
      },
    )
    return response.data
  },
})

export const Route = createFileRoute('/(main)/group/$groupId')({
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      groupMessagesQueryOptions(params.groupId),
    )
  },
})
