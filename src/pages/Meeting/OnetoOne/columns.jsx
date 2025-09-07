import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

const Column = ({ onView, onEdit, onDelete, onStatusChange }) => [
  { name: "ID", selector: (row) => row.id, width: "60px" },
  { name: "Met With", selector: (row) => row.metWith, sortable: true },
  { name: "Initiated By", selector: (row) => row.initiatedBy },
  { name: "Where You Meet", selector: (row) => row.whereYouMeet },
  { name: "Date", selector: (row) => row.date },
  { name: "Topic of Conversation", selector: (row) => row.twc },
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
      <CustomActions
        options={[
          {
            label: "View",
            icon: <FaRegEye />,
            onClick: () => onView(row),
            className: "text-primary-200",
          },
          {
            label: "Edit",
            icon: <FaRegEdit />,
            onClick: () => onEdit(row),
            className: "text-blue-600",
          },
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => onStatusChange({ ...row, status: "Active" }),
            className:
              row.status === "Active"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Deactive",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () => onStatusChange({ ...row, status: "Deactive" }),
            className:
              row.status === "Deactive"
                ? "opacity-50 cursor-not-allowed"
                : "text-yellow-600",
          },
          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => onDelete(row.id),
            className: "text-red-600 border-t border-gray-100",
          },
        ]}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default Column;
