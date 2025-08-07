import axios from 'axios'

export const db = {
  message: {
    findMany: async () => {
      try {
        const response = await axios.get('api/messages')

        return response.data
      } catch (e) {
        console.error(e)
        throw new Error('Failed to fetch messages.')
      }
    },
  },
}
