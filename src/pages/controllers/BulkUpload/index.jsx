import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CountryFilters from "./components/filter";
import CountrySearch from "./components/search";
import AddEditModal from "./modals/AddEdit";
import { useBulkUpload } from "./hooks/useBulkUploadCountry";
import { bulkUploadColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const BulkUpload = () => {
  const { bulkUploadList, addBulkUpload, updateBulkUpload, deleteBulkUpload } =
    useBulkUpload();

  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const filteredData = bulkUploadList
    .filter((c) => {
      const countryName = c.country || "";
      const Country = c.country?.toUpperCase() || "";
      const filter = filterCountry?.toUpperCase() || "";
      return (
        countryName.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? Country === filter : true)
      );
    })
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
      await updateBulkUpload(editData.id || editData._id, values); // support both id/_id
    } else {
      await addBulkUpload(values);
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Bulk Upload</h1>
        <CountrySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap">
          <CountryFilters
            filterCountry={filterCountry}
            setFilterCountry={setFilterCountry}
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

      {/* Table */}
      <DataTable
        columns={bulkUploadColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
          deleteBulkUpload,
          updateBulkUpload,
        })}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
      />

      {/* Modal */}
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

export default BulkUpload;
