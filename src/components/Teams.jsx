import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ArrowDownUp, Funnel } from 'lucide-react';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [newTeam, setNewTeam] = useState({ teamName: "", country: "", state: "", city: "" });

    const countries = ["India", "USA", "Canada"];
    const states = ["Gujarat", "Maharashtra", "California"];
    const cities = ["Rajkot", "Mumbai", "Los Angeles"];

    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTeam({ ...newTeam, [name]: value });
    };

    const addTeam = () => {
        if (newTeam.teamName && newTeam.country && newTeam.state && newTeam.city) {
            setTeams([...teams, { ...newTeam, joiningDate: new Date().toLocaleDateString() }]);
            setNewTeam({ teamName: "", country: "", state: "", city: "" });
            setShowModal(false);
        }
    };

    useEffect(() => {
        const stored = localStorage.getItem("teams");
        if (stored) {
            try {
                setTeams(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing teams", err);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("teams", JSON.stringify(teams));
    }, [teams]);

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            <div className="flex justify-between bg-gray-200 p-5 text-black font-semibold text-2xl border-4 border-gray-200 rounded-t-3xl">
                <h1>All Teams</h1>
                <div className="flex gap-10">
                    <div className="flex items-center gap-2">
                        <ArrowDownUp /> <span>Sort</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Funnel /> <span>Filter</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    className="mt-5 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex flex-col items-center justify-center text-sm w-28"
                    onClick={() => setShowModal(true)}
                >
                    <div className="flex">
                        <FaPlus className="mb-1" />
                        <span className="leading-tight">Create Team</span>
                    </div>
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Create Team</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowModal(false)}
                        >×</button>

                        <input
                            type="text"
                            name="teamName"
                            value={newTeam.teamName}
                            onChange={handleChange}
                            className="text-gray-700 border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            placeholder="Enter Team Name"
                        />

                        <select
                            name="country"
                            className="text-gray-700 border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            onChange={handleChange}
                            value={newTeam.country}
                        >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            name="state"
                            className="text-gray-700 border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            onChange={handleChange}
                            value={newTeam.state}
                        >
                            <option value="">Select State</option>
                            {states.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        <select
                            name="city"
                            className="text-gray-700 border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            onChange={handleChange}
                            value={newTeam.city}
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="bg-[#6246EA] text-white px-4 py-2 rounded w-full hover:bg-purple-700"
                            onClick={addTeam}
                        >Submit</button>
                    </div>
                </div>
            )}

            <table className="w-full border-collapse mt-5">
                <thead className="bg-gray-200">
                    <tr className="font-semibold">
                        <th className="p-3 text-left">Team Name</th>
                        <th className="p-3 text-left">Country</th>
                        <th className="p-3 text-left">State</th>
                        <th className="p-3 text-left">City</th>
                        <th className="p-3 text-left">Joining Date</th>
                        <th className="p-3 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="p-3">{team.teamName}</td>
                            <td className="p-3">{team.country}</td>
                            <td className="p-3">{team.state}</td>
                            <td className="p-3">{team.city}</td>
                            <td className="p-3">{team.joiningDate}</td>
                            <td className="p-3">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">VIEW</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Teams;