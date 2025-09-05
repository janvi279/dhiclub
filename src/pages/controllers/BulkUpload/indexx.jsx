import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaSortAmountDownAlt,
  FaFilter,
} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const countries = ["India", "USA", "Canada"];
const states = {
  India: ["Gujarat", "Maharashtra", "Delhi"],
  USA: ["California", "Texas", "Florida"],
  Canada: ["Ontario", "Quebec", "British Columbia"],
};
const currencies = {
  India: "INR",
  USA: "USD",
  Canada: "CAD",
};

const BulkUpload = () => {
  const [cityList, setCityList] = useState([]);
  const [formData, setFormData] = useState({
    country: "",
    countryCode: "",
    countryCurrency: "",
    state: "",
    stateCode: "",
    city: "",
    cityCode: "",
    pinCode: "",
    status: "Active",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "country"
        ? {
            state: "",
            countryCurrency: currencies[value] || "",
          }
        : {}),
    }));
  };

  const addOrEditCity = () => {
    if (
      !formData.city ||
      !formData.cityCode ||
      !formData.state ||
      !formData.country
    )
      return;

    const updatedCity = { ...formData, createdAt: new Date().toISOString() };
    if (editingIndex !== null) {
      const updatedList = [...cityList];
      updatedList[editingIndex] = updatedCity;
      setCityList(updatedList);
    } else {
      setCityList((prev) => [...prev, updatedCity]);
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      country: "",
      countryCode: "",
      countryCurrency: "",
      state: "",
      stateCode: "",
      city: "",
      cityCode: "",
      pinCode: "",
      status: "Active",
    });
    setEditingIndex(null);
  };

  const deleteCity = (index) => {
    setCityList(cityList.filter((_, i) => i !== index));
  };

  const editCity = (index) => {
    const city = cityList[index];
    setFormData({ ...city });
    setEditingIndex(index);
    setShowModal(true);
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

  const filteredCities = cityList
    .filter((c) => c.city.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const columns = [
    { name: "No.", selector: (_, index) => index + 1, width: "60px" },
    { name: "Country", selector: (row) => row.country },
    { name: "Country Code", selector: (row) => row.countryCode },
    { name: "Currency", selector: (row) => row.countryCurrency },
    { name: "State", selector: (row) => row.state },
    { name: "State Code", selector: (row) => row.stateCode },
    { name: "City", selector: (row) => row.city },
    { name: "City Code", selector: (row) => row.cityCode },
    { name: "Pin Code", selector: (row) => row.pinCode },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            row.status === "Active"
              ? "bg-primary-350 text-primary-400"
              : "bg-primary-450 text-primary-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      width: "230px",
      cell: (_, index) => (
        <div className="flex gap-2">
          <button
            onClick={() => editCity(index)}
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          >
            <FaRegEdit />
          </button>
          <button
            onClick={() => deleteCity(index)}
            className="text-primary-200  text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          >
            <MdDeleteOutline />
          </button>
          <button
            className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
            onClick={() => deleteState(index)}
          >
            Active
          </button>
          <button
            className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
            onClick={() => deleteState(index)}
          >
            Deactive
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        border: "none",
        backgroundColor: "#F5F8FD",
        borderRadius: "10px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#000000",

        border: "none",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#000000",
        fontWeight: 500,
      },
    },
  };

  return (
    <div className="text-primary-150 mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">
          BulkUpload Country
        </h1>
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
        <div className="flex gap-4 items-center">
          <div className="relative flex items-center">
            <FiFilter className="text-primary-200 text-xl" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-1 font-semibold	text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <FaSortAmountDownAlt className="text-primary-200" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-1 font-semibold	text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredCities}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {showModal && (
        <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-200 relative">
            <h2 className="text-xl font-semibold mb-4 text-center text-primary-150">
              {editingIndex !== null ? "Edit" : "Add"}
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              >
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="countryCode"
                placeholder="Country Code"
                value={formData.countryCode}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              />

              <input
                type="text"
                name="countryCurrency"
                placeholder="Country Currency"
                value={formData.countryCurrency}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              />

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              >
                <option value="">Select State</option>
                {(states[formData.country] || []).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="stateCode"
                placeholder="State Code"
                value={formData.stateCode}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City Name"
                value={formData.city}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              />
              <input
                type="text"
                name="cityCode"
                placeholder="City Code"
                value={formData.cityCode}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              />
              <input
                type="text"
                name="pinCode"
                placeholder="Pin Code"
                value={formData.pinCode}
                onChange={handleChange}
                className="border border-gray-300 px-3 py-2 rounded-2xl focus:outline-none"
              />
            </div>

            <button
              onClick={addOrEditCity}
              className="mt-4 w-50 block mx-auto bg-primary-200 text-white py-2 rounded-full"
            >
              {editingIndex !== null ? "Save Changes" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
