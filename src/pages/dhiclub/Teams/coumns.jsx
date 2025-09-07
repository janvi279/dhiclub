import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import CustomActions from "../../../components/common/customActions";

export const teamColumns = ({ setEditData, deleteTeam, updateTeam }) => [
  { name: "NO", selector: (row, index) => index + 1 },
  { name: "Team Name", selector: (row) => row.teamName, sortable: true },
  { name: "Meeting Day", selector: (row) => row.launchDate, sortable: true },
  { name: "Captain Name", selector: (row) => row.captainName },
  { name: "Team Launching Date", selector: (row) => row.launchDate },
  { name: "No. of Members", selector: (row) => row.members },
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
            label: "Edit",
            icon: <FaRegEdit />,
            onClick: () => setEditData(row),
            className: "text-blue-600",
          },
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
            onClick: () => updateTeam({ ...row, status: "Active" }),
            className:
              row.status === "Active"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Deactive",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
            onClick: () => updateTeam({ ...row, status: "Deactive" }),
            className:
              row.status === "Deactive"
                ? "opacity-50 cursor-not-allowed"
                : "text-yellow-600",
          },
          {
            label: "Delete",
            icon: <MdDeleteOutline />,
            onClick: () => deleteTeam(row.id),
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
