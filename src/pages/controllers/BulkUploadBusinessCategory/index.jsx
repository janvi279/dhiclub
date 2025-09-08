import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import { useBulkUploadBusiness } from "./hooks/useBulkUploadBusiness";
import { businessColumns } from "./columns";
import BusinessSearch from "./components/search";
import BusinessFilters from "./components/filter";
import AddEditModal from "./modals/AddEdit";
import customStyles from "../../../components/custom/customStyle";

const BulkUploadBusinessCategory = () => {
  const { businessList, addBusiness, updateBusiness, deleteBusiness } =
    useBulkUploadBusiness();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const filteredData = businessList
    .filter((item) => {
      const query = search.toLowerCase();
      const matchQuery =
        (item.businessType?.toLowerCase() || "").includes(query) ||
        (item.businessDomain?.toLowerCase() || "").includes(query) ||
        (item.businessCategory?.toLowerCase() || "").includes(query);

      const matchStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchQuery && matchStatus;
    })
    .sort((a, b) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSave = async (values) => {
    if (editData) {
      await updateBusiness(editData.id, values);
    } else {
      await addBusiness(values);
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">
          Bulk Upload Business Category
        </h1>
        <BusinessSearch search={search} setSearch={setSearch} />
        <div className="flex gap-4 max-sm:flex-wrap">
          <BusinessFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <DataTable
        columns={businessColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
          deleteBusiness,
          updateBusiness,
        })}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
      />

      {modalOpen && (
        <AddEditModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          editData={editData}
        />
      )}
    </div>
  );
};

export default BulkUploadBusinessCategory;
