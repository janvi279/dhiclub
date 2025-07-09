// BulkUploadBusinessCategory.js
import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaSortAmountDownAlt
} from "react-icons/fa";
import DataTable from "react-data-table-component";

const BulkUploadBusinessCategory = () => {
  const [businessList, setBusinessList] = useState([]);
  const [newBusiness, setNewBusiness] = useState({
    businessType: "",
    businessDomain: "",
    businessCategory: "",
    status: "Active",
    createdAt: new Date().toISOString()
  });
  const [editingBusiness, setEditingBusiness] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const businessTypes = ["Retail", "Service", "Manufacturing", "IT"].sort();
  const businessDomains = ["E-commerce", "Healthcare", "Education", "Logistics"].sort();
  const businessCategories = ["B2B", "B2C", "C2C", "C2B"].sort();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editingBusiness) {
      setEditingBusiness({ ...editingBusiness, [name]: value });
    } else {
      setNewBusiness({ ...newBusiness, [name]: value });
    }
  };

  const addBusiness = () => {
    if (
      newBusiness.businessType &&
      newBusiness.businessDomain &&
      newBusiness.businessCategory
    ) {
      setBusinessList([
        ...businessList,
        { ...newBusiness, createdAt: new Date().toISOString() }
      ]);
      setNewBusiness({
        businessType: "",
        businessDomain: "",
        businessCategory: "",
        status: "Active"
      });
      setShowModal(false);
    }
  };

  const saveBusiness = () => {
    const updated = [...businessList];
    updated[editingBusiness.index] = { ...editingBusiness };
    setBusinessList(updated);
    setShowEditModal(false);
    setEditingBusiness(null);
  };

  const deleteBusiness = (index) => {
    setBusinessList(businessList.filter((_, i) => i !== index));
  };

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

  useEffect(() => {
    localStorage.setItem("businesses", JSON.stringify(businessList));
  }, [businessList]);

  const filteredData = businessList.filter((item) =>
    item.businessType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.businessDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.businessCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    { name: "No.", selector: (_, index) => index + 1, width: "60px" },
    { name: "Business Type", selector: (row) => row.businessType },
    { name: "Domain", selector: (row) => row.businessDomain },
    { name: "Category", selector: (row) => row.businessCategory },
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
      )
    },
    {
      name: "Actions",
      cell: (row, index) => (
        <div className="flex gap-2">
          <button
            onClick={() =>
              setEditingBusiness({ ...row, index }) & setShowEditModal(true)
            }
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => deleteBusiness(index)}
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
      <div className="flex gap-5 items-center justify-between pb-4 border-b mb-4">
        <h1 className="text-xl font-semibold">BulkUpload BusinessCategory</h1>
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex items-center gap-3">
          <FaSortAmountDownAlt className="text-gray-600" />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
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
      />

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Add</h2>
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
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
              className="w-full bg-indigo-600 text-white py-2 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingBusiness && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit</h2>
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
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
              className="w-full mb-3 px-3 py-2 border border-gray-300 rounded"
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

export default BulkUploadBusinessCategory;
