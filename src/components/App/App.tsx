import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Padination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import { useDebounce } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isError, isPending } = useQuery({
    queryKey: ["noteList", pageCount, debouncedSearchQuery],
    queryFn: () =>
      fetchNotes({ page: pageCount, perPage: 12, search: searchQuery }),
    placeholderData: keepPreviousData,
  });

  const updateSearchQuery = (text: string) => {
    setSearchQuery(text);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={updateSearchQuery} />
        {data?.totalPages && (
          <Pagination
            setCurrentPage={setPageCount}
            totalPages={data.totalPages}
            pageCount={pageCount}
          />
        )}

        <button onClick={() => setIsOpenModal(true)} className={css.button}>
          Create note +
        </button>
      </header>
      {isOpenModal && <NoteModal closeModal={closeModal} />}
      {isPending && <Loader />}
      {data?.notes && <NoteList list={data.notes} />}
      {isError && <ErrorMessage />}
    </div>
  );
}

export default App;
