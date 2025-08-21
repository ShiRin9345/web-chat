import type {
  Conversation,
  GroupMessage,
  PrivateMessage,
  User,
} from 'generated/index'

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
