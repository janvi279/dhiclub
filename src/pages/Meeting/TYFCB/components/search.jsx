import CustomSearch from "../../../../components/common/CustomSearch";

const TyfcbSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search by member name..."
      />
    </div>
  );
};

export default TyfcbSearch;
