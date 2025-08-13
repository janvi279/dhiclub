import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAmountDownAlt, FaFilter,  FaRegEdit } from "react-icons/fa";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useMemberList } from "../../../context/MemberListContext";
import { RiContactsLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

const Members = () => {
  const { members, addMember } = useMemberList(); // Use context instead of localStorage
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newTeam, setNewTeam] = useState({ teamName: "", country: "" });
  const [sortOrder, setSortOrder] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const navigate=useNavigate();
  

  const countries = ["India", "USA", "Canada"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = () => {
    if (newTeam.teamName && newTeam.country) {
      const entry = {
        ...newTeam,
        status: "Active",
        state: "-",
        city: "-",
        joiningDate: new Date().toISOString().split("T")[0], // Add joining date
      };
      addMember(entry); // Call context method
      setNewTeam({ teamName: "", country: "" });
      setShowModal(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredMembers = members.filter((member) => {
    const matchesQuery = member.teamName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || member.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
  const customStyles = {
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: 600,
        color: "#061237",
        backgroundColor:"#F5F8FD"
      },
    },
    cells: {
      style: {
        fontSize: "12px",
        color: "#061237",
        fontWeight: 500,
      },
    },
    pagination: {
      style: {
        borderTop: "none", // bottom line remove
        boxShadow: "none", // koi shadow hoy to remove
      },
    },
  };
  const columns = [
    { name: "Member Id", selector: (row) => row.teamName, sortable: true },
    { name: "Member Name", selector: (row) => row.teamName, sortable: true },
      { name: "Business Category", selector: (row) => row.teamName, sortable: true },
        { name: "Company Name", selector: (row) => row.teamName, sortable: true },
      { name: "Mobile Number", selector: (row) => row.teamName, sortable: true },
        { name: "Email Id", selector: (row) => row.teamName, sortable: true },
      { name: "Membership", selector: (row) => row.teamName, sortable: true },
     {
           name: "Status",
           selector: (row) => row.status,
           cell: (row) => (
             <span
               className={`px-[20px] py-[6px] text-xs rounded-[40px] font-semibold ${
                 row.status === "Active"
                   ? "bg-green-100 text-green-800"
                   : "bg-red-100 text-red-800"
               }`}
             >
               {row.status}
             </span>
           ),
         },
         {
           name: "Actions",
           cell: (row, index) => (
             <div className="flex gap-3">
               <button
                 className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF] whitespace-nowrap"
                 onClick={() => handleEdit(index)}
               >
                 <FaRegEdit />
               </button>
               <button
                 className="text-[#6246EA] text-base rounded-[15.79px] p-[8px] bg-[#E4E7FF] whitespace-nowrap"
                 onClick={() => handleDelete(index)}
               >
                 <MdDeleteOutline />
               </button>
               <button
                 className="text-[#429667] px-2 py-1 border-[#429667] border  font-semibold rounded-[40px] whitespace-nowrap"
                 // onClick={() => deleteState(index)}
               >
                 Active
               </button>
               <button
                 className="text-[#A00C19] px-2 py-1 border border-[#A00C19] font-semibold rounded-[40px] whitespace-nowrap"
                 // onClick={() => deleteState(index)}
               >
                 Deactive
               </button>
             </div>
           ),
         },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-[#061237]">All Members</h1>
         <div className="relative w-64">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Team..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>
        <div className="flex justify-end gap-3">
         
          <div className="flex items-center gap-2">
            <FaSortAmountDownAlt className="text-[#6246EA]" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-semibold text-[#061237] py-2 text-base focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <FaFilter className="text-[#6246EA]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="font-semibold text-[#061237] py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
             <button
            className="bg-[#6246EA] text-white px-4 py-2 rounded-[40px] cursor-pointer flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
           <RiContactsLine /> Assign Role
          </button>
          <button
            className="bg-[#6246EA] text-white px-4 py-2 rounded-[40px] cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/Dhiclub/members/AddMember")}
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">Assign Role</h2>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            {/* Search input */}
            <div className="relative mb-3">
              <input
                type="text"
                placeholder="Search a member"
                className="w-full border border-gray-300 rounded pl-3 pr-3 py-3 text-gray-700 focus:outline-none"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>

            <input
              type="text"
              name="teamName"
              value={newTeam.teamName}
              placeholder="Enter Team Name"
              className="w-full mb-3 border border-gray-300 rounded px-3 py-3"
              onChange={handleChange}
            />

            <select
              name="country"
              className="text-gray-700 border border-gray-300 rounded px-3 py-3 w-full mb-3"
              onChange={handleChange}
              value={newTeam.country}
            >
              <option value="">Select Country</option>
              {countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="bg-[#6246EA] text-white px-4 py-2 rounded w-full hover:bg-purple-700"
              onClick={handleAddTeam}
            >
              Approve
            </button>
          </div>
        </div>
      )}

      {/* Member table */}
      <DataTable
        columns={columns}
        data={filteredMembers}
        pagination
        highlightOnHover
        striped
      customStyles={customStyles}
      />
    </div>
  );
};

export default Members;
