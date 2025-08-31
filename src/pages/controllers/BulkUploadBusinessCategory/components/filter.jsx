import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";
import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";

const BusinessFilters = ({ statusFilter, setStatusFilter, sortOrder, setSortOrder }) => (
  <div className="flex gap-3 items-center">
    <CustomFilterSelect
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      options={["all", "Active", "Deactive"]}
      icon={FiFilter}

    />
    <CustomFilterSelect
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      options={["newest", "oldest"]}
      icon={FaSortAmountDownAlt}
      placeholder="Sort By"
    />
  </div>
);


export default BusinessFilters;
