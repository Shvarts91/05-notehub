import axios, { type AxiosResponse } from "axios";
import type Note from "../types/note";
import type { NoteWithoutId } from "../types/note";

interface Notes {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  perPage: number;
  search: string;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<Notes> => {
  const params = {
    page,
    perPage,
  } as FetchNotesParams;

  if (search) params.search = search;

  const response: AxiosResponse<Notes> = await axios.get(
    "https://notehub-public.goit.study/api/notes",
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
      params,
    }
  );

  return response.data;
};



export const createNote = async (payload: NoteWithoutId): Promise<Note> => {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    payload,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};

interface DelleteIdNote {
  id: number;
}

export const deleteNote = async ({ id }: DelleteIdNote): Promise<void> => {
  const response = await axios.delete(
    `https://notehub-public.goit.study/api/notes/${id}`,

    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};
