import CustomFilterSelect from "../../../../components/common/CustomFilterSelect";
import { FaSortAmountDownAlt } from "react-icons/fa";


const BusinessTypeFilters = ({ sortOrder, setSortOrder }) => {
  return (
   <div className="flex gap-3 items-center">
      <CustomFilterSelect
        value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
        options={["newest", "oldest"]}
        icon={FaSortAmountDownAlt}
        placeholder="Sort By"/>
    </div>
  );
};

export default BusinessTypeFilters;
