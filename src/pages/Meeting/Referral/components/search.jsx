import CustomSearch from "../../../../components/common/CustomSearch";

const TyfcbSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">

      <CustomSearch
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );

};

export default TyfcbSearch;
