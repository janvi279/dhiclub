import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const StateList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ state: "", status: "Active" });
    const states = ["Gujarat", "Maharashtra", "California"];

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingEmployee) {
            setEditingEmployee({ ...editingEmployee, [name]: value });
        } else {
            setNewEmployee({ ...newEmployee, [name]: value });
        }
    };

    const addEmployee = () => {
        if (newEmployee.state) {
            setEmployees([...employees, { ...newEmployee, status: "Active" }]);
            setNewEmployee({ state: "", status: "Active" });
            setShowModal(false);
        }
    };

    const handleEdit = (index) => {
        setEditingEmployee({ ...employees[index], index });
        setShowEditModal(true);
    };

    const saveEmployee = () => {
        const updatedEmployees = [...employees];
        updatedEmployees[editingEmployee.index] = { ...editingEmployee };
        setEmployees(updatedEmployees);
        setShowEditModal(false);
        setEditingEmployee(null);
    };

    const updateStatus = (index, status) => {
        const updated = [...employees];
        updated[index].status = status;
        setEmployees(updated);
    };

    const deleteEmployee = (index) => {
        setEmployees(employees.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const stored = localStorage.getItem("employees");
        if (stored) {
            try {
                setEmployees(JSON.parse(stored));
            } catch (err) {
                console.error("Error parsing employees", err);
                setEmployees([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("employees", JSON.stringify(employees));
    }, [employees]);

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            <div className="bg-gray-200 p-5 text-black font-semibold text-2xl border-4 border-gray-200 rounded-t-3xl">
                <h1>State List</h1>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    className="mt-5 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add
                </button>
            </div>

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
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
                            value={newEmployee.state}
                        >
                            <option value="">Select State</option>
                            {states.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-[#6246EA] text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={addEmployee}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            {showEditModal && editingEmployee && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
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
                            value={editingEmployee.state}
                        >
                            <option value="">Select Country</option>
                            {states.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-[#6246EA] text-white px-4 py-1 rounded w-50 hover:bg-purple-700 block mx-auto"
                            onClick={saveEmployee}
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
                    {employees.map((employee, index) => (
                        <tr key={index} className="border-t border-gray-200 hover:bg-gray-50 transition duration-200">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{employee.state}</td>
                            <td className="p-3">
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${employee.status === "Active"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                        }`}
                                >
                                    {employee.status}
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
                                    onClick={() => deleteEmployee(index)}
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
