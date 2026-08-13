/* 
fetchNotes
fetchNoteById
createNote
deleteNote
register
login
logout
checkSession
getMe
updateMe
*/

import { User } from "@/types/user";
import { nextServer } from "./api";
import { CreateNote, Note, NoteFilter } from "@/types/note";
import { AxiosResponse } from "axios";

/* Notes */

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: NoteFilter;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await nextServer.get(
    "/notes",
    {
      params,
    },
  );
  return response.data;
};

export const createNote = async (payload: CreateNote): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.post(
    "/notes",
    payload,
    {},
  );
  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.delete(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data }: AxiosResponse<Note> = await nextServer.get(`/notes/${id}`);
  return data;
};

/* Auth */
interface userData {
  email: string;
  password: string;
}

export interface SessionResponse {
  success: boolean;
}

interface UpdateUserData {
  username?: string;
}

export const register = async (userData: userData): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", userData);
  return data;
};

export const login = async (userData: userData): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (updateData: UpdateUserData): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", updateData);
  return data;
};

export const refresh = async () => {
  const { data } = await nextServer.get("/auth/session");
  return data;
};

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<SessionResponse>("/auth/session");
  return data.success;
};
