import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

export const registrationColumns = ({ setEditData, deleteRow } = {}) => [
  {
    name: "No.",
    selector: (_, index) => index + 1,
  },
  { name: "Full Name", selector: (row) => row.fullName, sortable: true },
  { name: "Email", selector: (row) => row.email, sortable: true },
  { name: "Phone", selector: (row) => row.phone, sortable: true },
  { name: "Company", selector: (row) => row.companyName, sortable: true },
  { name: "City", selector: (row) => row.city, sortable: true },

{
    name: "Actions",
    cell: (row) => (
      <CustomActions
        options={[
          {
            label: "Edit",
            icon: <FaRegEdit />,
            onClick: () => setEditData(row),
            className: "text-blue-600",
          },
          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => deleteRow(row.id),
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
