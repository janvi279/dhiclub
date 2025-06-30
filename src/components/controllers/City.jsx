import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const CityList = () => {
    const [citiList, setCityList] = useState([]);
    const [newCity, setNewCity] = useState({ city: "", status: "Active" });
    const [editingCity, setEditingCity] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const cities = ["Rajkot", "Mumbai", "Los Angeles"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        const stateUpdater = editingCity ? setEditingCity : setNewCity;
        const currentState = editingCity || newCity;
        stateUpdater({ ...currentState, [name]: value });
    };

    const addCity = () => {
        if (newCity.city) {
            const updated = [...citiList, { ...newCity, status: "Active" }];
            setCityList(updated);
            setNewCity({ city: "", status: "Active" });
            setShowModal(false);
        }
    };

    const editCity = (index) => {
        setEditingCity({ ...citiList[index], index });
        setShowEditModal(true);
    };

    const saveCity = () => {
        if (editingCity) {
            const updated = citiList.map((c, i) =>
                i === editingCity.index ? { city: editingCity.city, status: editingCity.status } : c
            );
            setCityList(updated);
            setEditingCity(null);
            setShowEditModal(false);
        }
    };

    const deleteCity = (index) => {
        setCityList(citiList.filter((_, i) => i !== index));
    };

    const updateStatus = (index, status) => {
        const updated = [...citiList];
        updated[index].status = status;
        setCityList(updated);
    };



    useEffect(() => {
        const stored = localStorage.getItem("cities");
        if (stored) {
            try {
                setCityList(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing cities", err);
                setCityList([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cities", JSON.stringify(citiList));
    }, [citiList]);

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">City List</h1>
                <div className="flex justify-end gap-3">
                    <button
                        className="mt-5 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2"
                        onClick={() => setShowModal(true)}
                    >
                        <FaPlus /> Add
                    </button>

                </div>
            </div>



            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add City</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowModal(false)}
                        >×</button>
                        <select
                            name="city"
                            className="text-gray-500 focus:outline-none border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            onChange={handleChange}
                            value={newCity.city}
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-[#6246EA] text-white px-4 py-1 rounded w-50 hover:bg-[#6246EA] block mx-auto"
                            onClick={addCity}
                        >Submit</button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editingCity && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Edit City</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowEditModal(false)}
                        >
                            ×
                        </button>
                        <select
                            name="city"
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-4"
                            onChange={handleChange}
                            value={editingCity.city}
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-[#6246EA] text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={saveCity}
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
                        <th className="p-3 text-left">No</th>
                        <th className="p-3 text-left">City Name</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white text-sm text-gray-800">
                    {citiList.map((city, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition duration-200">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{city.city}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${city.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {city.status}
                                </span>
                            </td>
                            <td className="p-3 flex gap-2 flex-wrap">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => editCity(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => deleteCity(index)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600"
                                    onClick={() => updateStatus(index, "Active")}
                                >
                                    Active
                                </button>
                                <button
                                    className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700"
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

export default CityList;
