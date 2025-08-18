import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const StateList = () => {
    const [stateList, setStateList] = useState([]);
    const [newState, setNewState] = useState({ state: "", status: "Active" });
    const [editingState, setEditingState] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const states = ["Gujarat", "Maharashtra", "California"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingState) {
            setEditingState({ ...editingState, [name]: value });
        } else {
            setNewState({ ...newState, [name]: value });
        }
    };

    const addState = () => {
        if (newState.state) {
            setStateList([...stateList, { ...newState, status: "Active" }]);
            setNewState({ state: "", status: "Active" });
            setShowModal(false);
        }
    };

    const handleEdit = (index) => {
        setEditingState({ ...stateList[index], index });
        setShowEditModal(true);
    };

    const saveState = () => {
        const updated = [...stateList];
        updated[editingState.index] = { ...editingState };
        setStateList(updated);
        setShowEditModal(false);
        setEditingState(null);
    };

    const updateStatus = (index, status) => {
        const updated = [...stateList];
        updated[index].status = status;
        setStateList(updated);
    };

    const deleteState = (index) => {
        setStateList(stateList.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const stored = localStorage.getItem("states");
        if (stored) {
            try {
                setStateList(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing states", err);
                setStateList([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("states", JSON.stringify(stateList));
    }, [stateList]);

    return (
       <div className=" mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl text-primary-150 font-semibold">State List</h1>
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
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add State</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>
                        <select
                            name="state"
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-4"
                            onChange={handleChange}
                            value={newState.state}
                        >
                            <option value="">Select State</option>
                            {states.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-primary-200 text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={addState}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editingState && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Edit State</h2>
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowEditModal(false)}
                        >
                            ×
                        </button>
                        <select
                            name="state"
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-4"
                            onChange={handleChange}
                            value={editingState.state}
                        >
                            <option value="">Select State</option>
                            {states.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            className="bg-primary-200 text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={saveState}
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
                        <th className="p-3 text-left">State Name</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white text-sm text-gray-800">
                    {stateList.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition duration-200">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{item.state}</td>
                            <td className="p-3">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${item.status === "Active"
                                        ? "bg-primary-350 text-primary-400"
                                        : "bg-primary-450 text-primary-500"
                                        }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="p-3 flex gap-2 flex-wrap">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => handleEdit(index)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    onClick={() => deleteState(index)}
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

export default StateList;
