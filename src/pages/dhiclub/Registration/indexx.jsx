import { useState, useEffect } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FiFilter } from "react-icons/fi";
import { TbArrowsSort } from "react-icons/tb";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [countryList, setCountryList] = useState([]);
  const [newCountry, setNewCountry] = useState({
    country: "",
    countryCode: "",
    countryCurrency: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  });
  const [editingCountry, setEditingCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currencyFilter, setCurrencyFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
const navigate=useNavigate();
  const currencyOptions = ["INR", "USD", "CAD", "EUR", "GBP", "AUD"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingCountry) {
      setEditingCountry({ ...editingCountry, [name]: value });
    } else {
      setNewCountry({ ...newCountry, [name]: value });
    }
  };

  const addCountry = () => {
    if (
      newCountry.country &&
      newCountry.countryCode &&
      newCountry.countryCurrency
    ) {
      setCountryList([
        ...countryList,
        { ...newCountry, createdAt: new Date().toISOString() },
      ]);
      setNewCountry({
        country: "",
        countryCode: "",
        countryCurrency: "",
        status: "Active",
      });
      setShowModal(false);
    }
  };

  const handleEdit = (row, index) => {
    setEditingCountry({ ...row, index });
    setShowEditModal(true);
  };

  const saveCountry = () => {
    const updated = [...countryList];
    updated[editingCountry.index] = { ...editingCountry };
    setCountryList(updated);
    setShowEditModal(false);
    setEditingCountry(null);
  };

  const deleteCountry = (index) => {
    setCountryList(countryList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const stored = localStorage.getItem("countries");
    if (stored) {
      try {
        setCountryList(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing countries", err);
        setCountryList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countryList));
  }, [countryList]);

  const filteredList = countryList
    .filter(
      (item) =>
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.status === statusFilter) &&
        (currencyFilter === "all" || item.countryCurrency === currencyFilter)
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

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

  const columns = [
    {
      name: "No.",
      selector: (_, index) => index + 1,
      sortable: false,
    },
    {
      name: "Member Id",
      selector: (row) => row.memberId,
      sortable: false,
    },
    {
      name: "Member Name",
      selector: (row) => row.memberName,
    },
    {
      name: "JoiningDate",
      selector: (row) => row.JoiningDate,
    },
    {
      name: "BusinessCategory",
      selector: (row) => row.BusinessCategory,
    },
    {
      name: "CompanyName",
      selector: (row) => row.CompanyName,
    },
    {
      name: "PersonalNumber",
      selector: (row) => row.PersonalNumber,
    },
    {
      name: "Email ID",
      selector: (row) => row.EmailID,
    },
    
    {
      name: "Status",
      selector: (row) => row.status,

      cell: (row) => (
        <span
          className={`px-5 py-1.5 rounded-full  ${
            row.status === "Active"
              ? "bg-primary-350 text-primary-400 font-semibold  "
              : "bg-primary-450 text-primary-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex gap-3">
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
            onClick={() => handleEdit(row, index)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
            onClick={() => deleteCountry(index)}
          >
            <MdOutlineDelete />
          </button>
          <button
            className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
            onClick={() => deleteCountry(index)}
          >
            Active
          </button>
          <button
            className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
            onClick={() => deleteCountry(index)}
          >
            Deactive
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="font-poppins text-primary-150 font-semibold text-xl ">
          New Registration
        </h1>

        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Sort Icon + Dropdown */}
        <div className="relative flex items-center ">
          <TbArrowsSort className="text-primary-200 text-xl" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-1 py-2 font-poppins font-semibold text-md text-primary-150  focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Status Filter Icon + Dropdown */}
        <div className="relative flex items-center ">
          <FiFilter className="text-primary-200 text-xl" />
          {/* <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-1 py-2 font-poppins font-semibold text-md text-primary-150 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select> */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-1 py-2 font-poppins font-semibold text-md text-primary-150  focus:outline-none"
          >
            <option value="newest">All Status</option>
            <option value="oldest">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>

       
      
        <button
          className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
          onClick={() => navigate("/Dhiclub/registration/AddRegistration")}
        >
          <FaPlus /> Add
        </button>
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredList}
          pagination
          highlightOnHover
          striped
          responsive
          customStyles={customStyles}
          rowStyle={{ borderBottom: "none" }}
        />
      </div>

      {/* Modals remain unchanged */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-primary-250 py-5 px-10 rounded-2xl shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center text-primary-150">
              Add Country
            </h2>
            <button
              className="absolute top-3  right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <input
              name="country"
              placeholder="Country Name"
              value={newCountry.country}
              onChange={handleChange}
              className=" focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <input
              name="countryCode"
              placeholder="Country Code"
              value={newCountry.countryCode}
              onChange={handleChange}
              className=" focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <select
              name="countryCurrency"
              value={newCountry.countryCurrency}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            >
              <option value="">Select Currency</option>
              {currencyOptions.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <button
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
              onClick={addCountry}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Add and Edit Modal Code Here */}
      {showEditModal && editingCountry && (
        <div className=" text-primary-150 fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Edit Country
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setShowEditModal(false)}
            >
              ×
            </button>

            <input
              name="country"
              placeholder="Country Name"
              value={editingCountry.country}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <input
              name="countryCode"
              placeholder="Country Code"
              value={editingCountry.countryCode}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <select
              name="countryCurrency"
              value={editingCountry.countryCurrency}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            >
              <option value="">Select Currency</option>
              {currencyOptions.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <button
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full hover:bg-indigo-700"
              onClick={saveCountry}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;
