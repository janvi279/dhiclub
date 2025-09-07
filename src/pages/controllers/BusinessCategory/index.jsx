import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import BusinessCategoryFilters from "./components/filter";
import BusinessCategorySearch from "./components/search";
import AddEditModal from "./modals/AddEdit";
import { useBusinessCategory } from "./hooks/useBusinessCategory";
import { businessCategoryColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const BusinessCategory = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useBusinessCategory();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ Filter + sort
  const filteredData = categories
    // Search filter
    .filter((c) => (c?.name || "").toLowerCase().includes(search.toLowerCase()))
    // Status filter
    .filter((c) => (statusFilter === "all" ? true : c.status === statusFilter))
    // Sort order
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSave = async (values) => {
    if (editData) {
      await updateCategory(editData.id, values); // update
    } else {
      await addCategory(values); // add
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">
          Business Category
        </h1>

        <BusinessCategorySearch search={search} setSearch={setSearch} />
        <div className="flex gap-4">
          <BusinessCategoryFilters
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />

          <button
            onClick={() => {
              setModalOpen(true);
              setEditData(null);
            }}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={businessCategoryColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
          deleteCategory,
          updateCategory,
        })}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <AddEditModal
          isOpen={modalOpen}
          category={editData} // pass single object
          onClose={handleCloseModal}
          onSave={handleSave} // handles both add/update
        />
      )}
    </div>
  );
};

export default BusinessCategory;
