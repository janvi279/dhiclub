import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

const Column = ({ onView, onEdit, onDelete, onStatusChange }) => [
    { name: "ID", selector: (row) => row.id, width: "60px" },
    { name: "MemberName", selector: (row) => row.memberName, sortable: true },
    { name: "Date", selector: (row) => row.date },
    { name: "Thank You to", selector: (row) => row.thankyouto, sortable: true },
    { name: "Referral Amount", selector: (row) => `₹${row.referralAmount}`, sortable: true },
    { name: "Business Type", selector: (row) => row.businessType },
    { name: "Referral Type", selector: (row) => row.referralType },
    { name: "Comment", selector: (row) => row.comment },


    {
        name: "Status",
        selector: (row) => row.status,
        cell: (row) => (
            <span
                className={`px-5 py-1.5 whitespace-nowrap rounded-full whitespace-nowrap  ${row.status === "Active"
                    ? "bg-primary-350 text-primary-400 font-semibold  "
                    : "bg-primary-450 text-primary-500 "
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
            label: "Edit",
            icon: <FaRegEdit />,
            onClick: () => onEdit(row),
            className: "text-primary-200",
          },
          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => onDelete(row.id),
            className: "text-red-600 border-t border-gray-100",
          },
          {
            label: "Paid",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => onStatusChange({ ...row, status: "Paid" }),
            className:
              row.status === "Paid"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Pending",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () => onStatusChange({ ...row, status: "Pending" }),
            className:
              row.status === "Pending"
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

export default Column;
