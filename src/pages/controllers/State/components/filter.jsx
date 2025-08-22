import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const StateFilters = ({ filterState, setFilterState, sortOrder, setSortOrder }) => {
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
        value={filterState}
        onChange={(e) => setFilterState(e.target.value)}
        options={["Gujrat", "Delhi", "maharastra"]}
        icon={FiFilter}
        placeholder="All State"
      />
    </div>
  );
};

export default StateFilters;
