import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../components/common/CustomFilterSelect";

const AccountFilters = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 items-center">
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

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(option) => setStatusFilter(option?.value)}
        options={[
          { value: "all", label: "All Status" },
          { value: "Paid", label: "Paid" },
          { value: "Pending", label: "Pending" },
          { value: "Failed", label: "Failed" },
        ]}
        icon={FiFilter}
      />
    </div>
  );
};

export default AccountFilters;
