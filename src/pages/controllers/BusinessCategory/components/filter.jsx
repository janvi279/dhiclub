import { FaSortAmountDownAlt } from "react-icons/fa";
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
        onChange={(val) => setSortOrder(val?.value)} // ✅ use value
        options={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        icon={FaSortAmountDownAlt}
      />

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(val) => setStatusFilter(val?.value)} // ✅ fixed here
        options={[
          { value: "all", label: "All" },
          { value: "Active", label: "Active" },
          { value: "Deactive", label: "Deactive" },
        ]}
      />
    </div>
  );
};

export default BusinessCategoryFilters;
