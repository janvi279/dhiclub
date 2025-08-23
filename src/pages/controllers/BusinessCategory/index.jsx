import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import BusinessCategoryFilters from "./components/filter";
import BusinessCategorySearch from "./components/search";
import AddBusinessCategoryModal from "./modals/Add";
import EditBusinessCategoryModal from "./modals/Edit";
import { useBusinessCategory } from "./hooks/useBusinessCategory";
import { businessCategoryColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const BusinessCategory = () => {
  const { categories, addCategory, updateCategory, deleteCategory } =
    useBusinessCategory();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ Filter + sort
const filteredData = categories
  .filter((c) => (c?.name || "").toLowerCase().includes(search.toLowerCase()))
  .filter((c) =>
    statusFilter === "all" ? true : c.status === statusFilter
  )
  .sort((a, b) =>
    sortOrder === "newest"
      ? new Date(b.createdAt) - new Date(a.createdAt)
      : new Date(a.createdAt) - new Date(b.createdAt)
  );
const handleCloseAddModal = () => setShowAdd(false);
  const handleCloseEditModal = () => setEditData(null);

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
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
            onClick={() => setShowAdd(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={businessCategoryColumns({ setEditData, deleteCategory, updateCategory })}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showAdd && (
        <AddBusinessCategoryModal
          isOpen={showAdd}
            onClose={handleCloseAddModal}
          onSave={addCategory}
        />
      )}

      {/* Edit Modal */}
      {editData && (
        <EditBusinessCategoryModal
          isOpen={!!editData}
          category={editData}
         onClose={handleCloseEditModal}
          onSave={updateCategory}
        />
      )}
    </div>
  );
};

export default BusinessCategory;
