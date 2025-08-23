import CustomSearch from "../../../../components/common/CustomSearch";

const BusinessDomainSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center mb-4">

      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Business Domain..."
      />
    </div>

  );

};

export default BusinessDomainSearch;
