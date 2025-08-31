import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

export const bulkUploadColumns = ({ setEditData, deleteBulkUpload, updateBulkUpload }) => [
  {
    name: "Country",
    selector: (row) => row.country,
    sortable: true,
  },
  {
    name: "Country Code",
    selector: (row) => row.countryCode,
  },
  {
    name: "Currency",
    selector: (row) => row.countryCurrency,
  },
  {
    name: "State",
    selector: (row) => row.state,
  },
  {
    name: "State Code",
    selector: (row) => row.stateCode,
  },
  {
    name: "City",
    selector: (row) => row.city,
  },
  {
    name: "City Code",
    selector: (row) => row.cityCode,
  },
  {
    name: "Pincode",
    selector: (row) => row.pinCode,
  },
  {
    name: "Status",
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
    name: "Action",
    cell: (row) => (
      <div className="flex gap-3">
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => setEditData(row)}
        >
          <FaRegEdit />
        </button>
        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => deleteBulkUpload(row.id)}
        >
          <MdOutlineDelete />
        </button>
        <button
          className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateBulkUpload({ ...row, status: "Active" })}
        >
          Active
        </button>
        <button
          className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateBulkUpload({ ...row, status: "Deactive" })}
        >
          Deactive
        </button>
      </div>
    ),
  },
];
