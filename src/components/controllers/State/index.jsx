import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAmountDownAlt, FaFilter } from "react-icons/fa";
import DataTable from "react-data-table-component";

const State = () => {
  const [stateList, setStateList] = useState([]);
  const [newState, setNewState] = useState({
    state: "",
    stateCode: "",
    status: "Active",
    createdAt: new Date().toISOString()
  });
  const [editingState, setEditingState] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingState) {
      setEditingState({ ...editingState, [name]: value });
    } else {
      setNewState({ ...newState, [name]: value });
    }
  };

  const addState = () => {
    if (newState.state && newState.stateCode) {
      setStateList([...stateList, { ...newState, createdAt: new Date().toISOString() }]);
      setNewState({ state: "", stateCode: "", status: "Active" });
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
    .filter((item) =>
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
    headCells: {
      style: {
        fontSize: '1rem',
        fontWeight: 600,
      },
    },
    cells: {
      style: {
        fontSize: '1rem',
      },
    },
    pagination: {
      style: {
        fontSize: '1rem',
      },
    },
  };

  const columns = [
    {
      name: "#",
      selector: (_, index) => index + 1,
      width: "60px"
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
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${row.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(row, index)}>Edit</button>
          <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => deleteState(index)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold">State List</h1>

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

        <div className="relative flex items-center gap-2">
          <FaSortAmountDownAlt className="text-gray-600" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        <div className="relative flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>

        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
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
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center">Add State</h2>
            <button className="absolute top-3 right-3 text-xl" onClick={() => setShowModal(false)}>×</button>
            <input name="state" placeholder="State Name" value={newState.state} onChange={handleChange} className="w-full border px-3 py-2 mb-3 rounded" />
            <input name="stateCode" placeholder="State Code" value={newState.stateCode} onChange={handleChange} className="w-full border px-3 py-2 mb-3 rounded" />
            <button className="w-full bg-indigo-600 text-white py-2 rounded" onClick={addState}>Submit</button>
          </div>
        </div>
      )}

      {/* Edit State Modal */}
      {showEditModal && editingState && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center">Edit State</h2>
            <button className="absolute top-3 right-3 text-xl" onClick={() => setShowEditModal(false)}>×</button>
            <input name="state" placeholder="State Name" value={editingState.state} onChange={handleChange} className="w-full border px-3 py-2 mb-3 rounded" />
            <input name="stateCode" placeholder="State Code" value={editingState.stateCode} onChange={handleChange} className="w-full border px-3 py-2 mb-3 rounded" />
            <button className="w-full bg-indigo-600 text-white py-2 rounded" onClick={saveState}>Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default State;
