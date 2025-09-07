import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const MemberFilters = ({ filterStatus, setFilterStatus, sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sort Filter */}
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
        value={filterStatus}
        onChange={(option) => setFilterStatus(option?.value)}
        options={[
          { value: "ALL", label: "All Status" },
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
        icon={FiFilter}
        placeholder="Status"
      />
    </div>
  );
};

export default MemberFilters;
