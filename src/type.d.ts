import type {
  Conversation,
  Group,
  GroupMessage,
  PrivateMessage,
  User,
} from 'generated/index'

export type GroupMessageWithSender = GroupMessage & {
  sender: User
}

export type PrivateMessageWithSender = PrivateMessage & {
  sender: User
}

export type MessageType = 'TEXT' | 'IMAGE' | 'PDF'
export type ConversationWithMessagesWithUsers = Conversation & {
  messages: Array<PrivateMessage>
  members: Array<User>
}
export type PrivateMessageAndCursor = {
  messages: Array<PrivateMessage>
  nextCursor: string
}

export type GroupMessageAndCursor = {
  messages: Array<GroupMessage>
  nextCursor: string
}

export type GroupWithMembers = Group & {
  members: Array<User>
}
