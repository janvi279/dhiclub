import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CityFilters from "./components/filter";
import CitySearch from "./components/search";
import AddCityModal from "./modals/Add";
import EditCityModal from "./modals/Edit";
import { useCity } from "./hooks/useCity";
import { cityColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const City = () => {
  const { cities, addCity, updateCity, deleteCity } = useCity();

  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  // ✅ Filter + sort logic
  const filteredData = cities
    .filter((c) => {
      const cityName = c.cityName || "";
      const cityCountry = c.country?.toUpperCase() || "";
      const filter = filterCountry?.toUpperCase() || "";
      return (
        cityName.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? cityCountry === filter : true)
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
        <h1 className="text-primary-150 font-semibold text-xl">City List</h1>

        <CitySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <CityFilters
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
        columns={cityColumns({ setEditData, deleteCity, updateCity })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showAdd && (
        <AddCityModal
          isOpen={showAdd}      // ✅ important
          onClose={handleCloseAddModal}
          onSave={addCity}
        />
      )}

      {editData && <EditCityModal isOpen={!!editData}
        city={editData} onClose={handleCloseEditModal} onSave={updateCity} />}

    </div>
  );
};

export default City;
