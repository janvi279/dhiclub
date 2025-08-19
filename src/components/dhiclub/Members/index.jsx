import { useState, useEffect } from "react";
import {
  FaPlus,
  FaSearch,
  FaSortAmountDownAlt,
  FaRegEdit,
} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { useMemberList } from "../../../context/MemberListContext";
import { RiContactsLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";

const Members = () => {
  const { members, addMember } = useMemberList(); // Use context instead of localStorage
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newTeam, setNewTeam] = useState({ teamName: "", country: "" });
  const [sortOrder, setSortOrder] = useState("newest");
  const [showModal, setShowModal] = useState(false);
  const [viewMember, setViewMember] = useState(null)
  const [activeTab, setActiveTab] = useState("personal");

  const navigate = useNavigate();

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
    const matchesQuery = member.teamName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || member.status === statusFilter;
    return matchesQuery && matchesStatus;
  });
  const customStyles = {
    headRow: {
      style: {
        border: "none",
        backgroundColor: "#F5F8FD",
        borderRadius: "10px",
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#061237",

        border: "none",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        color: "#061237",
        fontWeight: 500,
      },
    },
  };
  const columns = [
    { name: "Member Id", selector: (row) => row.teamName, sortable: true },
    { name: "Member Name", selector: (row) => row.teamName, sortable: true },
    {
      name: "Business Category",
      selector: (row) => row.teamName,
      sortable: true,
    },
    { name: "Company Name", selector: (row) => row.teamName, sortable: true },
    { name: "Mobile Number", selector: (row) => row.teamName, sortable: true },
    { name: "Email Id", selector: (row) => row.teamName, sortable: true },
    { name: "Membership", selector: (row) => row.teamName, sortable: true },
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
        <div className="flex gap-3">
          <button
            className="text-primary-200 text-base rounded-2xl p-2  whitespace-nowrap"
            onClick={() => setViewMember(row)}
          >
            <FaRegEye />
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
            onClick={() => handleEdit(index)}
          >
            <FaRegEdit />
          </button>
          <button
            className="text-primary-200 text-base rounded-2xl p-2 bg-primary-300 whitespace-nowrap"
            onClick={() => handleDelete(index)}
          >
            <MdDeleteOutline />
          </button>
          <button
            className="text-primary-400 px-2 py-1 border-primary-400 border  font-semibold rounded-full whitespace-nowrap"
          // onClick={() => deleteState(index)}
          >
            Active
          </button>
          <button
            className="text-primary-500 px-2 py-1 border border-primary-500 font-semibold rounded-full whitespace-nowrap"
          // onClick={() => deleteState(index)}
          >
            Deactive
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className=" mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-primary-150">All Members</h1>
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
            <FaSortAmountDownAlt className="text-primary-200" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-primary-200 text-xl" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="font-semibold text-primary-150 py-2 text-base focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
          </div>
          <button
            className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
            onClick={() => setShowModal(true)}
          >
            <RiContactsLine /> Assign Role
          </button>
          <button
            className="bg-primary-200 text-white px-4 py-2 rounded-full cursor-pointer flex items-center gap-2"
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
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Assign Role
            </h2>
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
              className="bg-primary-200 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
              onClick={handleAddTeam}
            >
              Approve
            </button>
          </div>
        </div>
      )}
      {viewMember && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 relative">
            {/* Header */}
            <h2 className="text-primary-150 text-lg font-bold">View Member</h2>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => setViewMember(null)}
            >
              ×
            </button>

            {/* Top Section */}
            <div className="flex pt-5 gap-5 text-primary-150">
              {/* Profile Icon / Image */}
              <div className="bg-gray-200 h-20 w-20 rounded-lg"></div>

              {/* Member Details */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
                <p><span className="font-semibold">Member Id:</span> {viewMember.memberId}</p>
                <p><span className="font-semibold">Team Name:</span> {viewMember.teamName}</p>
                <p><span className="font-semibold">Member Name:</span> {viewMember.memberName}</p>
                <p><span className="font-semibold">Business Category:</span> {viewMember.businessCategory}</p>
                <p><span className="font-semibold">Joining Date:</span> {viewMember.joiningDate}</p>
                <p><span className="font-semibold">Membership:</span> {viewMember.membership}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-300 mt-6">
              <div className="flex gap-8 text-sm font-medium text-primary-150">
                <button
                  className={`pb-2 ${activeTab === "personal"
                    ? "border-b-2 border-primary-200 text-primary-200"
                    : "text-primary-150"
                    }`}
                  onClick={() => setActiveTab("personal")}
                >
                  Personal Details
                </button>
                <button className={`pb-2 ${activeTab === "business"
                  ? "border-b-2 border-primary-200 text-primary-200"
                  : "text-primary-150"
                  }`} onClick={() => setActiveTab("business")}>Business Details</button>
                <button className={`pb-2 ${activeTab === "transaction"
                  ? "border-b-2 border-primary-200 text-primary-200"
                  : "text-primary-150"
                  }`} onClick={() => setActiveTab("transaction")}>Transaction Details</button>
                <button className={`pb-2 ${activeTab === "member"
                  ? "border-b-2 border-primary-200 text-primary-200"
                  : "text-primary-150"
                  }`} onClick={() => setActiveTab("member")}>Member Performance</button>
              </div>
            </div>

            {/* Personal Details */}
            {/* Content based on activeTab */}
            {activeTab === "personal" && (
              <div>
                <div className="grid grid-cols-2 gap-y-3 text-sm text-primary-150 mt-4">
                  <p><span className="font-semibold">Full Name:</span> Poonam Tala</p>
                  <p><span className="font-semibold">Education:</span> MBA</p>
                  <p><span className="font-semibold">Contact Number:</span> +91 1234567890</p>
                  <p><span className="font-semibold">DOB:</span> 29/07/2000</p>
                  <p><span className="font-semibold">E-Mail ID:</span> poonamtala@gmail.com</p>
                  <p><span className="font-semibold">Address:</span> Runway Heights, Ayodhya Chowk, 150 Ft. Ring Road, Rajkot</p>

                </div>
                {/* Attachments */}
                <div className="mt-6">
                  <div className="grid grid-cols-4 gap-4 text-primary-150 font-semibold">
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 h-20 w-full rounded-lg"></div>
                      <p className="text-sm mt-2">Aadhar Card</p>
                      <p className="text-xs text-primary-150 ">Created: 01/07/2025</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 h-20 w-full rounded-lg"></div>
                      <p className="text-sm mt-2">Pan Card</p>
                      <p className="text-xs text-primary-150">Created: 01/07/2025</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 h-20 w-full rounded-lg"></div>
                      <p className="text-sm mt-2">Driving Licence</p>
                      <p className="text-xs text-primary-150">Created: 01/07/2025</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-gray-200 h-20 w-full rounded-lg"></div>
                      <p className="text-sm mt-2">Ration Card</p>
                      <p className="text-xs text-primary-150">Created: 01/07/2025</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "business" && (

              <div className="grid grid-cols-2 gap-y-3 text-sm text-primary-150 mt-4">
                <p><span className="font-semibold">Business Category :</span> Software Development</p>
                <p><span className="font-semibold">Staff Count  :</span> 50 </p>
                <p><span className="font-semibold">Company Name :</span> Alphabit Infoway</p>
                <p><span className="font-semibold">GST Number :</span> abcd12345as</p>
                <p><span className="font-semibold">Company Registration :</span> ABCD</p>
                <p><span className="font-semibold">Office Number :</span> +91 1234567890</p>
                <p><span className="font-semibold">Established Year  :</span> 2018</p>
                <p><span className="font-semibold">Office Email  :</span> info@alphabitinfoway.com</p>
              </div>
            )}
            {activeTab === "transaction" && (

              <div className="grid grid-cols-1 gap-y-3 text-sm text-primary-150 mt-4">
                <p><span className="font-semibold">Transaction ID :</span> 1234567890</p>
                <p><span className="font-semibold">Payment Type :</span> UPI</p>
                <p><span className="font-semibold">Net Amount :</span> 2000/- (without GST)</p>
                <p><span className="font-semibold">Membership Duration :</span> 1 Year</p>

              </div>
            )}
            {activeTab === "member" && (
              <div>
                <div className="flex gap-5 pt-5">
                  <button className="bg-primary-200 text-white rounded rounded-lg p-2 text-xs">6 MONTHS</button>
                  <button className="text-primary-200 rounded font-medium rounded-lg  text-xs">12 MONTHS</button>
                  <button className="text-primary-200 font-medium rounded rounded-lg  text-xs">LIFETIME</button>
                </div>
                <div className="grid grid-cols-1 gap-y-3 text-sm text-primary-150 mt-4">
                  <p><span className="font-semibold">Attendance :</span> 90%</p>
                  <p><span className="font-semibold">Reference :</span> 10</p>
                  <p><span className="font-semibold">TYFCB :</span> 00</p>
                  <p><span className="font-semibold">Testimonials :</span> 02</p>
                  <p><span className="font-semibold">Face to Face :</span> 04</p>

                </div>
              </div>
            )}

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
