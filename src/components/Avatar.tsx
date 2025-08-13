import { useUser } from '@clerk/clerk-react'
import HeaderUser from '@/integrations/clerk/header.tsx'
import Indicator from '@/components/indicator.tsx'

const Avatar = () => {
  const { user } = useUser()
  return (
    <div className="flex items-center space-x-2 ">
      <div className="flex flex-col justify-center items-center">
        <span className="text-center  text-md font-semibold">
          {user?.fullName}
        </span>
        <Indicator />
      </div>
      <div className="flex-shrink-0">
        <HeaderUser />
      </div>
    </div>
  )
}
export default Avatar
