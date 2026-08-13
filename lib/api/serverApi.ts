import type { AxiosResponse } from 'axios'
import { api } from './api'
import type { FetchNotesParams, FetchNotesResponse } from './clientApi'
import type { Note } from '@/types/note'
import type { User } from '@/types/user'
import { cookies } from 'next/headers'

interface SessionResponse {
  success: boolean
}

const createServerConfig = (cookie: string) => ({
  headers: {
    Cookie: cookie,
  },
})

const getCookieHeader = async (cookie?: string) => {
  if (cookie) {
    return cookie
  }

  const cookieStore = await cookies()
  return cookieStore.toString()
}

export const fetchNotes = async (
  params: FetchNotesParams,
  cookie?: string
): Promise<FetchNotesResponse> => {
  const cookieHeader = await getCookieHeader(cookie)
  const response = await api.get<FetchNotesResponse>('/notes', {
    ...createServerConfig(cookieHeader),
    params,
  })

  return response.data
}

export const fetchNoteById = async (
  id: string,
  cookie?: string
): Promise<Note> => {
  const cookieHeader = await getCookieHeader(cookie)
  const response = await api.get<Note>(
    `/notes/${id}`,
    createServerConfig(cookieHeader)
  )

  return response.data
}

export const getMe = async (cookie?: string): Promise<User> => {
  const cookieHeader = await getCookieHeader(cookie)
  const response = await api.get<User>('/users/me', createServerConfig(cookieHeader))

  return response.data
}

export const checkSession = async (
  cookie?: string
): Promise<AxiosResponse<SessionResponse>> => {
  const cookieHeader = await getCookieHeader(cookie)
  const response = await api.get<SessionResponse>(
    '/auth/session',
    createServerConfig(cookieHeader)
  )

  return response
}
