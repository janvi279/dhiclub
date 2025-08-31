import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

export const countryColumns = ({ setEditData, deleteCountry, updateCountry }) => [
  {
    name: "No.",
    selector: (_, index) => index + 1,
  },
  {
    name: "Country Name",
    selector: (row) => row.countryName,
    sortable: true,
  },
  {
    name: "Country Code",
    selector: (row) => row.countryCode,
    sortable: true,
  },
  {
    name: "Country Currency",
    selector: (row) => row.currency,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-5 py-1.5 rounded-full  ${row.status === "Active"
          ? "bg-primary-350 text-primary-400 font-semibold  "
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
      <div className="flex gap-3">
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => setEditData(row)}
        > <FaRegEdit /></button>
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => deleteCountry(row.id)}
        ><MdDeleteOutline /></button>
        <button
          className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateCountry({ ...row, status: "Active" })}
        >
          Active
        </button>
        <button
          className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateCountry({ ...row, status: "Deactive" })}
        >
          Deactive
        </button>
      </div>
    ),
  },
];
