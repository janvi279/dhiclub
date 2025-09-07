import CustomSearch from "../../../../components/common/CustomSearch";

const VisitorSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center">
      <CustomSearch
        value={search}
        onChange={setSearch}
        placeholder="Search visitor name"
      />
    </div>
  );
};

export default VisitorSearch;
