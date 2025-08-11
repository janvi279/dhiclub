import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ArrowDownUp, Funnel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemberList } from "../../../context/MemberListContext";

const Members = () => {
    const { members, addMember } = useMemberList(); // ⬅️ use context instead of localStorage
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNames, setFilteredNames] = useState([]);
    const [newTeam, setNewTeam] = useState({ teamName: "", country: "" });

    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const countries = ["India", "USA", "Canada"];

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
            };
            addMember(entry); // ✅ call context method
            setNewTeam({ teamName: "", country: "" });
            setShowModal(false);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const matches = members.filter((m) =>
                m.teamName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredNames(matches);
        } else {
            setFilteredNames([]);
        }
    };
    useEffect(() => {
        console.log("Context Members:", members);
        console.log("LocalStorage:", localStorage.getItem("members"));
    }, [members]);

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">All Members</h1>
                <div className="flex justify-end gap-3">

                    <button
                        className="mt-5 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm w-28"
                        onClick={() => navigate("/verification")}
                    >
                        Add New <br /> Member
                    </button>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center z-50">
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
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
                            <input
                                type="text"
                                placeholder="Search a member"
                                className="w-full border border-gray-300 rounded pl-10 pr-3 py-3 text-gray-700 focus:outline-none"
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                            {filteredNames.length > 0 && (
                                <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded shadow z-10">
                                    {filteredNames.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setNewTeam({ ...newTeam, teamName: item.teamName });
                                                setSearchQuery(item.teamName);
                                                setFilteredNames([]);
                                            }}
                                        >
                                            {item.teamName}
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                            <option value="">Select Role</option>
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
            <table className="w-full mt-5 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-[#F3F4F6] text-sm text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="p-3 text-left">Member Name</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">State</th>
                        <th className="p-3 text-left">Team Name</th>
                        <th className="p-3 text-left">Joining Date</th>
                        <th className="p-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody className="bg-white text-sm text-gray-800">
                    {members.map((team, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="p-3">{team.teamName}</td>
                            <td className="p-3">{team.country}</td>
                            <td className="p-3">{team.state || "-"}</td>
                            <td className="p-3">{team.city || "-"}</td>
                            <td className="p-3">{team.joiningDate}</td>
                            <td className="p-3 flex gap-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                    VIEW
                                </button>
                                <button className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600">
                                    Edit Role
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Members;
