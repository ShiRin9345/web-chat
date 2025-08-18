import { createFileRoute, useParams } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import Peer from 'peerjs'
import type { MediaConnection } from 'peerjs'
import useMediaStream from '@/hooks/useMediaStream.tsx'
import { useSocket } from '@/providers/socketProvider.tsx'

export const Route = createFileRoute('/(main)/group/video/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/video/$groupId' })
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const myVideoRef = useRef<HTMLVideoElement>(null)
  const { socket } = useSocket()
  const { stream: myStream } = useMediaStream()
  const peerRef = useRef<Peer | null>(null)
  const remoteVideoRef = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const addVideo = (call: MediaConnection, stream: MediaStream) => {
    const video = document.createElement('video')
    console.log(stream)
    video.srcObject = stream
    video.autoplay = true
    video.playsInline = true
    video.width = 200
    video.height = 200
    videoContainerRef.current.append(video)
    remoteVideoRef.current[call.peer] = video
    console.log('add video')
  }
  useEffect(() => {
    myVideoRef.current.srcObject = myStream
  }, [myStream])
  useEffect(() => {
    if (!socket) return
    socket.on('user_connected', (id: string) => {
      console.log('user connected', id)
      console.log('ready to call the stream is ', myStream)
      const call = peerRef.current?.call(id, myStream as MediaStream)
      console.log(call)
      call?.on('stream', (userStream) => {
        console.log('user stream setup')

        if (!(call.peer in remoteVideoRef.current)) {
          addVideo(call, userStream)
        }
      })
      call?.on('close', () => {
        remoteVideoRef.current[call.peer]?.remove()
        console.log('close')
      })
      call?.peerConnection.addEventListener('connectionstatechange', () => {
        const state = call?.peerConnection.connectionState
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
      console.log('receive a call , now mystream is ', myStream)
      call.on('stream', (userStream) => {
        if (!(call.peer in remoteVideoRef.current)) {
          addVideo(call, userStream)
        }
      })
      call.on('close', () => {
        remoteVideoRef.current[call.peer]?.remove()
        console.log('close')
      })
    })
    peerRef.current.on('open', (id) => {
      console.log('open', id)
      socket.emit('join_video_room', groupId, id)
      console.log(id)
    })
    return () => {
      peerRef.current?.destroy()
      socket.emit('leave_video_room', groupId)
    }
  }, [socket, myStream])
  return (
    <div className="w-full h-dvh flex gap-2 flex-wrap" ref={videoContainerRef}>
      <video
        playsInline
        autoPlay
        className="w-[200px] h-[200px]"
        ref={myVideoRef}
      />
    </div>
  )
}
