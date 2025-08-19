import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const Members = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTeam, setNewTeam] = useState({ teamName: "", country: "" });
  const navigate = useNavigate();

  const countries = ["Admin", "Moderator", "Viewer"];

  // Static members data
  const staticMembers = [
    {
      teamName: "Alpha Team",
      country: "Admin",
      state: "California",
      city: "Los Angeles",
      joiningDate: "2025-08-01",
    },
    {
      teamName: "Beta Squad",
      country: "Moderator",
      state: "Texas",
      city: "Houston",
      joiningDate: "2025-07-15",
    },
    {
      teamName: "Gamma Group",
      country: "Viewer",
      state: "New York",
      city: "New York City",
      joiningDate: "2025-06-20",
    },
    {
      teamName: "Delta Force",
      country: "Admin",
      state: "Florida",
      city: "Miami",
      joiningDate: "2025-08-10",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeam({ ...newTeam, [name]: value });
  };

  const handleAddTeam = () => {
    if (newTeam.teamName && newTeam.country) {
      const entry = {
        ...newTeam,
        state: "-",
        city: "-",
        joiningDate: new Date().toLocaleDateString(),
      };
      // Add new entry to filteredMembers for demo purpose
      filteredMembers.push(entry);
      setFilteredMembers([...filteredMembers]);
      setNewTeam({ teamName: "", country: "" });
      setShowModal(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const filtered = staticMembers.filter((m) =>
        m.teamName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers([]);
    }
  };

  // Columns for DataTable
  const columns = [
    { name: "Team Name", selector: row => row.teamName, sortable: true },
    { name: "Country", selector: row => row.country, sortable: true },
    { name: "State", selector: row => row.state || "-", sortable: true },
    { name: "City", selector: row => row.city || "-", sortable: true },
    { name: "Joining Date", selector: row => row.joiningDate || "-", sortable: true },
    {
      name: "Action",
      cell: row => (
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            VIEW
          </button>
          <button className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600">
            Edit Role
          </button>
        </div>
      ),
    },
  ];

  const dataToShow = filteredMembers.length ? filteredMembers : staticMembers;

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-xl font-semibold">All Members</h1>
        <div className="flex justify-end gap-3">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={() => setShowModal(true)}
          >
            Assign Role
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={() => navigate("/addMember")}
          >
            Add New Member
          </button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h2 className="text-2xl font-semibold mb-4 text-center">Assign Role</h2>
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <input
              type="text"
              placeholder="Search a member"
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              value={searchQuery}
              onChange={handleSearch}
            />

            <input
              type="text"
              name="teamName"
              value={newTeam.teamName}
              placeholder="Enter Team Name"
              className="w-full mb-3 border border-gray-300 rounded px-3 py-2"
              onChange={handleChange}
            />

            <select
              name="country"
              value={newTeam.country}
              onChange={handleChange}
              className="w-full mb-3 border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Role</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={handleAddTeam}
            >
              Approve
            </button>
          </div>
        </div>
      )}

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={dataToShow}
        pagination
        highlightOnHover
        responsive
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search Team Name"
            className="border border-gray-300 rounded px-3 py-2"
            value={searchQuery}
            onChange={handleSearch}
          />
        }
      />
    </div>
  );
};

export default Members;
