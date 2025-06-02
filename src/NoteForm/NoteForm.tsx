import { Field, ErrorMessage, Form, Formik, type FormikHelpers } from "formik";
import { useId } from "react";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NoteWithoutId } from "../types/note";

const OrderSchema = Yup.object().shape({
  title: Yup.string()
    .required("This field is required!")
    .min(3, "Too short")
    .max(50, "Too long"),
  content: Yup.string().max(500, "Too long"),
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
    .required("This field is required!"),
});

const initialValues: NoteWithoutId = {
  title: "",
  content: "",
  tag: "",
};

interface NoteFormProps {
  closeModal: () => void;
  onCreateNote: (noteValues: NoteWithoutId) => void;
}

const NoteForm = ({ closeModal, onCreateNote }: NoteFormProps) => {
  const fieldId = useId();

  const handleSubmit = (
    values: NoteWithoutId,
    actions: FormikHelpers<NoteWithoutId>
  ) => {
    onCreateNote(values);
    actions.resetForm();
    closeModal();
  };

  return (
    <Formik
      validationSchema={OrderSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field id={`${fieldId}-title`} name="title" className={css.input} />
          <ErrorMessage component="span" className={css.error} name="title" />
        </fieldset>
        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${fieldId}-content`}
            name="content"
            className={css.textarea}
            rows={8}
          />
          <ErrorMessage component="span" className={css.error} name="content" />
        </fieldset>
        <fieldset className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            as="select"
            id={`${fieldId}-tag`}
            name="tag"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="span" className={css.error} name="tag" />
        </fieldset>
        <fieldset className={css.actions}>
          <button
            onClick={closeModal}
            type="button"
            className={css.cancelButton}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </fieldset>
      </Form>
    </Formik>
  );
};
export default NoteForm;
