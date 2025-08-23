import CustomSearch from "../../../../components/common/CustomSearch";

const BusinessCategorySearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Business Category..."
      />
    </div>
  );
};

export default BusinessCategorySearch;
