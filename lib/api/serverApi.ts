/* 
fetchNotes
fetchNoteById
getMe
checkSession.
*/

import { User } from "@/types/user";
import { nextServer } from "./api";
import {
  FetchNotesParams,
  FetchNotesResponse,
  SessionResponse,
} from "./clientApi";
import { Note } from "@/types/note";
import { AxiosResponse } from "axios";
import { cookies } from "next/headers";

/* Notes */
export const fetchNotes = async (
  params: FetchNotesParams,
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response: AxiosResponse<FetchNotesResponse> = await nextServer.get(
    "/notes",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
      params,
    },
  );
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieStore = await cookies();
  const { data }: AxiosResponse<Note> = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

/* Auth */

export const checkSession = async (): Promise<
  AxiosResponse<SessionResponse>
> => {
  const cookieStore = await cookies();
  const response: AxiosResponse<SessionResponse> =
    await nextServer.get<SessionResponse>("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

  return response;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
