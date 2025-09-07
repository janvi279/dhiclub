import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const OnetoOneFilters = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => {
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

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(option) => setStatusFilter(option?.value)}
        options={[
          { value: "ALL", label: "All Status" },
          { value: "Active", label: "Active" },
          { value: "Deactive", label: "Deactive" },
        ]}
        icon={FiFilter}
      />
    </div>
  );
};

export default OnetoOneFilters;
