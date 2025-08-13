
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus,FaSearch, FaSortAmountDownAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { FiFilter } from "react-icons/fi";

const BusinessCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [typeFilter, setTypeFilter] = useState("all");
  const [domainFilter, setDomainFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState({
    businessType: "",
    businessDomain: "",
    businessCategory: "",
    status: "Active",
    createdAt: new Date().toISOString()
  });

  const businessTypes = ["Tiles", "Marble", "Sanitary"];
  const businessDomains = ["Retail", "Wholesale", "Export"];

  useEffect(() => {
    const stored = localStorage.getItem("businessCategories");
    if (stored) setCategories(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("businessCategories", JSON.stringify(categories));
  }, [categories]);

  const handleSubmit = () => {
    if (!current.businessType || !current.businessDomain || !current.businessCategory) return;

    if (editMode) {
      const updated = [...categories];
      updated[current.index] = { ...current };
      setCategories(updated);
    } else {
      setCategories([...categories, { ...current, createdAt: new Date().toISOString() }]);
    }

    setCurrent({ businessType: "", businessDomain: "", businessCategory: "", status: "Active" });
    setModalOpen(false);
    setEditMode(false);
  };

  const handleEdit = (row, index) => {
    setCurrent({ ...row, index });
    setEditMode(true);
    setModalOpen(true);
  };

  const handleDelete = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const filtered = categories
    .filter(item =>
      item.businessCategory.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (typeFilter === "all" || item.businessType === typeFilter) &&
      (domainFilter === "all" || item.businessDomain === domainFilter) &&
      (statusFilter === "all" || item.status === statusFilter)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );
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
    { name: "No.", selector: (_, index) => index + 1, },
    { name: "Business Type", selector: row => row.businessType, sortable: true },
    { name: "Business Domain", selector: row => row.businessDomain, sortable: true },
    { name: "Category", selector: row => row.businessCategory, sortable: true },
    {
      name: "Status",
      cell: row => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${row.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {row.status}
        </span>
      ),
    },
    {
      name: "Action",
      cell: (row, index) => (
         <div className="flex gap-2">
          <button className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF] whitespace-nowrap" onClick={() => handleEdit(row, index)}><FaRegEdit /></button>
          <button className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF] whitespace-nowrap" onClick={() => handleDelete(index)}><MdOutlineDelete /></button>
           <button className="text-[#429667] px-2 py-1 border-[#429667] border  font-semibold rounded-[40px] whitespace-nowrap" onClick={() => deleteCountry(index)}>Active</button>
          <button  className="text-[#A00C19] px-2 py-1 border border-[#A00C19] font-semibold rounded-[40px] whitespace-nowrap" onClick={() => deleteCountry(index)}>Deactive</button>
        </div>
        
      )
    }
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl text-[#061237] font-semibold">Business Category</h1>

        {/* Search */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Sort */}
        <div className="relative flex items-center">
          <FaSortAmountDownAlt className="text-[#6246EA]" />
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
           className="px-1 py-2 font-poppins font-semibold text-[16px] text-[#061232]  color-[#061237] focus:outline-none"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>

        {/* Type Filter */}
        <div className="relative flex items-center">
          <FiFilter className="text-[#6246EA] text-xl " />
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
        className="px-1 py-2 font-poppins font-semibold text-[16px] text-[#061232]  color-[#061237] focus:outline-none"
          >
            <option value="all">Business Type</option>
            {businessTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Domain Filter */}
        <div className="relative flex items-center">
          <FiFilter className="text-[#6246EA] text-xl" />
          <select
            value={domainFilter}
            onChange={e => setDomainFilter(e.target.value)}
             className="px-1 py-2 font-poppins font-semibold text-[16px] text-[#061232]  color-[#061237] focus:outline-none"
          >
            <option value="all">Business Domain</option>
            {businessDomains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="relative flex items-center">
          <FiFilter className="text-[#6246EA] text-xl" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
             className="px-1 py-2 font-poppins font-semibold text-[16px] text-[#061232]  color-[#061237] focus:outline-none"
          >
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Deactive">Deactive</option>
          </select>
        </div>

        <div className="ml-auto">
          <button
           className="bg-[#6246EA] text-white px-4 py-2 rounded-[40px] cursor-pointer flex items-center gap-2"
            onClick={() => setModalOpen(true)}
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0  bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <h2 className="text-xl text-[#061237] font-semibold mb-4 text-center">{editMode ? "Edit Business Category" : "Add Business Category"}</h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => {
                setModalOpen(false);
                setEditMode(false);
                setCurrent({ businessType: "", businessDomain: "", businessCategory: "", status: "Active" });
              }}
            >
              ×
            </button>

            <select
              value={current.businessType}
              onChange={(e) => setCurrent({ ...current, businessType: e.target.value })}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            >
              <option value="">Select Business Type</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={current.businessDomain}
              onChange={(e) => setCurrent({ ...current, businessDomain: e.target.value })}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            >
              <option value="">Select Business Domain</option>
              {businessDomains.map(domain => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Enter Business Category"
              value={current.businessCategory}
              onChange={(e) => setCurrent({ ...current, businessCategory: e.target.value })}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            />

            <div className="flex justify-center gap-4">
              <button className="w-50 block mx-auto bg-indigo-600 text-white py-2 rounded-[40px] hover:bg-indigo-700" onClick={handleSubmit}>Submit</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessCategory;