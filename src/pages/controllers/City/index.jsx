import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CityFilters from "./components/filter";
import CitySearch from "./components/search";
import AddEditModal from "./modals/AddEdit";
import { useCity } from "./hooks/useCity";
import { cityColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const City = () => {
  const { city, addCity, updateCity, deleteCity } = useCity();

  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  // ✅ Filter + sort logic
  const filteredData = city
    .filter((c) => {
      const cityName = c.cityName || "";
      const city = c.cityName?.toUpperCase() || "";
      const filter = filterCity?.toUpperCase() || "";
      return (
        cityName.toLowerCase().includes(search.toLowerCase()) &&
        (filter == "ALL" ? true : city === filter)
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
  const handleSave = async (values) => {
    if (editData) {
      await updateCity(editData.id, values); // ✅ fix _id → id
    } else {
      await addCity(values);
    }
    handleCloseModal();
  };


  return (
     <div className="mx-auto  bg-white shadow-md border border-primary-800 rounded-lg p-5">
      {/* Header + Filters */}
        <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b  border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">City List</h1>

        <CitySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap">
          <CityFilters
            filterCity={filterCity}
            setFilterCity={setFilterCity}
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
        columns={cityColumns({
          setEditData: (row) => {
            setEditData(row);
            setModalOpen(true);
          }, deleteCity, updateCity
        })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
        
          overflowY={false}
  overflowYOffset="0px"
  // આ પણ add કરો
  style={{ overflow: 'visible' }}
      />

      {/* Add Modal */}
      {modalOpen && (
        <AddEditModal
          isOpen={modalOpen}      // ✅ important
          onClose={handleCloseModal}
          onSave={handleSave}
          city={editData}
        />
      )}


    </div>
  );
};

export default City;
