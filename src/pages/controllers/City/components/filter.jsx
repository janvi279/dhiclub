import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const CityFilters = ({ filterCity, setFilterCity, sortOrder, setSortOrder }) => {
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
      />

      {/* City Filter */}
      <CustomFilterSelect
        value={filterCity}
        onChange={(option) => setFilterCity(option?.value)}
        options={[
          { value: "ALL", label: "All" },
          { value: "Rajkot", label: "Rajkot" },
          { value: "Ahmedabad", label: "Ahmedabad" },
          { value: "Surat", label: "Surat" },
        ]}
        icon={FiFilter}
      />

    </div>
  );
};

export default CityFilters;
