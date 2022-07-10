interface ISearch {
  placeholder: string;
  value: string;
  onChange: () => void;
}

const Search = (props: ISearch) => {
  return (
    <input type="text" placeholder={props.placeholder} />
  );
};

export default Search;
