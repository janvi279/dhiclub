import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export const businessCategoryColumns = ({ setEditData, deleteCategory, updateCategory }) => [
  {
    name: "No.",
    selector: (_, index) => index + 1,
  },
  {
    name: "Business Type",
    selector: (row) => row.type,
    sortable: true,
  },
  {
    name: "Business Domain",
    selector: (row) => row.domain,
    sortable: true,
  },
  {
    name: "Business Category",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Status",
    cell: (row) => (
      <span
        className={`px-2 py-1 text-xs rounded-full font-medium ${
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
      <div className="flex gap-2">
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => setEditData(row)}
        >
          <FaRegEdit />
        </button>
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => deleteCategory(row.id)}
        >
          <MdOutlineDelete />
        </button>
        <button
          className="text-primary-400 px-2 py-1 border border-primary-400 font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateCategory({ ...row, status: "Active" })}
        >
          Active
        </button>
        <button
          className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateCategory({ ...row, status: "Deactive" })}
        >
          Deactive
        </button>
      </div>
    ),
  },
];
