import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const VisitorFilters = ({ sortOrder, setSortOrder, cityFilter, setCityFilter }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort */}
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

      {/* City Filter */}
      <CustomFilterSelect
        value={cityFilter}
        onChange={(option) => setCityFilter(option?.value)}
        options={[
          { value: "all", label: "All Cities" },
          { value: "Rajkot", label: "Rajkot" },
          { value: "Ahmedabad", label: "Ahmedabad" },
          { value: "Mumbai", label: "Mumbai" },
        ]}
        icon={FiFilter}
        placeholder="City"
      />
    </div>
  );
};

export default VisitorFilters;
