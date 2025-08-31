import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

const AttendanceFilters = ({ sortOrder, setSortOrder, absentFilter, setAbsentFilter }) => {
  return (
    <div className="flex items-center gap-3">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <FaSortAmountDownAlt className="text-primary-200" />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* Absent Filter */}
      <div className="flex items-center gap-2">
        <FiFilter className="text-primary-200 text-xl" />
        <select
          value={absentFilter}
          onChange={(e) => setAbsentFilter(e.target.value)}
          className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
        >
          <option value="all">Filter</option>
          <option value="less5">Less than 5</option>
          <option value="more5">5 or more</option>
        </select>
      </div>
    </div>
  );
};

export default AttendanceFilters;
