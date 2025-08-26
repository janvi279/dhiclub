import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

const responsibilityColumns = ({ updateResponsibility, handleEdit, deleteResponsibility, setResponsibilityList , handleViewVisitor}) => {
  const columns = [
    { name: "No.", selector: (_, index) => index + 1 },
    { name: "Member Id", selector: (row) => row.MemberId },
    { name: "Member Name", selector: (row) => row.memberName },
    { name: "Member Role", selector: (row) => row.memberRole },
    { name: "Business Category", selector: (row) => row.BusinessCategory },
    { name: "Assign Date", selector: (row) => new Date(row.assignDate).toLocaleDateString() },
    { name: "Mobile Number", selector: (row) => row.mobileNumber },
    {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-[20px] py-[6px] text-xs rounded-full font-semibold ${row.status === "Active"
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
      cell: (row, index) => (
        <div className="flex gap-5">
            <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
     onClick={() =>  handleViewVisitor(row)}
          >
           <FaRegEye/>
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
            onClick={() => handleEdit(row, index)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300"
            onClick={() => deleteResponsibility(index)}
          >
            <MdDeleteOutline />
          </button>
           <button
          className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateResponsibility({ ...row, status: "Active" })}
        >
          Active
        </button>
        <button
          className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          onClick={() => updateResponsibility({ ...row, status: "Deactive" })}
        >
          Deactive
        </button>
        </div>
      ),
    },
  ];

  return columns;
};

export default responsibilityColumns;
