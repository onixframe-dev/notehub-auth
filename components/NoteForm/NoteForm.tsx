"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoteFilter } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteDraft } from "@/lib/store/noteStore";
import { createNote } from "@/lib/api/clientApi";

export default function NoteForm() {
  const { noteData, setNoteData, clearNoteData } = useNoteDraft();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearNoteData();
      router.push("/notes/filter/all");
      router.refresh();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({ ...noteData });
  };

  const onChangeData = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const inputValue = event.target.value;
    setNoteData({ ...noteData, [event.target.name]: inputValue });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.formGroup}>
        Title
        <input
          onChange={onChangeData}
          className={css.input}
          type="text"
          name="title"
          value={noteData.title}
        />
      </label>

      <label className={css.formGroup}>
        Content
        <textarea
          onChange={onChangeData}
          className={css.textarea}
          name="content"
          value={noteData.content}
        ></textarea>
      </label>

      <label className={css.formGroup}>
        Tag
        <select
          onChange={onChangeData}
          className={css.select}
          name="tag"
          value={noteData.tag}
        >
          <option value={NoteFilter.Todo}>Todo</option>
          <option value={NoteFilter.Work}>Work</option>
          <option value={NoteFilter.Personal}>Personal</option>
          <option value={NoteFilter.Meeting}>Meeting</option>
          <option value={NoteFilter.Shopping}>Shopping</option>
        </select>
      </label>

      <div className={css.actions}>
        <button
          className={css.cancelButton}
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className={css.submitButton} type="submit">
          Create note
        </button>
      </div>
    </form>
  );
}
