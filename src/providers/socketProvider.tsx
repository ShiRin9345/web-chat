import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

type socketContextType = {
  socket: any | null
}

const SocketContext = createContext<socketContextType>({
  socket: null,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<any | null>(null)
  useEffect(() => {
    const socketInstance = io('/')
    setSocket(socketInstance)
    return () => {
      socketInstance.disconnect()
    }
  }, [])
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
