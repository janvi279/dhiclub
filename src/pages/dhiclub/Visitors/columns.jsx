import { FaRegEye } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

export const visitorColumns = ({ onView }) => [
  { name: "No.", selector: (row, index) => index + 1, width: "60px" },
  { name: "Visitor Name", selector: (row) => row.name, sortable: true },
  { name: "Mobile Number", selector: (row) => row.mobile, sortable: true },
  { name: "Company Name", selector: (row) => row.company, sortable: true },
  {
    name: "Business Category",
    selector: (row) => row.category,
    sortable: true,
  },
  { name: "City", selector: (row) => row.city, sortable: true },
  { name: "Chapter", selector: (row) => row.chapter, sortable: true },
  { name: "Date", selector: (row) => row.date, sortable: true },
  {
    name: "Status",
    cell: (row) => (
      <span
        className={`px-5 py-1.5 text-xs rounded-full font-semibold ${
          row.status === "Active"
            ? "bg-primary-350 text-primary-400"
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
            className: "text-primary-200 cursor-pointer",
          },
        ]}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];
