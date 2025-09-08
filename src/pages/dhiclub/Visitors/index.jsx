import { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import VisitorFilters from "./components/filter";
import VisitorSearch from "./components/search";
import AddVisitorModal from "./modals/Add";
import ViewVisitorModal from "./modals/view";
import { useVisitor } from "./hooks/useVisitor";
import { visitorColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const VisitorPage = () => {
  const { visitors, addVisitor } = useVisitor();

  const [search, setSearch] = useState("");
  const [cityFilter, setCityFilter] = useState("all"); // ✅ use city filter instead of country
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [sortOrder, setSortOrder] = useState("newest");

  const handleViewVisitor = (visitor) => {
    setSelectedVisitor(visitor);
    setShowView(true);
  };

  // ✅ Filter + sort logic
  const filteredData = visitors
    .filter((v) => {
      const name = v.name?.toLowerCase() || "";
      const city = v.city?.toLowerCase() || "";

      // ✅ Search filter (by name)
      const matchesSearch = name.includes(search.toLowerCase());

      // ✅ City filter
      const matchesCity =
        cityFilter === "all" || cityFilter.toLowerCase() === city;

      return matchesSearch && matchesCity;
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

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Visitors</h1>

        <VisitorSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap">
          <VisitorFilters
            cityFilter={cityFilter}           // ✅ pass correct prop
            setCityFilter={setCityFilter}     // ✅
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
        columns={visitorColumns({ onView: handleViewVisitor })}
        data={filteredData}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* Add Modal */}
      {showAdd && (
        <AddVisitorModal
          isOpen={showAdd}
          onClose={handleCloseAddModal}
          onSave={addVisitor}
        />
      )}

      {/* View Modal */}
      {showView && selectedVisitor && (
        <ViewVisitorModal
          isOpen={showView}
          onClose={() => setShowView(false)}
          visitor={selectedVisitor}
        />
      )}
    </div>
  );
};

export default VisitorPage;
