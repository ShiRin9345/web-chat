import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import type { GroupMessage } from 'generated/index'

export const Route = createFileRoute('/(main)/group/$groupId')({})
