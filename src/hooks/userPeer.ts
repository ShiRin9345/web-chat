import { useEffect, useRef } from 'react'
import Peer from 'peerjs'
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
    console.log(stream)
    video.srcObject = stream
    video.autoplay = true
    video.playsInline = true
    video.className = 'aspect-video w-[300px] object-cover'
    videoContainerRef.current?.append(video)
    remoteVideoRef.current[call.peer] = video
  }
  useEffect(() => {
    myVideoRef.current.srcObject = myStream
  }, [myStream])
  useEffect(() => {
    if (!socket) return
    socket.on('user_connected', (id: string) => {
      const call = peerRef.current?.call(id, myStream as MediaStream)
      call?.on('stream', (userStream) => {
        if (!(call.peer in remoteVideoRef.current)) {
          addVideo(call, userStream)
        }
      })
      call?.on('close', () => {
        remoteVideoRef.current[call.peer]?.remove()
      })
      call?.peerConnection.addEventListener('connectionstatechange', () => {
        const state = call.peerConnection.connectionState
        if (
          state === 'closed' ||
          state === 'failed' ||
          state === 'disconnected'
        ) {
          remoteVideoRef.current[call.peer]?.remove()
          console.log('disconnected')
        }
      })
    })
  }, [socket, myStream])
  useEffect(() => {
    if (!socket) return
    peerRef.current = new Peer()
    peerRef.current.on('call', (call) => {
      call.answer(myStream as MediaStream)
      call.on('stream', (userStream) => {
        if (!(call.peer in remoteVideoRef.current)) {
          addVideo(call, userStream)
        }
      })
      call.on('close', () => {
        remoteVideoRef.current[call.peer]?.remove()
      })
    })
    peerRef.current.on('open', (id) => {
      socket.emit('join_video_room', groupId, id)
    })
    return () => {
      peerRef.current?.destroy()
      socket.emit('leave_video_room', groupId)
    }
  }, [socket, myStream])
  return { myVideoRef, videoContainerRef }
}
export default usePeer
