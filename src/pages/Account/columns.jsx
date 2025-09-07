import { MdOutlineFileDownload } from "react-icons/md";

export const accountColumns = (getStatusClass) => [
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
