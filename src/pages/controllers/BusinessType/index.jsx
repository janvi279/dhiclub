import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import BusinessTypeFilters from "./components/filter";
import BusinessTypeSearch from "./components/search";
import AddBusinessTypeModal from "./modals/Add";
import EditBusinessTypeModal from "./modals/Edit";
import { useBusinessType } from "./hooks/useBusinessType";
import { businessTypeColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const BusinessType = () => {
  const { businessTypes, addBusinessType, updateBusinessType, deleteBusinessType } = useBusinessType();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ Filter + sort
  const filteredData = businessTypes
    .filter((b) => b?.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Business Type List</h1>

        <BusinessTypeSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <BusinessTypeFilters sortOrder={sortOrder} setSortOrder={setSortOrder} />
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
        columns={businessTypeColumns({ setEditData, deleteBusinessType, updateBusinessType })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showAdd && (
        <AddBusinessTypeModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onSave={addBusinessType}
        />
      )}

      {/* Edit Modal */}
      {editData && (
        <EditBusinessTypeModal
          isOpen={!!editData}
          businessType={editData}
          onClose={() => setEditData(null)}
          onSave={updateBusinessType}
        />
      )}
    </div>
  );
};

export default BusinessType;
