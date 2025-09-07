import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegEye } from "react-icons/fa6";
import customStyles from "../../../components/custom/customStyle";
import MemberViewModal from "./modal/MemberViewModal";
import MemberSearch from "./components/search";
import MemberFilters from "./components/filter";

const Index = () => {
  // ✅ Dummy Data
  const [data] = useState([
    {
      id: 1,
      name: "John Doe",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380015",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      city: "Surat",
      state: "Gujarat",
      pincode: "395007",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Ravi Patel",
      city: "Rajkot",
      state: "Gujarat",
      pincode: "360001",
      status: "Active",
    },
  ]);

  // ✅ State
  const [selectedMember, setSelectedMember] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL"); // ✅ default to ALL
  const [sortOrder, setSortOrder] = useState("newest");

  // ✅ Open/Close modal
  const handleViewVisitor = (row) => setSelectedMember(row);
  const handleCloseModal = () => setSelectedMember(null);

  // ✅ Filter + Search + Sort
  const q = search.trim().toLowerCase();
  const filteredData = data
    .filter((r) =>
      // search across name/city/state/pincode
      [r.name, r.city, r.state, r.pincode]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q))
    )
    .filter((r) =>
      // treat "ALL" (or empty) as no filter
      !filterStatus || filterStatus === "ALL"
        ? true
        : r.status.toLowerCase() === filterStatus.toLowerCase()
    )
    .sort((a, b) => (sortOrder === "newest" ? b.id - a.id : a.id - b.id));

  // ✅ Columns
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "State", selector: (row) => row.state, sortable: true },
    { name: "Pincode", selector: (row) => row.pincode, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-5 py-1.5 rounded-full ${
            row.status === "Active"
              ? "bg-primary-350 text-primary-400 font-semibold"
              : "bg-primary-450 text-primary-500"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
          onClick={() => handleViewVisitor(row)}
        >
          <FaRegEye />
        </button>
      ),
    },
  ];

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Members</h1>

        <MemberSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <MemberFilters
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
      />

      {/* View Modal */}
      {selectedMember && (
        <MemberViewModal
          isOpen={!!selectedMember}
          member={selectedMember}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;
