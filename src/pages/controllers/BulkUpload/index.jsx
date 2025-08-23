import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CountryFilters from "./components/filter";
import CountrySearch from "./components/search";
import AddBulkUploadModal from "./modals/Add";
import EditBulkUploadModal from "./modals/Edit";
import { useBulkUpload } from "./hooks/useBulkUploadCountry";
import { bulkUploadColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const BulkUpload = () => {
  const { bulkUploadList, addBulkUpload, updateBulkUpload, deleteBulkUpload } =
    useBulkUpload();
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [showAdd, setShowAdd] = useState(false);
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
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Bulk Upload</h1>
        <CountrySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <CountryFilters
            filterCountry={filterCountry}
            setFilterCountry={setFilterCountry}
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

      {/* Table */}
      <DataTable
        columns={bulkUploadColumns({
          setEditData,
          deleteBulkUpload,
          updateBulkUpload
        })}
        data={filteredData}
        customStyles={customStyles}
        pagination
        highlightOnHover
      />

      {/* Add Modal */}
      {showAdd && (
        <AddBulkUploadModal
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          onSave={addBulkUpload}
        />
      )}

      {/* Edit Modal */}
      {editData && (
        <EditBulkUploadModal
          isOpen={!!editData}
          onClose={() => setEditData(null)}
          onSave={updateBulkUpload}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default BulkUpload;
