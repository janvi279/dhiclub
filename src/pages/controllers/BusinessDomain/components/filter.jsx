import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const businessTypes = ["Tiles", "Ceramic", "Sanitary"];

const BusinessDomainFilters = ({
  sortOrder,
  setSortOrder,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
}) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort */}
      <CustomFilterSelect
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        options={["Newest", "Oldest"]}
        icon={FaSortAmountDownAlt}
        placeholder="Sort By"
      />

      {/* Type Filter */}
      <CustomFilterSelect
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        options={["All Business Types", ...businessTypes]}
        icon={FiFilter}
        placeholder="Business Type"
      />

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        options={["All", "Active", "Deactive"]}
        icon={FiFilter}
        placeholder="Status"
      />
    </div>
  );
};

export default BusinessDomainFilters;
