import CustomSearch from "../../../../components/common/CustomSearch";

const BusinessSearch = ({ search, setSearch }) => (
  <div className="flex justify-between items-center mb-4">

    <CustomSearch
      placeholder="Search..."
      value={search}
      onChange={setSearch}
    />
  </div>
);


export default BusinessSearch;
