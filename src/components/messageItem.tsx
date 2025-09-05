import { forwardRef, memo, useState } from 'react'
import {
  ArrowDownToLine,
  Heart,
  Loader,
  Mail,
  MapPin,
  Phone,
  Quote,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import PDFDisplay from './PDFDisplay'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import type { MessageType, User } from 'generated/index'
import type { UserResource } from '@clerk/types'
import { ImageZoom } from '@/components/ui/shadcn-io/image-zoom'
import { cn } from '@/lib/utils.ts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx'
import {
  groupWithMembersAndModeratorsAndOwnerQueryOptions,
  senderUserProfileQueryOptions,
} from '@/features/reactQuery/options'
import { Badge } from '@/components/ui/badge'

interface MessageItemProps {
  content: string
  type: MessageType
  user: UserResource
  index: number
  sender: User
  timestamp: string
}

export const PrivateMessageItem = memo(
  forwardRef<HTMLDivElement, MessageItemProps>(
    ({ content, type, user, index, sender, timestamp }, ref) => {
      const isSelfMessage = sender.userId === user.id
      return (
        <div
          data-index={index}
          className={cn(
            'w-full mt-2  flex p-2 rounded-sm items-start space-x-2',
            isSelfMessage && 'flex-row-reverse space-x-0',
          )}
          ref={ref}
        >
          <Popover>
            <PopoverTrigger>
              <Avatar className="ml-2 size-12 cursor-pointer">
                <AvatarImage
                  src={isSelfMessage ? user.imageUrl : sender.imageUrl}
                  alt="avatar"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              side={isSelfMessage ? 'left' : 'right'}
              className="p-0"
            >
              <UserProfile userId={sender.userId} sender={sender} />
            </PopoverContent>
          </Popover>

          <div className="flex space-y-2 flex-col">
            <div
              className={cn(
                'flex items-center gap-2 ',
                isSelfMessage && 'self-end',
                !isSelfMessage && 'self-start',
              )}
            >
              <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
                {sender.fullName}
              </span>
            </div>
            {type === 'TEXT' && (
              <p
                className={cn(
                  'text-sm max-w-[20rem] break-words text-white bg-blue-500 rounded-md self-start py-1 px-2',
                  isSelfMessage && 'ml-auto',
                )}
              >
                {content}
              </p>
            )}
            {type === 'IMAGE' && (
              <ImageZoom zoomMargin={100}>
                <img
                  src={content}
                  alt="image message"
                  className={cn(
                    'max-h-[25rem]  image-anchor w-auto object-contain object-left max-w-1/2 rounded-md self-start',
                    isSelfMessage && 'ml-auto',
                  )}
                  loading="lazy"
                />
                <a
                  className={cn(
                    ' rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                    isSelfMessage
                      ? 'image_download_link_right'
                      : 'image_download_link',
                  )}
                  href={content}
                  download
                >
                  <ArrowDownToLine className="cursor-pointer! size-5" />
                </a>
              </ImageZoom>
            )}
            {type === 'PDF' && (
              <div
                className={cn(
                  'w-min pdf-anchor rounded-md overflow-hidden',
                  isSelfMessage && 'ml-auto',
                )}
              >
                <PDFDisplay
                  fileName={content.split('/').pop() || 'Unknown File'}
                />
                <a
                  className={cn(
                    'rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                    isSelfMessage
                      ? 'pdf_download_link_right'
                      : 'pdf_download_link',
                  )}
                  href={content}
                  download
                >
                  <ArrowDownToLine className="cursor-pointer! size-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )
    },
  ),
)

export const GroupMessageItem = memo(
  forwardRef<HTMLDivElement, MessageItemProps>(
    ({ content, type, user, index, sender, timestamp }, ref) => {
      const isSelfMessage = sender.userId === user.id
      const { groupId } = useParams({ from: '/(main)/group/$groupId' })
      const { data: group } = useQuery(
        groupWithMembersAndModeratorsAndOwnerQueryOptions(groupId),
      )
      return (
        <div
          data-index={index}
          className={cn(
            'w-full mt-2  flex p-2 rounded-sm items-start space-x-2',
            isSelfMessage && 'flex-row-reverse space-x-0',
          )}
          ref={ref}
        >
          <Popover>
            <PopoverTrigger>
              <Avatar className="ml-2 size-12 cursor-pointer">
                <AvatarImage
                  src={isSelfMessage ? user.imageUrl : sender.imageUrl}
                  alt="avatar"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent
              side={isSelfMessage ? 'left' : 'right'}
              className="p-0"
            >
              <UserProfile userId={sender.userId} sender={sender} />
            </PopoverContent>
          </Popover>

          <div className="flex space-y-2 flex-col">
            <div
              className={cn(
                'flex items-center gap-2 ',
                isSelfMessage && 'self-end',
                !isSelfMessage && 'self-start',
              )}
            >
              {isSelfMessage && group?.owner.userId === sender.userId && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 orange:bg-orange-100 orange:text-orange-800"
                >
                  Owner
                </Badge>
              )}
              {isSelfMessage &&
                group?.moderators.some(
                  (moderator) => moderator.userId === sender.userId,
                ) && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 orange:bg-emerald-100 orange:text-emerald-800"
                  >
                    Moderator
                  </Badge>
                )}
              <span className="font-semibold text-gray-900 dark:text-white orange:text-orange-900">
                {sender.fullName}
              </span>
              {!isSelfMessage && group?.owner.userId === sender.userId && (
                <Badge
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 orange:bg-orange-100 orange:text-orange-800"
                >
                  Owner
                </Badge>
              )}
              {!isSelfMessage &&
                group?.moderators.some(
                  (moderator) => moderator.userId === sender.userId,
                ) && (
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 orange:bg-emerald-100 orange:text-emerald-800"
                  >
                    Moderator
                  </Badge>
                )}
            </div>

            {type === 'TEXT' && (
              <p
                className={cn(
                  'text-sm max-w-[20rem] break-words text-white bg-blue-500 rounded-md self-start py-1 px-2',
                  isSelfMessage && 'ml-auto',
                )}
              >
                {content}
              </p>
            )}
            {type === 'IMAGE' && (
              <ImageZoom zoomMargin={100}>
                <img
                  src={content}
                  alt="image message"
                  className={cn(
                    'max-h-[25rem]  image-anchor w-auto object-contain object-left max-w-1/2 rounded-md self-start',
                    isSelfMessage && 'ml-auto',
                  )}
                  loading="lazy"
                />
                <a
                  className={cn(
                    ' rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                    isSelfMessage
                      ? 'image_download_link_right'
                      : 'image_download_link',
                  )}
                  href={content}
                  download
                >
                  <ArrowDownToLine className="cursor-pointer! size-5" />
                </a>
              </ImageZoom>
            )}
            {type === 'PDF' && (
              <div
                className={cn(
                  'w-min pdf-anchor rounded-md overflow-hidden',
                  isSelfMessage && 'ml-auto',
                )}
              >
                <PDFDisplay
                  fileName={content.split('/').pop() || 'Unknown File'}
                />
                <a
                  className={cn(
                    'rounded-full hover:bg-zinc-300 dark:hover:bg-gray-600 orange:hover:bg-orange-300 p-1 transition duration-200 bg-white dark:bg-gray-800 orange:bg-orange-100',
                    isSelfMessage
                      ? 'pdf_download_link_right'
                      : 'pdf_download_link',
                  )}
                  href={content}
                  download
                >
                  <ArrowDownToLine className="cursor-pointer! size-5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )
    },
  ),
)

export function UserProfile({
  userId,
  sender,
}: {
  userId: string
  sender: Pick<User, 'userId' | 'fullName' | 'imageUrl'>
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
      {/* 背景图片 */}
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
        {/* 头像 */}
        <div className="relative -mt-16 mb-4">
          <Avatar className="w-24 h-24 mx-auto border-4 border-white dark:border-gray-900 orange:border-orange-50 shadow-lg">
            <AvatarImage src={sender.imageUrl} alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl font-semibold">
              <Loader className="animate-spin" />
            </AvatarFallback>
          </Avatar>
        </div>

        {/* 姓名和性别 */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white orange:text-orange-900">
            {sender.fullName}
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Badge
              variant="secondary"
              className="bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 orange:bg-pink-100 orange:text-pink-800"
            >
              <Heart className="w-3 h-3 mr-1" />
              {profile.sex === 'man' ? '男' : '女'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 space-y-4">
        {/* 联系信息 */}
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
                {profile.position}
              </span>
            </div>
          )}
        </div>

        {/* 个性签名 */}
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
