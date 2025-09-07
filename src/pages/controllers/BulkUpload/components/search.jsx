import CustomSearch from "../../../../components/common/CustomSearch";

const Search = ({ search, setSearch }) => {

  return (
    <div className="flex justify-between items-center">

      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Country..."
      />
    </div>
  );
};

export default Search;
