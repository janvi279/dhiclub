import { FiFilter } from "react-icons/fi";
import { FaSortAmountDownAlt } from "react-icons/fa";

const CityFilters = ({ filterCountry, setFilterCountry }) => {
  return (
 <>
      <div className="relative flex items-center">
              <FaSortAmountDownAlt className="text-primary-200" />
              <select
               
            
                className="px-1 font-semibold	text-primary-150 py-2 text-base focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          <div className="relative flex items-center">
            <FiFilter className="text-primary-200 text-xl" />
    <select
      value={filterCountry}
      onChange={(e) => setFilterCountry(e.target.value)}
          className="px-1 font-semibold	text-primary-150 py-2 text-base focus:outline-none"
    >
      <option value="">All</option>
      <option value="India">India</option>
      <option value="USA">USA</option>
      <option value="UK">UK</option>
    </select>
    </div>
 </>
    
  );
 
};

export default CityFilters;
