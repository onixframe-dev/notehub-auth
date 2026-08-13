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

export const fetchNotes = async (
  params: FetchNotesParams,
  cookie?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies()
  const response = await api.get<FetchNotesResponse>('/notes', {
    ...createServerConfig(cookie ?? cookieStore.toString()),
    params,
  })

  return response.data
}

export const fetchNoteById = async (
  id: string,
  cookie?: string
): Promise<Note> => {
  const cookieStore = await cookies()
  const response = await api.get<Note>(
    `/notes/${id}`,
    createServerConfig(cookie ?? cookieStore.toString())
  )

  return response.data
}

export const getMe = async (cookie?: string): Promise<User> => {
  const cookieStore = await cookies()
  const response = await api.get<User>(
    '/users/me',
    createServerConfig(cookie ?? cookieStore.toString())
  )

  return response.data
}

export const checkSession = async (
  cookie?: string
): Promise<AxiosResponse<SessionResponse>> => {
  const cookieStore = await cookies()
  const response = await api.get<SessionResponse>(
    '/auth/session',
    createServerConfig(cookie ?? cookieStore.toString())
  )

  return response
}
