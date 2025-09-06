import type {
  Conversation,
  Group,
  GroupMessage,
  NewFriendRequest,
  PrivateMessage,
  Profile,
  User,
} from '@prisma/client'

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: Array<T>
  nextCursor?: string | null
  hasMore: boolean
}

// Request types
export interface CreateMessageRequest {
  content: string
  type: string
}

export interface CreateGroupMessageRequest extends CreateMessageRequest {
  groupId: string
}

export interface CreatePrivateMessageRequest extends CreateMessageRequest {
  friendUserId: string
  conversationId: string
}

export interface HandleFriendRequestRequest {
  request: NewFriendRequest
  state: 'agreed' | 'rejected'
}

export interface SearchUsersRequest {
  name: string
}

export interface KickUserRequest {
  groupId: string
  userId: string
}

export interface CreateGroupRequest {
  name: string
  imageUrl?: string
}

export interface UpdateRoleRequest {
  groupId: string
  userId: string
  role: 'member' | 'moderator'
}

export interface UpdateProfileRequest {
  data: Partial<Profile>
}

export interface ChatRequest {
  messages: Array<any>
}

// Extended types with relations
export interface GroupMessageWithSender extends GroupMessage {
  sender: User
}

export interface PrivateMessageWithSender extends PrivateMessage {
  sender: User
}

export interface GroupWithRelations extends Group {
  members: Array<User>
  owner: User
  moderators: Array<User>
}

export interface ConversationWithRelations extends Conversation {
  members: Array<User>
  messages: Array<PrivateMessage>
}

export interface UserWithFriends extends User {
  friends: Array<Pick<User, 'id' | 'userId' | 'fullName' | 'imageUrl'>>
}

export interface FriendRequestWithUsers extends NewFriendRequest {
  from: User
  to: User
}

// Socket types
export interface SocketAuth {
  userId: string
}

export interface VideoRoomJoin {
  groupId: string
  id: string
}

// OSS types
export interface OSSSignature {
  policy: string
  signature: string
  host: string
  [key: string]: string
}
