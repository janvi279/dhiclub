import CustomSearch from "../../../../components/common/CustomSearch";

const BusinessTypeSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center mb-4">

      <CustomSearch
         placeholder="Search Business Type"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default BusinessTypeSearch;
