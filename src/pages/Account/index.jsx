import { useState } from "react";
import DataTable from "react-data-table-component";
import { accountColumns } from "./columns";
import AccountSearch from "./components/search";
import AccountFilters from "./components/filter";
import customStyles from "../../components/custom/customStyle";

const Account = () => {
  const [search, setSearch] = useState("");
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

  // ✅ Status pill styles
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

  // ✅ Filtering + Search + Sorting
  const filteredTransactions = transactions
    .filter((t) => {
      const matchesQuery =
        t.memberId.toLowerCase().includes(search.toLowerCase()) ||
        t.transactionId.includes(search);
      const matchesStatus = statusFilter === "all" || t.status === statusFilter;
      return matchesQuery && matchesStatus;
    })
    .sort((a, b) => (sortOrder === "newest" ? b.no - a.no : a.no - b.no));

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">Account</h1>
        <AccountSearch search={search} setSearch={setSearch} />
        <div className="flex gap-4 max-sm:flex-wrap">
          
          <AccountFilters
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
        </div>
      </div>

      {/* Data Table */}
      <DataTable
        columns={accountColumns(getStatusClass)}
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
