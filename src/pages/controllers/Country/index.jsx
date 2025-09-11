import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CountryFilters from "./components/filter";
import CountrySearch from "./components/search";
import AddEditModal from "./modals/AddEdit"; // ✅ single modal
import { useCountry } from "./hooks/useCountry";
import { countryColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const Country = () => {
  const { country, addCountry, updateCountry, deleteCountry } = useCountry();

  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false); // ✅ one modal
  const [editData, setEditData] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  // ✅ Filter + sort logic
  const filteredData = country
    .filter((c) => {
      const countryName = c.countryName || "";
      const Country = c.countryName?.toUpperCase() || "";
      const filter = filterCountry?.toUpperCase() || "";

      return (
        countryName.toLowerCase().includes(search.toLowerCase()) &&
        (filter === "ALL" ? true : Country === filter)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  // ✅ Modal Handlers
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditData(null);
  };

  const handleSave = (data) => {
    if (editData) {
      // Editing
      updateCountry({
        ...editData,   // keep old values
        ...data,       // override with new values
        id: editData.id, // preserve ID
      });
    } else {
      // Adding
      addCountry({
        ...data,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        status: "Active", // default for new
      });
    }
    handleCloseModal();
  };

  return (
    <div className="mx-auto  bg-white border-primary-800 border rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap  gap-4 border-b items-center justify-between pb-11 max-sm:pb-2  border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Country List</h1>

        <CountrySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap max-sm:flex-wrap">
          <CountryFilters
            filterCountry={filterCountry}
            setFilterCountry={setFilterCountry}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={() => {
              setEditData(null);
              setModalOpen(true);
            }}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={countryColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          },
          deleteCountry,
          updateCountry,
        })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add/Edit Modal */}
      {modalOpen && (
        <AddEditModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          onSave={handleSave}
          country={editData}
        />
      )}
    </div>
  );
};

export default Country;
