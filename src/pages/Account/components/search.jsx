import CustomSearch from "../../../components/common/CustomSearch";

const AccountSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search Transaction ID..."
      />
    </div>
  );
};

export default AccountSearch;
