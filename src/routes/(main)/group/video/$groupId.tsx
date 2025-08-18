import { createFileRoute, useParams } from '@tanstack/react-router'
import type { MediaConnection } from 'peerjs'
import Peer from 'peerjs'
import { useEffect, useRef, useState } from 'react'
import { useSocket } from '@/providers/socketProvider.tsx'

export const Route = createFileRoute('/(main)/group/video/$groupId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { groupId } = useParams({ from: '/(main)/group/video/$groupId' })
  const { socket } = useSocket()
  const [peer, setPeer] = useState<Peer>(new Peer())
  const [peers, setPeers] = useState<{ [key: string]: MediaConnection }>({})
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const myVideoRef = useRef<HTMLVideoElement>(null)
  const userVideoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    let currentStream: MediaStream | null = null
    let myId: string | null = null
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((myStream) => {
        myVideoRef.current.srcObject = myStream
        currentStream = myStream
        myVideoRef.current?.addEventListener('loadedmetadata', () => {
          myVideoRef.current?.play()
        })

        peer.on('call', (call) => {
          call.answer(myStream)
          call.on('stream', (userStream) => {
            if (userVideoRef.current) {
              userVideoRef.current.srcObject = userStream
              userVideoRef.current.addEventListener('loadedmetadata', () => {
                userVideoRef.current?.play()
              })
            }
          })
        })
        socket.on('user_disconnected', (id: string) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if (peers[id]) peers[id].close()
        })

        socket.on('user_connected', (id) => {
          const call = peer.call(id, myStream)
          call.on('stream', (userStream) => {
            if (userVideoRef.current) {
              userVideoRef.current.srcObject = userStream
              userVideoRef.current.addEventListener('loadedmetadata', () => {
                userVideoRef.current?.play()
              })
            }
          })
          call.on('close', () => {
            console.log('close')
            if (userVideoRef.current) {
              userVideoRef.current.srcObject = null
            }
          })
          setPeers((prev) => ({ ...prev, id: call }))
        })
      })
      .catch((error) => console.error(error))
    peer.on('open', (id) => {
      console.log(id)
      socket.emit('join_video_room', groupId, id)
      myId = id
    })
    return () => {
      const tracks = currentStream?.getTracks()
      if (tracks) {
        tracks.forEach((track) => {
          track.stop()
          track.enabled = false
          currentStream?.removeTrack(track)
          console.log('track', track)
        })
      }
      socket.emit('leave_video_room', groupId, myId)
    }
  }, [socket])
  return (
    <div className="w-full h-dvh" ref={videoContainerRef}>
      <video playsInline ref={myVideoRef} />
      <video playsInline ref={userVideoRef} />
    </div>
  )
}
