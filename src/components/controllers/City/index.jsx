import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaSortAmountDownAlt,
  FaRegEdit,
} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import DataTable from "react-data-table-component";

const City = () => {
  const [cityList, setCityList] = useState([]);
  const [newCity, setNewCity] = useState({
    city: "",
    cityCode: "",
    country: "",
    state: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  });
  const [editingCity, setEditingCity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [sortCountry] = useState(["India", "USA", "Canada"].sort());
  const [sortState] = useState(
    ["California", "Gujarat", "Maharashtra", "Texas"].sort()
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingCity) {
      setEditingCity({ ...editingCity, [name]: value });
    } else {
      setNewCity({ ...newCity, [name]: value });
    }
  };

  const addCity = () => {
    if (newCity.city && newCity.cityCode && newCity.country && newCity.state) {
      setCityList([
        ...cityList,
        { ...newCity, createdAt: new Date().toISOString() },
      ]);
      setNewCity({
        city: "",
        cityCode: "",
        country: "",
        state: "",
        status: "Active",
        createdAt: new Date().toISOString(),
      });
      setShowModal(false);
    }
  };

  const saveCity = () => {
    const updated = [...cityList];
    updated[editingCity.index] = { ...editingCity };
    setCityList(updated);
    setShowEditModal(false);
    setEditingCity(null);
  };

  const deleteCity = (index) => {
    setCityList(cityList.filter((_, i) => i !== index));
  };

  const handleEdit = (row, index) => {
    setEditingCity({ ...row, index });
    setShowEditModal(true);
  };

  useEffect(() => {
    const stored = localStorage.getItem("cities");
    if (stored) {
      try {
        setCityList(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing cities", err);
        setCityList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cityList));
  }, [cityList]);

  const filteredList = cityList
    .filter(
      (item) =>
        item.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.status === statusFilter) &&
        (countryFilter === "all" || item.country === countryFilter) &&
        (stateFilter === "all" || item.state === stateFilter)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const columns = [
    { name: "No.", selector: (_, index) => index + 1 },
    { name: "City Name", selector: (row) => row.city },
    { name: "City Code", selector: (row) => row.cityCode },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex gap-5">
          <button
            className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF]"
            onClick={() => handleEdit(row, index)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF]"
            onClick={() => deleteCity(index)}
          >
            <MdDeleteOutline />
          </button>
           <button className="text-[#429667] px-2 py-1 border-[#429667] border  font-semibold rounded-[40px] whitespace-nowrap" >Active</button>
          <button className="text-[#A00C19] px-2 py-1 border border-[#A00C19] font-semibold rounded-[40px] whitespace-nowrap">Deactive</button>
        </div>
      ),
    },
  ];


  const customStyles = {
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: 600,
        color: "#061237",
        backgroundColor:"#F5F8FD"
      },
    },
    cells: {
      style: {
        fontSize: "12px",
        color: "#061237",
        fontWeight: 500,
      },
    },
    pagination: {
      style: {
        borderTop: "none", // bottom line remove
        boxShadow: "none", // koi shadow hoy to remove
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex gap-5 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold">City List</h1>

        {/* Search */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FaSortAmountDownAlt className="text-[#6246EA]" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-semibold text-[#061237] py-2 text-base focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-[#6246EA] text-xl" />
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="font-semibold text-[#061237] py-2 text-base focus:outline-none"
            >
              <option value="all">All Countries</option>
              {sortCountry.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-[#6246EA] text-xl" />
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="font-semibold text-[#061237] py-2 text-base focus:outline-none"
            >
              <option value="all">All States</option>
              {sortState.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <FiFilter className="text-[#6246EA] text-xl" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="font-semibold text-[#061237] py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#6246EA] text-white px-4 py-2 rounded-[40px] flex items-center cursor-pointer gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredList}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-[20px] w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Add City</h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <select
              name="country"
              value={newCity.country}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            >
              <option value="">Select Country</option>
              {sortCountry.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="state"
              value={newCity.state}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            >
              <option value="">Select State</option>
              {sortState.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="city"
              placeholder="City Name"
              value={newCity.city}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            />
            <input
              type="text"
              name="cityCode"
              placeholder="City Code"
              value={newCity.cityCode}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            />

            <button
              onClick={addCity}
              className="w-50 mx-auto block bg-indigo-600 text-white py-2 rounded-[40px]"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingCity && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit City
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowEditModal(false)}
            >
              ×
            </button>

            <select
              name="country"
              value={editingCity.country}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            >
              <option value="">Select Country</option>
              {sortCountry.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              name="state"
              value={editingCity.state}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            >
              <option value="">Select State</option>
              {sortState.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="city"
              value={editingCity.city}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
              placeholder="City Name"
            />
            <input
              type="text"
              name="cityCode"
              value={editingCity.cityCode}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
              placeholder="City Code"
            />

            <button
              onClick={saveCity}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default City;
