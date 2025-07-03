import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus, FaEdit, FaTrash, FaSortAmountDownAlt, FaFilter, FaSearch } from "react-icons/fa";

const BusinessDomain = () => {
  const [domains, setDomains] = useState([]);
  const [newDomain, setNewDomain] = useState({ type: "", name: "", status: "Active", createdAt: new Date().toISOString() });
  const [editDomain, setEditDomain] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const businessTypes = ["Tiles", "Ceramic", "Sanitary"];

  useEffect(() => {
    const stored = localStorage.getItem("businessDomains");
    if (stored) {
      try {
        setDomains(JSON.parse(stored));
      } catch {
        setDomains([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("businessDomains", JSON.stringify(domains));
  }, [domains]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editDomain) {
      setEditDomain({ ...editDomain, [name]: value });
    } else {
      setNewDomain({ ...newDomain, [name]: value });
    }
  };

  const addDomain = () => {
    if (newDomain.name && newDomain.type) {
      setDomains([...domains, { ...newDomain, createdAt: new Date().toISOString() }]);
      setNewDomain({ type: "", name: "", status: "Active" });
      setShowModal(false);
    }
  };

  const saveDomain = () => {
    const updated = [...domains];
    updated[editDomain.index] = { ...editDomain };
    setDomains(updated);
    setEditDomain(null);
    setShowEditModal(false);
  };

  const deleteDomain = (index) => {
    setDomains(domains.filter((_, i) => i !== index));
  };

  const filteredList = domains
    .filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.status === statusFilter) &&
        (typeFilter === "all" || item.type === typeFilter)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
  const customStyles = {
    headCells: { style: { fontSize: "1rem", fontWeight: 600 } },
    cells: { style: { fontSize: "1rem" } },
    pagination: { style: { fontSize: "1rem" } },
  };
  const columns = [
    {
      name: "No.",
      selector: (_, index) => index + 1,
      width: "60px"
    },
    {
      name: "Business Type",
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: "Business Domain",
      selector: (row) => row.name
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${row.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
        >
          {row.status}
        </span>
      )
    },
    {
      name: "Action",
      cell: (row, index) => (
   <div className="flex gap-2">
                   <button
  onClick={() => {
    setEditDomain({ ...row, index });
    setShowEditModal(true);
  }}
  className="bg-blue-500 text-white px-2 py-1 rounded"
>
  Edit
</button>

<button
  onClick={() => deleteDomain(index)}
  className="bg-red-500 text-white px-2 py-1 rounded"
>
  Delete  
</button>

                </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold">Business Domain</h1>

        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
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

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">Business Type</option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <FaFilter className="text-gray-600" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 ml-auto"
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

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-center">Add Business Domain</h2>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-xl font-bold"
            >
              ×
            </button>

            <select
              name="type"
              value={newDomain.type}
              onChange={handleInputChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            >
              <option value="">Select Business Type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              value={newDomain.name}
              onChange={handleInputChange}
              placeholder="Enter Business Domain"
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            />

            <button
              onClick={addDomain}
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editDomain && (
        <div className="fixed inset-0 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Business Domain</h2>
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-4 text-xl font-bold"
            >
              ×
            </button>

            <select
              name="type"
              value={editDomain.type}
              onChange={handleInputChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            >
              <option value="">Select Business Type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              value={editDomain.name}
              onChange={handleInputChange}
              placeholder="Enter Business Domain"
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            />

            <button
              onClick={saveDomain}
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

export default BusinessDomain;
