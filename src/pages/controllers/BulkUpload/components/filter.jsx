import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const Filters = ({
  filterCountry,
  setFilterCountry,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort Order */}
      <CustomFilterSelect
        value={sortOrder}
        onChange={(option) => setSortOrder(option?.value)}
        options={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        icon={FaSortAmountDownAlt}
        placeholder="Sort By"
      />

      {/* Country Filter */}
      <CustomFilterSelect
        value={filterCountry}
        onChange={(option) => setFilterCountry(option?.value)}
        options={[
          { value: "", label: "All Countries" },
          { value: "India", label: "India" },
          { value: "USA", label: "USA" },
          { value: "UK", label: "UK" },
        ]}
        icon={FiFilter}
        placeholder="All Countries"
      />
    </div>
  );
};

export default Filters;
