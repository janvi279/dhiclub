import CustomSearch from "../../../../components/common/CustomSearch";

const CitySearch = ({ search, setSearch }) => {

  return (
    <div className="flex justify-between items-center mb-4">

      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Country..."
      />
    </div>
  );
};

export default CitySearch;
