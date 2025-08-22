import { FaSearch } from "react-icons/fa";

const CustomSearch = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="relative w-64">
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
      />
    </div>
  );
};

export default CustomSearch;
