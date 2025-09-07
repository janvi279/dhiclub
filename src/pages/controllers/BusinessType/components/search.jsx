import CustomSearch from "../../../../components/common/CustomSearch";

const BusinessTypeSearch = ({ search, setSearch }) => {
  return (
    <CustomSearch
      placeholder="Search Business Type"
      value={search}
      onChange={setSearch}
    />
  );
};

export default BusinessTypeSearch;
