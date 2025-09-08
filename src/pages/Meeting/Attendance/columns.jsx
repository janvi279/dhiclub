import { FaRegEye } from "react-icons/fa";
import CustomActions from "../../../components/common/customActions";

export const AttendanceColumns = ({ onView, updateAttendance }) => [
  { name: "No", selector: (_, index) => index + 1, width: "80px" },
  { name: "Meeting Id", selector: (row) => row.meetingId, sortable: true },
  { name: "Members", selector: (row) => row.members, sortable: true },
  { name: "Present", selector: (row) => row.present, sortable: true },
  { name: "Absent", selector: (row) => row.absent, sortable: true },
  { name: "Substitute", selector: (row) => row.substitute, sortable: true },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-5 py-1.5 whitespace-nowrap rounded-full text-xs font-medium ${
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
      <CustomActions
        options={[
          {
            label: "View",
            icon: <FaRegEye />,
            onClick: () => onView(row),
            className: "text-blue-600",
          },
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => updateAttendance(row.id, { status: "Active" }),
            className:
              row.status === "Active"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Deactive",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () => updateAttendance(row.id, { status: "Deactive" }),
            className:
              row.status === "Deactive"
                ? "opacity-50 cursor-not-allowed"
                : "text-yellow-600",
          },
        ]}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
