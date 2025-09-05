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

const defaultNewBusiness = () => ({
  businessType: "",
  businessDomain: "",
  businessCategory: "",
  status: "Active",
  createdAt: new Date().toISOString(),
});

const BulkUploadBusinessCategory = () => {
  const [businessList, setBusinessList] = useState([]);
  const [newBusiness, setNewBusiness] = useState(defaultNewBusiness());
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const businessTypes = ["Retail", "Service", "Manufacturing", "IT"].sort();
  const businessDomains = [
    "E-commerce",
    "Healthcare",
    "Education",
    "Logistics",
  ].sort();
  const businessCategories = ["B2B", "B2C", "C2C", "C2B"].sort();

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("businesses");
    if (stored) {
      try {
        setBusinessList(JSON.parse(stored));
      } catch (err) {
        console.error("Error parsing businesses", err);
        setBusinessList([]);
      }
    }
  }, []);

  // Save to localStorage whenever list changes
  useEffect(() => {
    localStorage.setItem("businesses", JSON.stringify(businessList));
  }, [businessList]);

  const resetForm = () => {
    setNewBusiness(defaultNewBusiness());
    setEditingBusiness(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingBusiness) {
      setEditingBusiness((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewBusiness((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addBusiness = () => {
    const itemToAdd = { ...newBusiness, createdAt: new Date().toISOString() };
    const updated = [...businessList, itemToAdd];
    setBusinessList(updated);
    resetForm();
    setShowModal(false);
  };

  const handleEdit = (row, rowIndex) => {
    // include index so we know which item to update, but don't store it permanently
    setEditingBusiness({ ...row, index: rowIndex });
    setShowEditModal(true);
  };

  const saveBusiness = () => {
    if (!editingBusiness) return;

    const updated = [...businessList];
    // remove `index` before saving the object
    const { index, ...rest } = editingBusiness;
    // ensure createdAt stays if present
    updated[index] = {
      ...updated[index],
      ...rest,
      createdAt:
        rest.createdAt || updated[index].createdAt || new Date().toISOString(),
    };
    setBusinessList(updated);
    setShowEditModal(false);
    setEditingBusiness(null);
  };

  const deleteBusiness = (index) => {
    setBusinessList((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleStatus = (index) => {
    const updated = [...businessList];
    updated[index] = {
      ...updated[index],
      status: updated[index].status === "Active" ? "Deactive" : "Active",
    };
    setBusinessList(updated);
  };

  // Filtering + searching + sorting
  const getTime = (d) => (d ? new Date(d).getTime() : 0);

  const filteredData = businessList
    .filter((item) => {
      const matchQuery =
        item.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessCategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;
      return matchQuery && matchStatus;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? getTime(b.createdAt) - getTime(a.createdAt)
        : getTime(a.createdAt) - getTime(b.createdAt)
    );

  const columns = [
    {
      name: "No.",
      cell: (_row, index) => index + 1,
    },
    {
      name: "Business Type",
      selector: (row) => row.businessType,
      sortable: true,
    },
    { name: "Domain", selector: (row) => row.businessDomain, sortable: true },
    {
      name: "Category",
      selector: (row) => row.businessCategory,
      sortable: true,
    },
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
      cell: (row, rowIndex) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row, rowIndex)}
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          >
            <FaRegEdit />
          </button>

          <button
            onClick={() => deleteBusiness(rowIndex)}
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
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
    <div className=" text-primary-150 mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">
          BulkUpload BusinessCategory
        </h1>

        <div className="relative w-64 ">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center ">
            <FiFilter className="text-primary-200 text-xl" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-1 font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>

          <div className="flex items-center">
            <FaSortAmountDownAlt className="text-primary-200" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-1 font-semibold text-primary-150 py-2 text-base focus:outline-none"
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
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center text-primary-150">
              Add Business Category
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <select
              name="businessType"
              value={newBusiness.businessType}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none "
            >
              <option value="">Select Business Type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              name="businessDomain"
              value={newBusiness.businessDomain}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select Business Domain</option>
              {businessDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            <select
              name="businessCategory"
              value={newBusiness.businessCategory}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select Business Category</option>
              {businessCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={addBusiness}
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingBusiness && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-2xl w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center text-primary-150">
              Edit Business Category
            </h2>
            <button
              className="absolute top-3 right-3 text-xl font-bold"
              onClick={() => setShowEditModal(false)}
            >
              ×
            </button>

            <select
              name="businessType"
              value={editingBusiness.businessType}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select Business Type</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              name="businessDomain"
              value={editingBusiness.businessDomain}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select Business Domain</option>
              {businessDomains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            <select
              name="businessCategory"
              value={editingBusiness.businessCategory}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="">Select Business Category</option>
              {businessCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button
              onClick={saveBusiness}
              className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUploadBusinessCategory;
