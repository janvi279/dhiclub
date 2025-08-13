
import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus, FaSearch, FaSortAmountDownAlt, FaFilter } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

const BusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState({ name: "", status: "Active" });

  useEffect(() => {
    const stored = localStorage.getItem("businessTypes");
    if (stored) setBusinessTypes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("businessTypes", JSON.stringify(businessTypes));
  }, [businessTypes]);

  const handleSubmit = () => {
    if (editMode) {
      const updated = businessTypes.map((item, i) =>
        i === current.index ? { name: current.name, status: current.status } : item
      );
      setBusinessTypes(updated);
    } else {
      setBusinessTypes([...businessTypes, { ...current, status: "Active", createdAt: new Date().toISOString() }]);
    }
    setModalOpen(false);
    setCurrent({ name: "", status: "Active" });
    setEditMode(false);
  };

  const handleEdit = (row, index) => {
    setCurrent({ ...row, index });
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    const updated = businessTypes.filter((_, i) => i !== index);
    setBusinessTypes(updated);
  };

  const toggleStatus = (index, status) => {
    const updated = [...businessTypes];
    updated[index].status = status;
    setBusinessTypes(updated);
  };

  const filteredList = businessTypes
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
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
        fontSize: "12px",
        fontWeight: 600,
        color: "#061237",
        backgroundColor: "#F5F8FD",
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

  const columns = [
    {
      name: "No.",
      selector: (_, index) => index + 1,

    },
    {
      name: "Business Type",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Status",
      cell: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {row.status}
        </span>
      ),
      sortable: true
    },
    {
      name: "Action",
      cell: (row, index) => (
        <div className="flex gap-2">
          <button className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF] whitespace-nowrap" onClick={() => handleEdit(row, index)} >
            <FaRegEdit />
          </button>
          <button onClick={() => handleDelete(index)} className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF] whitespace-nowrap">
            <MdOutlineDelete />
          </button>
          <button className="text-[#429667] px-2 py-1 border-[#429667] border  font-semibold rounded-[40px] whitespace-nowrap" onClick={() => deleteCountry(index)}>Active</button>
          <button className="text-[#A00C19] px-2 py-1 border border-[#A00C19] font-semibold rounded-[40px] whitespace-nowrap" onClick={() => deleteCountry(index)}>Deactive</button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl text-[#061237] font-semibold">Business Type</h1>

        {/* Search */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Sort */}
        <div className="relative flex items-center">
          <FaSortAmountDownAlt className="text-[#6246EA]  cursor-pointer" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-1 py-2 font-poppins font-semibold text-[16px] color-[#061237] focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <FiFilter className="text-[#6246EA] text-xl" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-1 py-2 font-poppins font-semibold text-[16px] color-[#061237] focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>

        {/* Add Button */}
        <button
          className="bg-[#6246EA] text-white px-4 py-2 rounded-[40px] cursor-pointer flex items-center gap-2 cursor-pointer"
          onClick={() => setModalOpen(true)}
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

      {/* Add/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-[20px] shadow-lg w-full max-w-md relative">
            <h2 className="text-xl text-[#061237] font-semibold mb-3 text-center">
              {editMode ? "Edit Business Type" : "Add Business Type"}
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => {
                setModalOpen(false);
                setEditMode(false);
                setCurrent({ name: "", status: "Active" });
              }}
            >
              ×
            </button>
            <input
              type="text"
              placeholder="Enter Business Type"
              name="name"
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
              value={current.name}
              onChange={(e) => setCurrent({ ...current, name: e.target.value })}
            />
            <button
              className="w-50 block mx-auto bg-[#6246EA] text-white py-2 rounded-[40px] "
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessType;