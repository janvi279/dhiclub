import CustomSearch from "../../../../components/common/CustomSearch";

const CitySearch = ({ search, setSearch }) => {

  return (
    <div className="flex justify-between items-center">

      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search City..."
      />
    </div>
  );
};

export default CitySearch;
