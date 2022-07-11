import { ChangeEvent } from "react";

interface ISearch {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ value, placeholder, onChange }: ISearch) => {
  return (
    <input type="text" placeholder={placeholder} onChange={onChange} />
  );
};

export default Search;
