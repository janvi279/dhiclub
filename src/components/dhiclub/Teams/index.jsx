import { useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaPlus,
  FaSearch,
  FaSortAmountDownAlt,
  FaRegEdit,
} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

const countries = ["India", "USA", "UK"];
const states = ["Gujarat", "Maharashtra", "Delhi"];
const cities = ["Ahmedabad", "Surat", "Mumbai"];

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    pincode: "",
    teamName: "",
    launchDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = () => {
    const newTeam = {
      id: teams.length + 1,
      teamName: formData.teamName,
      captainName: "Auto Captain " + (teams.length + 1),
      launchDate: formData.launchDate || new Date().toISOString().split("T")[0],
      members: Math.floor(Math.random() * 10) + 1,
      status: "Active",
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      createdAt: new Date(),
    };

    setTeams((prev) => [...prev, newTeam]);
    resetForm();
  };

  const handleEdit = (index) => {
    const team = teams[index];
    setFormData({
      country: team.country,
      state: team.state,
      city: team.city,
      pincode: team.pincode,
      teamName: team.teamName,
      launchDate: team.launchDate,
    });
    setEditIndex(index);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedTeam = {
      ...teams[editIndex],
      teamName: formData.teamName,
      country: formData.country,
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      launchDate: formData.launchDate,
    };

    const newTeamList = [...teams];
    newTeamList[editIndex] = updatedTeam;
    setTeams(newTeamList);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      country: "",
      state: "",
      city: "",
      pincode: "",
      teamName: "",
      launchDate: "",
    });
    setModalOpen(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    const newList = [...teams];
    newList.splice(index, 1);
    setTeams(newList);
  };

  const filteredList = teams
    .filter(
      (item) =>
        item.teamName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (statusFilter === "all" || item.status === statusFilter)
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
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
    { name: "NO", selector: (row, index) => index + 1 },
    { name: "Team Name", selector: (row) => row.teamName, sortable: true },
    { name: "Meeting Day", selector: (row) => row.launchDate, sortable: true },
    { name: "Captain Name", selector: (row) => row.captainName },
    { name: "Team Launching Date", selector: (row) => row.launchDate },
    { name: "No. of Members", selector: (row) => row.members },
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
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold text-[#061237]">Team List</h1>

        <div className="relative w-64">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search Team..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          />
        </div>

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
          <FiFilter className="text-[#6246EA] text-xl" />
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
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
          className="bg-[#6246EA] text-white px-4 py-2 rounded-[40px] cursor-pointer flex items-center gap-2"
        >
          <FaPlus /> Add Team
        </button>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredList}
         pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-[20px] shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-3 text-center text-[#061237]">
              {isEditing ? "Edit Team" : "Add New Team"}
            </h2>
            <button
              className="absolute top-3 right-3 text-xl"
              onClick={() => setModalOpen(false)}
            >
              ×
            </button>

            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full mb-3 border border-gray-300  rounded-[10px] px-3 py-2"
            >
              <option value="">Select Country</option>
              {countries.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <select
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full mb-3 border border-gray-300 rounded-[10px] px-3 py-2"
            >
              <option value="">Select State</option>
              {states.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <select
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full mb-3 border border-gray-300 rounded-[10px] px-3 py-2"
            >
              <option value="">Select City</option>
              {cities.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <input
              name="teamName"
              placeholder="Team Name"
              value={formData.teamName}
              onChange={handleInputChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-3"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-3"
            />

            <input
              name="launchDate"
              type={formData.launchDate ? "date" : "text"}
              value={formData.launchDate}
              placeholder="Meeting Day"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => {
                if (!e.target.value) e.target.type = "text";
              }}
              onChange={handleInputChange}
              className="focus:outline-none border border-gray-300 rounded-[10px] px-3 py-2 w-full mb-5"
            />

            <button
              className="w-50 block mx-auto bg-[#6246EA] text-white py-2 rounded-[40px] cursor-pointer"
              onClick={isEditing ? handleUpdate : handleAdd}
            >
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
