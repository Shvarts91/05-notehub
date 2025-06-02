import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (text: string) => void;
}

const SearchBox = ({ onChange }: SearchBoxProps) => {
  return (
    <input
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        onChange(event.target.value)
      }
      className={css.input}
      type="text"
      placeholder="Search notes"
    />
  );
};

export default SearchBox;
