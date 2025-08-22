import CustomSearch from "../../../../components/common/CustomSearch";

const StateSearch = ({ search, setSearch }) => {

  return (
    <div className="flex justify-between items-center mb-4">

      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search State..."
      />
    </div>
  );
};

export default StateSearch;
