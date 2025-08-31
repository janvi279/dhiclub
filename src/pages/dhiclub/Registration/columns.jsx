import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const registrationColumns = ({ setEditData, deleteRow, updateRow } = {}) => [
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
      <div className="flex gap-3">
        {setEditData && (
          <button
            className="text-primary-200 p-2 bg-primary-300 rounded-2xl"
            onClick={() => setEditData(row)}
          >
            <FaRegEdit />
          </button>
        )}
        {deleteRow && (
          <button
            className="text-primary-200 p-2 bg-primary-300 rounded-2xl"
            onClick={() => deleteRow(row.id)}
          >
            <MdDeleteOutline />
          </button>
        )}
      </div>
    ),
  },
];
