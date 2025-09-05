import CustomActions from "../../../components/common/customActions";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
export const cityColumns = ({ setEditData, deleteCity, updateCity }) => [
  {
    name: "No.",
    selector: (_, index) => index + 1,
  },
  {
    name: "City Name",
    selector: (row) => row.cityName,
    sortable: true,
  },
  {
    name: "City Code",
    selector: (row) => row.cityCode,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-3 py-1.5 rounded-full  ${row.status === "Active"
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
      <CustomActions
      options={[
          {
            label: "Edit",
            icon: <FaRegEdit />,
            onClick: () => setEditData(row),
            className: "text-blue-600"
          },
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => updateCity({ ...row, status: "Active" }),
            className: row.status === "Active" ? "opacity-50 cursor-not-allowed" : "text-green-600"
          },
          {
            label: "Deactive", 
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () => updateCity({ ...row, status: "Deactive" }),
            className: row.status === "Deactive" ? "opacity-50 cursor-not-allowed" : "text-yellow-600"
          },
          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => deleteCity(row.id),
            className: "text-red-600 border-t border-gray-100"
          }
        ]}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }

];

