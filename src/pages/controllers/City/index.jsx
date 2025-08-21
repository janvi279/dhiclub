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

  const filteredData = cities.filter((c) => {
    return (
      c.cityName.toLowerCase().includes(search.toLowerCase()) &&
      (filterCountry ? c.country === filterCountry : true)
    );
  });

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4 ">
        {/* Header */}
        <div className="flex justify-between items-center ">
          <h1 className="text-primary-150 font-semibold text-xl">City List</h1>
        </div>

        {/* Filters + Search */}
        <CitySearch search={search} setSearch={setSearch} />
        <div className="flex gap-4">
          <CityFilters filterCountry={filterCountry} setFilterCountry={setFilterCountry} />

          <button
            onClick={() => setShowAdd(true)}
            className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>

      </div>

      {/* Table */}
      <DataTable
        columns={cityColumns({ setEditData, deleteCity })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Modals */}
      {showAdd && (
        <AddCityModal
          onClose={() => setShowAdd(false)}
          onSave={addCity}
        />
      )}
      {editData && (
        <EditCityModal
          city={editData}
          onClose={() => setEditData(null)}
          onSave={updateCity}
        />
      )}
    </div>
  );
};

export default City;
