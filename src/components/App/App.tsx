import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import css from "./App.module.css";
import SearchBox from "../SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../services/noteService";
import Pagination from "../Pagination/Pagination";
import NoteModal from "../NoteModal/NoteModal";
import { useDebounce } from "use-debounce";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { data, isError, isPending } = useQuery({
    queryKey: ["noteList", currentPage, debouncedSearchQuery],
    queryFn: () => fetchNotes(currentPage, debouncedSearchQuery),
    placeholderData: keepPreviousData,
  });

  const onPageChange = (page: number) => {
    setCurrentPage(page + 1);
  };

  const updateSearchQuery = (text: string) => {
    setCurrentPage(1);
    setSearchQuery(text);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox searchQuery={searchQuery} onChange={updateSearchQuery} />
        {data?.totalPages && (
          <Pagination
            onPageChange={onPageChange}
            totalPages={data.totalPages}
            currentPage={currentPage}
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
