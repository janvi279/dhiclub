import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import BusinessDomainFilters from "./components/filter";
import BusinessDomainSearch from "./components/search";
import AddEditModal from "./modals/AddEdit";
import { useBusinessDomain } from "./hooks/useBusinessDomain";
import { businessDomainColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const BusinessDomain = () => {
  const { domains, addDomain, updateDomain, deleteDomain } = useBusinessDomain();

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // ✅ Filter + sort
  const filteredData = domains
    .filter((d) => d?.name?.toLowerCase().includes(search.toLowerCase()))
    .filter((d) => (statusFilter === "ALL" ? true : d.status === statusFilter))
    .filter((d) => (typeFilter === "ALL" ? true : d.type === typeFilter))
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSave = (values) => {
    if (editData) {
      updateDomain({ ...editData, ...values });
    } else {
      addDomain(values);
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">
          Business Domain
        </h1>

        <BusinessDomainSearch search={search} setSearch={setSearch} />
        <div className="flex gap-4 max-sm:flex-wrap">
          <BusinessDomainFilters
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
          />

          <button
            onClick={() => setModalOpen(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={businessDomainColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
          deleteDomain,
          updateDomain,
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
          onClose={handleCloseModal}
          onSave={handleSave}
          domain={editData}
        />
      )}
    </div>
  );
};

export default BusinessDomain;
