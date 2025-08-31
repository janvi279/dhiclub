import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import { useBulkUploadBusiness } from "./hooks/useBulkUploadBusiness";
import { businessColumns } from "./columns";
import BusinessSearch from "./components/search";
import BusinessFilters from "./components/filter";
import AddModal from "./modals/Add";
import EditModal from "./modals/Edit";
import customStyles from "../../../components/custom/customStyle";

const BulkUploadBusinessCategory = () => {
  const { businessList, addBusiness, updateBusiness, deleteBusiness } =
    useBulkUploadBusiness();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);

  const filteredData = businessList
    .filter((item) => {
      const matchQuery =
        (item.businessType?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.businessDomain?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (item.businessCategory?.toLowerCase() || "").includes(search.toLowerCase());

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchQuery && matchStatus;
    })
    .sort((a, b) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );


  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">Bulk Upload Business Category</h1>
        <BusinessSearch search={search} setSearch={setSearch} />
        <div className="flex gap-4">
          <BusinessFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <button
            onClick={() => setShowAdd(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <DataTable
        columns={businessColumns({ setEditData, deleteBusiness, updateBusiness })}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
      />

      {showAdd && (
        <AddModal isOpen={showAdd} onClose={() => setShowAdd(false)} onSave={addBusiness} />
      )}

      {editData && (
        <EditModal
          isOpen={!!editData}
          onClose={() => setEditData(null)}
          onSave={updateBusiness}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default BulkUploadBusinessCategory;
