import { FaRegEye, FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const Column = ({ onView, onEdit, onDelete, onStatusChange }) => [
    { name: "ID", selector: (row) => row.id, width: "60px" },
    { name: "Member Name", selector: (row) => row.memberName, sortable: true },
    { name: "Date", selector: (row) => row.date },
    { name: "Thank You to", selector: (row) => row.thankyouto, sortable: true },
    { name: "Referral Amount", selector: (row) => `₹${row.referralAmount}`, sortable: true },
    { name: "Business Type", selector: (row) => row.businessType },
    { name: "Referral Type", selector: (row) => row.referralType },
    { name: "Comment", selector: (row) => row.comment },


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
        name: "Action",
        cell: (row) => (
            <div className="flex gap-3">
                <button onClick={() => onView(row)} className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap">
                    <FaRegEye />
                </button>
                <button onClick={() => onEdit(row)} className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap">
                    <FaRegEdit />
                </button>
                <button onClick={() => onDelete(row.id)} className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap">
                    <MdDeleteOutline />
                </button>
                <button
                    className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
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
    },
];

export default Column;
