import { FaRegEye } from "react-icons/fa";

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
      <div className="flex gap-3">

        <button
          className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
          onClick={() => onView(row)}
        >
          <FaRegEye size={18} />
        </button>

        <button
          className="text-primary-400 px-2 py-1 border-primary-400 border font-semibold rounded-full whitespace-nowrap"
          onClick={() => onStatusChange({ ...row, status: "Active" })}
        >
          Active
        </button>


        <button
          className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          onClick={() => onStatusChange({ ...row, status: "Deactive" })}
        >
          Deactive
        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
  },
];

export default testimonialColumns;
