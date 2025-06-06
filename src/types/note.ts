export interface Note {
  id?: number;
  title: string;
  content: string;
  tag: string;
}

// export type NoteWithoutId = Omit<Note, "id">;
