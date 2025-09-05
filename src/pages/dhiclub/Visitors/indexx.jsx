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

const Visitor = () => {
  const [responsibilityList, setResponsibilityList] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState({
    MemberId: "",
    MemberName: "",
    MemberRole: "",
    BusinessCategory: "",
    AssignDate: "",
    MobileNumber: "",
    status: "Active",
    createdAt: new Date().toISOString(),
  });
  const [editingResponsibility, setEditingResponsibility] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingResponsibility) {
      setEditingResponsibility({ ...editingResponsibility, [name]: value });
    } else {
      setNewResponsibility({ ...newResponsibility, [name]: value });
    }
  };

  // add responsibility
  const addResponsibility = () => {
    if (newResponsibility.MemberName && newResponsibility.MemberRole) {
      setResponsibilityList([
        ...responsibilityList,
        { ...newResponsibility, createdAt: new Date().toISOString() },
      ]);
      setNewResponsibility({
        MemberId: "",
        MemberName: "",
        MemberRole: "",
        BusinessCategory: "",
        AssignDate: "",
        MobileNumber: "",
        status: "Active",
        createdAt: new Date().toISOString(),
      });
      setShowModal(false);
    }
  };

  // save responsibility
  const saveResponsibility = () => {
    const updated = [...responsibilityList];
    updated[editingResponsibility.index] = { ...editingResponsibility };
    setResponsibilityList(updated);
    setShowEditModal(false);
    setEditingResponsibility(null);
  };

  // delete responsibility
  const deleteResponsibility = (index) => {
    setResponsibilityList(responsibilityList.filter((_, i) => i !== index));
  };

  const handleEdit = (row, index) => {
    setEditingResponsibility({ ...row, index });
    setShowEditModal(true);
  };

  // localStorage sync
  useEffect(() => {
    const stored = localStorage.getItem("responsibilities");
    if (stored) {
      try {
        setResponsibilityList(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing responsibilities", err);
        setResponsibilityList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("responsibilities", JSON.stringify(responsibilityList));
  }, [responsibilityList]);

  // filtering
  const filteredList = responsibilityList
    .filter(
      (item) =>
        item.MemberName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.status === statusFilter)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  // columns for DataTable
  const columns = [
    { name: "No.", selector: (_, index) => index + 1 },
    { name: "Member Name", selector: (row) => row.MemberName },
    { name: "Role", selector: (row) => row.MemberRole },
    { name: "Mobile", selector: (row) => row.MobileNumber },
    { name: "Assign Date", selector: (row) => row.AssignDate },
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
      cell: (row, index) => (
        <div className="flex gap-5">
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
            onClick={() => handleEdit(row, index)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
            onClick={() => deleteResponsibility(index)}
          >
            <MdDeleteOutline />
          </button>
          <button className="text-primary-400 px-2 py-1 border-primary-400 border font-semibold rounded-full whitespace-nowrap">
            Active
          </button>
          <button className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap">
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
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex gap-5 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold">Visitor Responsibility List</h1>

        {/* Search */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
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

          <div className="flex items-center gap-2">
            <FiFilter className="text-primary-200 text-xl" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center cursor-pointer gap-2"
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
        <div className="fixed inset-0 text-primary-150 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Add Responsibility</h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <input
              type="text"
              name="MemberName"
              placeholder="Member Name"
              value={newResponsibility.MemberName}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <input
              type="text"
              name="MemberRole"
              placeholder="Role"
              value={newResponsibility.MemberRole}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <input
              type="text"
              name="MobileNumber"
              placeholder="Mobile Number"
              value={newResponsibility.MobileNumber}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />
            <input
              type="date"
              name="AssignDate"
              value={newResponsibility.AssignDate}
              onChange={handleChange}
              className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
            />

            <button
              onClick={addResponsibility}
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingResponsibility && (
        <div className="fixed text-primary-150 inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Responsibility
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowEditModal(false)}
            >
              ×
            </button>

            <input
              type="text"
              name="MemberName"
              value={editingResponsibility.MemberName}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
              placeholder="Member Name"
            />
            <input
              type="text"
              name="MemberRole"
              value={editingResponsibility.MemberRole}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
              placeholder="Role"
            />
            <input
              type="text"
              name="MobileNumber"
              value={editingResponsibility.MobileNumber}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
              placeholder="Mobile Number"
            />
            <input
              type="date"
              name="AssignDate"
              value={editingResponsibility.AssignDate}
              onChange={handleChange}
              className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
            />

            <button
              onClick={saveResponsibility}
              className="w-full bg-primary-200 text-white py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Visitor;
