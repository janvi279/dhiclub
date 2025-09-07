import CustomSearch from "../../../../components/common/CustomSearch";

const AttendanceSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search by member id..."
      />
    </div>
  );
};

export default AttendanceSearch;
