import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useUser } from '@clerk/clerk-react'

type socketContextType = {
  socket: any | null
  isConnected: boolean
}

const SocketContext = createContext<socketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser()
  const [socket, setSocket] = useState<any | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  useEffect(() => {
    if (!user) return
    const socketInstance = io('/', {
      auth: {
        userId: user.id,
      },
    })
    socketInstance.on('connect', () => {
      setIsConnected(true)
    })
    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })
    setSocket(socketInstance)
    return () => {
      socketInstance.disconnect()
    }
  }, [user])
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
