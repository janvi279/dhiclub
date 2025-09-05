import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";
import { FaSortAmountDownAlt } from "react-icons/fa";

const BusinessTypeFilters = ({ sortOrder, setSortOrder }) => {
  return (
    <div className="flex gap-3 items-center">
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

export default BusinessTypeFilters;
