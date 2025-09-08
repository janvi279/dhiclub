import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

const responsibilityColumns = ({ updateResponsibility, handleEdit, deleteResponsibility , handleViewVisitor}) => {
  const columns = [
    { name: "No.", selector: (_, index) => index + 1 },
    { name: "Member Id", selector: (row) => row.MemberId },
    { name: "Member Name", selector: (row) => row.memberName },
    { name: "Member Role", selector: (row) => row.memberRole },
    { name: "Business Category", selector: (row) => row.BusinessCategory },
    { name: "Assign Date", selector: (row) => new Date(row.assignDate).toLocaleDateString() },
    { name: "Mobile Number", selector: (row) => row.mobileNumber },
    {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-5 py-1.5 whitespace-nowrap text-xs rounded-full font-semibold ${row.status === "Active"
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
            onClick: () => handleViewVisitor(row),
            className: "text-primary-200",
          },
          {
            label: "Edit",
            icon: <FaRegEdit />,
            onClick: () => handleEdit(row),
            className: "text-blue-600",
          },
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => updateResponsibility({ ...row, status: "Active" }),
            className:
              row.status === "Active"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Deactive",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () =>
              updateResponsibility({ ...row, status: "Deactive" }),
            className:
              row.status === "Deactive"
                ? "opacity-50 cursor-not-allowed"
                : "text-yellow-600",
          },
          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => deleteResponsibility(row.MemberId),
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

  return columns;
};

export default responsibilityColumns;
