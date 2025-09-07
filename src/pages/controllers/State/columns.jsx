import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

export const stateColumns = ({ setEditData, deleteState, updateState }) => [
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
    name: "State Name",
    selector: (row) => row.stateName,
    sortable: true,
  },
  {
    name: "State Code",
    selector: (row) => row.stateCode,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-5 py-1.5 rounded-full  ${
          row.status === "Active"
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
            className: "text-blue-600",
          },
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => updateState(row.id, { status: "Active" }),
            className:
              row.status === "Active"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Deactive",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () => updateState(row.id, { status: "Deactive" }),
            className:
              row.status === "Deactive"
                ? "opacity-50 cursor-not-allowed"
                : "text-yellow-600",
          },

          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => deleteState(row.id),
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
