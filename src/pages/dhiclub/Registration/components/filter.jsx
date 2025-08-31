import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const CityFilters = ({ filterCountry, setFilterCountry, sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 items-center">
      <CustomFilterSelect
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        options={["newest", "oldest"]}
        icon={FaSortAmountDownAlt}
        placeholder="Sort By"
      />
      
      <CustomFilterSelect
        value={filterCountry}
        onChange={(e) => setFilterCountry(e.target.value)}
        options={["INDIA", "USA", "UK"]}
        icon={FiFilter}
        placeholder="All Countries"
      />
    </div>
  );
};

export default CityFilters;
