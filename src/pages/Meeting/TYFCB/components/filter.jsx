import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";
import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";

const TyfcbFilters = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(option) => setStatusFilter(option?.value)}
        options={[
          { value: "ALL", label: "All Status" },
          { value: "PAID", label: "Paid" },
          { value: "PENDING", label: "Pending" },
        ]}
        icon={FiFilter}
      />

      {/* Sort By */}
      <CustomFilterSelect
        value={sortOrder}
        onChange={(option) => setSortOrder(option?.value)}
        options={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        icon={FaSortAmountDownAlt}
      />
    </div>
  );
};

export default TyfcbFilters;
