import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

const Column = ({ onView, onEdit, onDelete, onStatusChange }) => [
  { name: "ID", selector: (row) => row.id, width: "60px" },
  { name: "Member Name", selector: (row) => row.memberName, sortable: true },
  { name: "Referral To", selector: (row) => row.referralTo, sortable: true },
  { name: "Referral Type", selector: (row) => row.referralType, sortable: true },
  { name: "Referral Status", selector: (row) => row.referralStatus, sortable: true },
  { name: "Mobile Number", selector: (row) => row.mobileNumber, sortable: true },
  { name: "Email Id", selector: (row) => row.emailId, sortable: true },

  {
    name: "Status",
    cell: (row) => (
      <span
        className={`px-5 py-1.5 rounded-full whitespace-nowrap ${row.status === "Active"
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
  }
];

export default Column;
