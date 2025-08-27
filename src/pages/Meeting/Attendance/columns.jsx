import { FaRegEye } from "react-icons/fa";

export const AttendanceColumns = (onView) => [
  { name: "No", selector: row => row.no, sortable: true, width: "80px" },
  { name: "Meeting Id", selector: row => row.meetingId, sortable: true },
  { name: "Members", selector: row => row.members, sortable: true },
  { name: "Present", selector: row => row.present, sortable: true },
  { name: "Absent", selector: row => row.absent, sortable: true },
  { name: "Substitute", selector: row => row.substitute, sortable: true },
  { 
    name: "Status", 
    selector: row => row.status,
    cell: row => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        row.status === "Active" 
          ? "bg-green-100 text-green-600" 
          : "bg-red-100 text-red-600"
      }`}>
        {row.status}
      </span>
    )
  },
  {
    name: "Action",
    cell: row => (
      <button
       className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
        onClick={() => onView(row)}
      >
       <FaRegEye/>
      </button>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];