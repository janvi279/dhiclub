import { FaRegEye } from "react-icons/fa";
import CustomActions from "../../../components/common/customActions";

const testimonialColumns = (onView, onStatusChange) => [
  {
    name: "No",
    selector: (row, index) => index + 1,
    sortable: true,
    width: "70px",
  },
  {
    name: "Sender",
    selector: (row) => row.name,
    sortable: true,
  },
  {
    name: "Receiver",
    selector: (row) => row.designation,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
    wrap: true, // ✅ auto-wrap
  },
  {
    name: "Testimonial",
    selector: (row) => row.message,
    sortable: false,
    wrap: true, // ✅ wrap long text
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-5 py-1.5 rounded-full ${row.status === "Active"
            ? "bg-primary-350 text-primary-400 font-semibold"
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
      <CustomActions
        options={[
          {
            label: "View",
            icon: <FaRegEye />,
            onClick: () => onView(row),
            className: "text-primary-200",
          },
        
          {
            label: "Active",
            icon: <span className="w-2 h-2 rounded-full bg-green-500"></span>,
       onClick: () => onStatusChange({ ...row, status: "Active" }),

            className:
              row.status === "Active"
                ? "opacity-50 cursor-not-allowed"
                : "text-green-600",
          },
          {
            label: "Deactive",
            icon: <span className="w-2 h-2 rounded-full bg-yellow-500"></span>,
           onClick:() => onStatusChange({ ...row, status: "Deactive" }),
            className:
              row.status === "Deactive"
                ? "opacity-50 cursor-not-allowed"
                : "text-yellow-600",
          },
        
        ]}
      />
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  }]

export default testimonialColumns;
