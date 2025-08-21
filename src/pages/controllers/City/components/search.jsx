import { FaSearch } from "react-icons/fa";

const CitySearch = ({ search, setSearch }) => {
  return (
   <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Country..."
               value={search}
      onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
    
  );

  
          
};

export default CitySearch;
