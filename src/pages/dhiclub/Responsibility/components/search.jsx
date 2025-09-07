import CustomSearch from "../../../../components/common/CustomSearch";

const ResponsibilitySearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search role..."
      />
    </div>
  );
};

export default ResponsibilitySearch;
