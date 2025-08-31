import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const BusinessCategoryFilters = ({
  sortOrder,
  setSortOrder,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort */}
      <CustomFilterSelect
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        options={["newest", "oldest"]}
        icon={FaSortAmountDownAlt}

      />

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        options={["all", "Active", "Deactive"]}
        icon={FiFilter}

      />
    </div>
  );
};

export default BusinessCategoryFilters;
