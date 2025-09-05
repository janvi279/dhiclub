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
        onChange={(option) => setSortOrder(option?.value)} // ✅ fixed
        options={[
          { value: "newest", label: "Newest" },
          { value: "oldest", label: "Oldest" },
        ]}
        icon={FaSortAmountDownAlt}
      />

      {/* Type Filter */}
      <CustomFilterSelect
        value={typeFilter}
        onChange={(option) => setTypeFilter(option?.value)} // ✅ fixed
        options={[
          { value: "ALL", label: "All Business Types" },
          ...businessTypes.map((t) => ({ value: t, label: t })),
        ]}
        icon={FiFilter}
        placeholder="Business Type"
      />

      {/* Status Filter */}
      <CustomFilterSelect
        value={statusFilter}
        onChange={(option) => setStatusFilter(option?.value)} // ✅ fixed
        options={[
          { value: "ALL", label: "All" },
          { value: "Active", label: "Active" },
          { value: "Deactive", label: "Deactive" },
        ]}
        icon={FiFilter}
        placeholder="Status"
      />
    </div>
  );
};

export default BusinessDomainFilters;
