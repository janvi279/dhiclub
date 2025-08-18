import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import DataTable from "react-data-table-component";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const State = () => {
  const [stateList, setStateList] = useState([]);
  const [newState, setNewState] = useState({
    state: "",
    stateCode: "",
    status: "Active",
    country: "",
    createdAt: new Date().toISOString(),
  });
  const countries = ["INDIA", "USA", "UK"];
  const [editingState, setEditingState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (showEditModal) {
      setEditingState((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addState = () => {
    if (newState.state && newState.stateCode) {
      setStateList([
        ...stateList,
        { ...newState, createdAt: new Date().toISOString() },
      ]);
      setNewState({ state: "", stateCode: "", status: "Active", country: "" });
      setShowModal(false);
    }
  };

  const handleEdit = (row, index) => {
    setEditingState({ ...row, index });
    setShowEditModal(true);
  };

  const saveState = () => {
    const updated = [...stateList];
    updated[editingState.index] = { ...editingState };
    setStateList(updated);
    setShowEditModal(false);
    setEditingState(null);
  };

  const deleteState = (index) => {
    setStateList(stateList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const stored = localStorage.getItem("states");
    if (stored) {
      try {
        setStateList(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing states", err);
        setStateList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("states", JSON.stringify(stateList));
  }, [stateList]);

  const filteredList = stateList
    .filter(
      (item) =>
        item.state.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.status === statusFilter)
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
        color: "#061237",

        border: "none",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#061237",
        fontWeight: 500,
      },
    },
  };

  const columns = [
    {
      name: "No.",
      selector: (_, index) => index + 1,
    },
    {
      name: "State Name",
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: "State Code",
      selector: (row) => row.stateCode,
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
        <div className="flex gap-5  ">
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
            key={index}
            onClick={() => handleEdit(row, index)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
            onClick={() => deleteState(index)}
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

  return (
    <div className="mx-auto text-primary-150 mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">State List</h1>

        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search State..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        <div className="relative flex items-center">
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

        <button
          className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredList}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Add State Modal */}
      {/* Add State Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center text-primary-150">
              Add State
            </h2>
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <select
              name="country"
              value={newState.country} // ✅ Correct state reference
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            >
              <option value="">Select Country</option>
              {countries.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <input
              name="state"
              placeholder="State Name"
              value={newState.state}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <input
              name="stateCode"
              placeholder="State Code"
              value={newState.stateCode}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <button
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
              onClick={addState}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit State Modal */}
      {showEditModal && editingState && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center">
              Edit State
            </h2>
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setShowEditModal(false)}
            >
              ×
            </button>

            <select
              name="country"
              value={editingState.country}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            >
              <option value="">Select Country</option>
              {countries.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <input
              name="state"
              placeholder="State Name"
              value={editingState.state}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />

            <input
              name="stateCode"
              placeholder="State Code"
              value={editingState.stateCode}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />

            <button
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
              onClick={saveState}
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default State;
