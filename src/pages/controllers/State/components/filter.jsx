import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const StateFilters = ({ filterState, setFilterState, sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort By */}
      <CustomFilterSelect
        value={sortOrder}
        onChange={(option) => setSortOrder(option?.value)} // ✅ same as CountryFilters
        options={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        icon={FaSortAmountDownAlt}
      />

      {/* State Filter */}
      <CustomFilterSelect
  value={filterState}
  onChange={(option) => setFilterState(option?.value)}
  options={[
    { value: "ALL", label: "All" },
    { value: "GUJARAT", label: "Gujarat" },
    { value: "DELHI", label: "Delhi" },
    { value: "MAHARASHTRA", label: "Maharashtra" },
  ]}
  icon={FiFilter}
/>

    </div>
  );
};

export default StateFilters;
