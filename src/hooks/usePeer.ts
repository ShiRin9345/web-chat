import { useEffect, useRef } from 'react'
import Peer from 'peerjs'
import { v4 as uuidv4 } from 'uuid'
import type { MediaConnection } from 'peerjs'
import { useSocket } from '@/providers/socketProvider.tsx'
import useMediaStream from '@/hooks/useMediaStream.ts'

const usePeer = (groupId: string) => {
  const { socket } = useSocket()
  const { stream: myStream } = useMediaStream()
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const myVideoRef = useRef<HTMLVideoElement>(null)
  const peerRef = useRef<Peer | null>(null)
  const remoteVideoRef = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const addVideo = (call: MediaConnection, stream: MediaStream) => {
    const video = document.createElement('video')
    video.srcObject = stream
    video.autoplay = true
    video.playsInline = true
    video.className = 'aspect-video w-full h-full object-cover'
    videoContainerRef.current?.append(video)
    remoteVideoRef.current[call.peer] = video
  }
  useEffect(() => {
    if (!myVideoRef.current || !myStream) return
    myVideoRef.current.srcObject = myStream
  }, [myStream])
  useEffect(() => {
    if (!socket || !myStream) return
    socket.on('user_connected', (id: string) => {
      const call = peerRef.current?.call(id, myStream)
      call?.on('stream', (userStream) => {
        if (!(call.peer in remoteVideoRef.current)) {
          addVideo(call, userStream)
        }
      })
      call?.on('close', () => {
        if (call.peer in remoteVideoRef.current) {
          remoteVideoRef.current[call.peer]?.remove()
          delete remoteVideoRef.current[call.peer]
        }
      })
      call?.peerConnection.addEventListener('connectionstatechange', () => {
        const state = call.peerConnection.connectionState
        if (
          state === 'closed' ||
          state === 'failed' ||
          state === 'disconnected'
        ) {
          if (call.peer in remoteVideoRef.current) {
            remoteVideoRef.current[call.peer]?.remove()
            delete remoteVideoRef.current[call.peer]
          }
        }
      })
    })
  }, [socket, myStream])
  useEffect(() => {
    if (!socket || !myStream) return
    const clientId = `${uuidv4()}_${groupId}`
    peerRef.current = new Peer(clientId, {
      host: 'localhost',
      port: 5174,
      path: '/peerjs',
      config: {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      },
    })
    peerRef.current.on('call', (call) => {
      call.answer(myStream)
      call.on('stream', (userStream) => {
        if (!(call.peer in remoteVideoRef.current)) {
          addVideo(call, userStream)
        }
      })
      call.on('close', () => {
        if (call.peer in remoteVideoRef.current) {
          remoteVideoRef.current[call.peer]?.remove()
          delete remoteVideoRef.current[call.peer]
        }
      })
    })
    peerRef.current.on('open', (id) => {
      socket.emit('join_video_room', groupId, id)
    })
    peerRef.current.on('disconnected', () => {
      socket.emit('leave_video_room', groupId)
    })

    return () => {
      peerRef.current?.destroy()
    }
  }, [socket, myStream])
  return {
    myVideoRef,
    videoContainerRef,
  }
}
export default usePeer
