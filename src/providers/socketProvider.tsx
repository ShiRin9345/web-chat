import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

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
  const [socket, setSocket] = useState<any | null>(null)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  useEffect(() => {
    const socketInstance = io('/')
    setSocket(socketInstance)
    setIsConnected(true)
    return () => {
      socketInstance.disconnect()
    }
  }, [])
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
