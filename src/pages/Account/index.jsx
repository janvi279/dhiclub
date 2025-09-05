import { useState } from "react";
import { FaSearch, FaSortAmountDownAlt } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdOutlineFileDownload } from "react-icons/md";
import DataTable from "react-data-table-component";

const Account = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  const transactions = [
    {
      no: 1,
      memberId: "poonam001",
      transactionId: "1375858201",
      date: "01/08/2025 11:00",
      status: "Paid",
      type: "UPI",
      amount: 100.0,
      gst: 18.0,
    },
    {
      no: 2,
      memberId: "poonam002",
      transactionId: "1375858202",
      date: "01/08/2025 12:00",
      status: "Pending",
      type: "Card",
      amount: 200.0,
      gst: 36.0,
    },
    {
      no: 3,
      memberId: "poonam003",
      transactionId: "1375858203",
      date: "01/08/2025 13:00",
      status: "Failed",
      type: "Cash",
      amount: 150.0,
      gst: 27.0,
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Paid":
        return "bg-[#DBFCE7] text-primary-400";
      case "Pending":
        return "bg-[#FDEFD9] text-[#F29000]";
      case "Failed":
        return "bg-[#FFE3E2] text-primary-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesQuery =
      t.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.transactionId.includes(searchQuery);
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const customStyles = {
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: 600,
        color: "#000000",
        backgroundColor: "#F5F8FD",
      },
    },
    cells: {
      style: {
        fontSize: "12px",
        color: "#000000",
        fontWeight: 500,
      },
    },
    pagination: {
      style: {
        borderTop: "none",
        boxShadow: "none",
      },
    },
  };

  const columns = [
    { name: "No.", selector: (row) => row.no, sortable: true },
    { name: "Member ID", selector: (row) => row.memberId, sortable: true },
    { name: "Transaction ID", selector: (row) => row.transactionId, sortable: true },
    { name: "Payment Date/Time", selector: (row) => row.date, sortable: true },
    {
      name: "Payment Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          className={`px-[16px] py-[6px] text-xs rounded-full font-semibold ${getStatusClass(
            row.status
          )}`}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Payment Type", selector: (row) => row.type, sortable: true },
    { name: "Net Amount", selector: (row) => row.amount.toFixed(2), sortable: true },
    { name: "GST", selector: (row) => row.gst.toFixed(2), sortable: true },
    {
      name: "Receipt",
      cell: () => (
        <button className="p-1 text-base bg-primary-300 rounded-[12.63px]">
          <MdOutlineFileDownload className="text-primary-200" /> 
        </button>
      ),
    },
  ];

  return (
    <div className=" mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">Account</h1>

        {/* Search */}
        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

        {/* Sort & Filter */}
        <div className="flex justify-end gap-3">
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

          <div className="flex items-center gap-2">
            <FiFilter className="text-primary-200 text-xl" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredTransactions}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
      />
    </div>
  );
};

export default Account;
