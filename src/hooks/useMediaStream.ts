import { useEffect, useState } from 'react'

const UseMediaStream = () => {
  const [stream, setStream] = useState<MediaStream>()
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((res) => setStream(res))
    return () => {
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [])
  return { stream }
}
export default UseMediaStream
