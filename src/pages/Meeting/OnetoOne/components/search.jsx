import CustomSearch from "../../../../components/common/CustomSearch";

const OnetoOneSearch = ({ search, setSearch }) => {
  return (
    <div className="flex justify-between items-center ">
      <CustomSearch
        placeholder="Search by Met With"
        value={search}
        onChange={setSearch}
      />
    </div>
  );
};

export default OnetoOneSearch;
