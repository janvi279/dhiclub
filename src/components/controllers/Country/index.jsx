import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const Country = () => {
    const [countryList, setCountryList] = useState([]);
    const [newCountry, setNewCountry] = useState({ country: "", status: "Active" });
    const [editingCountry, setEditingCountry] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const countries = ["India", "USA", "Canada"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingCountry) {
            setEditingCountry({ ...editingCountry, [name]: value });
        } else {
            setNewCountry({ ...newCountry, [name]: value });
        }
    };

    const addCountry = () => {
        if (newCountry.country) {
            setCountryList([...countryList, { ...newCountry, status: "Active" }]);
            setNewCountry({ country: "", status: "Active" });
            setShowModal(false);
        }
    };

    const handleEdit = (index) => {
        setEditingCountry({ ...countryList[index], index });
        setShowEditModal(true);
    };

    const saveCountry = () => {
        const updated = [...countryList];
        updated[editingCountry.index] = { ...editingCountry };
        setCountryList(updated);
        setShowEditModal(false);
        setEditingCountry(null);
    };

    const updateStatus = (index, status) => {
        const updated = [...countryList];
        updated[index].status = status;
        setCountryList(updated);
    };

    const deleteCountry = (index) => {
        setCountryList(countryList.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const stored = localStorage.getItem("countries");
        if (stored) {
            try {
                setCountryList(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing countries", err);
                setCountryList([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("countries", JSON.stringify(countryList));
    }, [countryList]);

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">Country List</h1>
                <button
                    className="mt-5 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add
                </button>
            </div>

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add Country</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <select
                            name="country"
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-4"
                            onChange={handleChange}
                            value={newCountry.country}
                        >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-[#6246EA] text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={addCountry}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editingCountry && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Edit Country</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowEditModal(false)}
                        >
                            ×
                        </button>
                        <select
                            name="country"
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-4"
                            onChange={handleChange}
                            value={editingCountry.country}
                        >
                            <option value="">Select Country</option>
                            {countries.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-[#6246EA] text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={saveCountry}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}

            {/* Table */}
            <table className="w-full mt-5 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <thead className="bg-[#F3F4F6] text-sm text-gray-700 uppercase tracking-wider">
                    <tr>
                        <th className="px-4 py-3 text-left">No.</th>
                        <th className="px-4 py-3 text-left">Country Name</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white text-sm text-gray-800">
                    {countryList.map((item, index) => (
                        <tr
                            key={index}
                            className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
                        >
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{item.country}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${item.status === "Active"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-4 py-2 space-x-2">
                                <button
                                    className="px-3 py-1 text-xs rounded-lg bg-blue-500 hover:bg-blue-600 text-white"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                                    onClick={() => deleteCountry(index)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
                                    onClick={() => updateStatus(index, "Active")}
                                >
                                    Active
                                </button>
                                <button
                                    className="px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
                                    onClick={() => updateStatus(index, "Deactive")}
                                >
                                    Deactive
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Country;
