import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteForm from "../NoteForm/NoteForm";
import css from "./NoteModal.module.css";

import { createPortal } from "react-dom";
import { createNote } from "../services/noteService";
import type { NoteWithoutId } from "../types/note";

interface NoteModalProps {
  closeModal: () => void;
}

const NoteModal = ({ closeModal }: NoteModalProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["noteList"] });
    },
    onError: (error) => {
      console.error("Ошибка:", error);
    },
  });

  const onCreateNote = (noteValues: NoteWithoutId) => {
    mutation.mutate(noteValues);
  };

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true">
      <div className={css.modal}>
        <NoteForm onCreateNote={onCreateNote} closeModal={closeModal} />
      </div>
    </div>,
    document.body
  );
};

export default NoteModal;
