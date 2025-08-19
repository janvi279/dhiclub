import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

const Attendance = () => {
  const [data] = useState([
    {
      id: 1,
      no: "01",
      meetingId: "abc012",
      members: 50,
      present: 47,
      absent: 3,
      substitute: 1,
      status: "Active",
      createdAt: "2024-07-10",
    },
    {
      id: 2,
      no: "02",
      meetingId: "abc013",
      members: 60,
      present: 55,
      absent: 5,
      substitute: 2,
      status: "Deactive",
      createdAt: "2024-06-05",
    },
    {
      id: 3,
      no: "03",
      meetingId: "abc014",
      members: 45,
      present: 40,
      absent: 5,
      substitute: 0,
      status: "Active",
      createdAt: "2024-05-15",
    },
  ]);

  // 🔽 States for filtering/sorting
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [absentFilter, setAbsentFilter] = useState("all");

  // 🔽 Sort + Filter Logic
  const filteredData = data
    .filter((item) => statusFilter === "all" || item.status === statusFilter)
    .filter(
      (item) =>
        absentFilter === "all" ||
        (absentFilter === "less5" ? item.absent < 5 : item.absent >= 5)
    )
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  const customStyles = {
    headRow: {
      style: {
        border: "none",
        backgroundColor: "#F5F8FD",
        borderRadius: "10px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#061237",
        border: "none",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#061237",
        fontWeight: 500,
      },
    },
  };

  // Table Columns
  const columns = [
    { name: "No", selector: (row) => row.no, sortable: true, width: "80px" },
    { name: "Meeting Id", selector: (row) => row.meetingId, sortable: true },
    { name: "Members", selector: (row) => row.members, sortable: true },
    { name: "Present", selector: (row) => row.present, sortable: true },
    { name: "Absent", selector: (row) => row.absent, sortable: true },
    { name: "Substitute", selector: (row) => row.substitute, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
    {
      name: "Action",
      cell: () => (
        <button className="px-4 py-1 rounded-full bg-green-100 text-green-600 font-medium">
          View
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold">Attendance</h1>

        {/* Filters */}
        <div className="flex items-center gap-3">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <FaSortAmountDownAlt className="text-primary-200" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>

       
       

          {/* Absent Filter */}
          <div className="flex items-center gap-2">
            <FiFilter className="text-primary-200 text-xl" />
            <select
              value={absentFilter}
              onChange={(e) => setAbsentFilter(e.target.value)}
              className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="all">Filter</option>
              <option value="less5">Less than 5</option>
              <option value="more5">5 or more</option>
            </select>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        highlightOnHover
        striped
        pagination
        customStyles={customStyles}
      />
    </div>
  );
};

export default Attendance;
