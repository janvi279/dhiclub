import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ArrowDownUp, Funnel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemberList } from "../context/MemberListContext"; // ✅ use your context

const Registration = () => {
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
        <div className=" mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">All Members</h1>
                <div className="flex justify-end gap-3">

                    <button
                        className="mt-5 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm w-28"
                        onClick={() => navigate("/addMember")}
                    >
                        Add New <br /> Member
                    </button>
                </div>
            </div>


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

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Registration;
