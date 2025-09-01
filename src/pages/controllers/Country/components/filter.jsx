import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const CountryFilters = ({
  filterCountry,
  setFilterCountry,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort By */}
      <CustomFilterSelect
        value={sortOrder}
        onChange={(option) => setSortOrder(option?.value)} // ✅ fix
        options={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        icon={FaSortAmountDownAlt}
     
      />

      {/* Country Filter */}
      <CustomFilterSelect
  value={filterCountry} // string, like "all" or "USA"
  onChange={(option) => setFilterCountry(option?.value)} 
  options={[
    { value: "ALL", label: "All" },
    { value: "INDIA", label: "India" },
    { value: "USA", label: "USA" },
    { value: "UK", label: "UK" },
  ]}
  icon={FiFilter}

/>

    </div>
  );
};

export default CountryFilters;
