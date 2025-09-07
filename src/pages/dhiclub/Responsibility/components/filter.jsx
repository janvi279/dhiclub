import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const ResponsibilityFilters = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => {
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

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(option) => setStatusFilter(option?.value)}
        options={[
          { value: "all", label: "All Status" },
          { value: "Active", label: "Active" },
          { value: "Deactive", label: "Deactive" },
        ]}
        icon={FiFilter}
        placeholder="Status"
      />
    </div>
  );
};

export default ResponsibilityFilters;
