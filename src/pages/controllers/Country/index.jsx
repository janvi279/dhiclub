import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CountryFilters from "./components/filter";
import CountrySearch from "./components/search";
import AddCountryModal from "./modals/Add";
import EditCountryModal from "./modals/Edit";
import { useCountry } from "./hooks/useCountry";
import { countryColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const Country = () => {
  const { country, addCountry, updateCountry, deleteCountry } = useCountry();

  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [showAdd, setShowAdd] = useState(false);
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

  // ✅ Modal Handlers
  const handleCloseAddModal = () => setShowAdd(false);
  const handleCloseEditModal = () => setEditData(null);

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Country List</h1>

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

      {/* DataTable */}
      <DataTable
        columns={countryColumns({ setEditData, deleteCountry, updateCountry })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showAdd && (
        <AddCountryModal
          isOpen={showAdd}      // ✅ important
          onClose={handleCloseAddModal}
          onSave={addCountry}
        />
      )}

      {editData && <EditCountryModal isOpen={!!editData}
        country={editData} onClose={handleCloseEditModal} onSave={updateCountry} />}

    </div>
  );
};

export default Country;
