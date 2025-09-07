import CustomSearch from "../../../../components/common/CustomSearch";

const TeamSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Team..."
      />
    </div>
  );
};

export default TeamSearch;
