import { Loader, Mail, MapPin, Mars, Phone, Quote, Venus } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import type { User } from 'generated/index'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge'
import { senderUserProfileQueryOptions } from '@/features/reactQuery/options'
import { getLocationName } from '@/lib/locationUtils'

export function UserProfile({
  userId,
  sender,
}: {
  userId: string
  sender: Pick<User, 'userId' | 'fullName' | 'imageUrl' | 'code'>
}) {
  const { data: profile } = useQuery(senderUserProfileQueryOptions(userId))

  if (!profile) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 orange:bg-orange-50 border border-gray-200 dark:border-gray-700 orange:border-orange-200 rounded-lg shadow-lg overflow-hidden">
      {profile.bgImageUrl && (
        <div className="relative h-32 rounded-t-lg overflow-hidden">
          <img
            src={profile.bgImageUrl}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <div className="text-center pb-4 px-6">
        <div
          className={`relative mb-4 ${profile.bgImageUrl ? '-mt-16' : 'mt-6'}`}
        >
          <Avatar className="w-24 h-24 mx-auto border-4 border-white dark:border-gray-900 orange:border-orange-50 shadow-lg">
            <AvatarImage
              src={sender.imageUrl}
              alt="User"
              className="object-cover"
            />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-semibold">
              <Loader className="animate-spin" />
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white orange:text-orange-900">
            {sender.fullName}
          </h1>
          {sender.code && (
            <p className="text-sm text-gray-500 dark:text-gray-400 orange:text-orange-700 font-mono">
              #{sender.code}
            </p>
          )}
          <div className="flex items-center justify-center gap-2">
            {profile.sex === 'man' ? (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 orange:bg-blue-100 orange:text-blue-800"
              >
                <Mars className="w-3 h-3" />
              </Badge>
            ) : (
              <Badge
                variant="secondary"
                className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 orange:bg-pink-100 orange:text-pink-800"
              >
                <Venus className="w-3 h-3" />
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        <div className="space-y-3">
          {profile.email && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 orange:bg-orange-100">
              <Mail className="w-4 h-4 text-gray-500 dark:text-gray-400 orange:text-orange-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300 orange:text-orange-800">
                {profile.email}
              </span>
            </div>
          )}

          {profile.phone && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 orange:bg-orange-100">
              <Phone className="w-4 h-4 text-gray-500 dark:text-gray-400 orange:text-orange-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300 orange:text-orange-800">
                {profile.phone}
              </span>
            </div>
          )}

          {profile.position && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 orange:bg-orange-100">
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400 orange:text-orange-600" />
              <span className="text-sm text-gray-700 dark:text-gray-300 orange:text-orange-800">
                {getLocationName(profile.position)}
              </span>
            </div>
          )}
        </div>

        {profile.signature && (
          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 orange:from-orange-50 orange:to-orange-100 border border-blue-200 dark:border-blue-700 orange:border-orange-200">
            <div className="flex items-start gap-2">
              <Quote className="w-4 h-4 text-blue-500 dark:text-blue-400 orange:text-orange-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm italic text-gray-700 dark:text-gray-300 orange:text-orange-800">
                "{profile.signature}"
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
