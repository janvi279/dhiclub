import CustomSearch from "../../../../components/common/CustomSearch";

const MemberSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Member..."
      />
    </div>
  );
};

export default MemberSearch;
