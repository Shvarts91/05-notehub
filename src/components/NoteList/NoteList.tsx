import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import css from "./NoteList.module.css";
import { deleteIdNote } from "../../services/noteService";

interface NoteListProps {
  list: Note[];
}

const NoteList = ({ list }: NoteListProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteIdNote,
    onSuccess: (data) => {
      console.log("Notate delete:", data);
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
    },
    onError: (error) => {
      console.error("Ошибка:", error);
    },
  });

  const deleteNoteClickButton = (id: number) => {
    mutation.mutate(id);
  };
  return (
    <ul className={css.list}>
      {list.map((note) => {
        return (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button
                onClick={() => deleteNoteClickButton(note.id!)}
                className={css.button}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default NoteList;
