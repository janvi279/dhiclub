import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const CityList = () => {
    const [employees, setEmployees] = useState([]);
    const [newEmployee, setNewEmployee] = useState({ city: "" });
   
         const cities = ["Rajkot", "Mumbai", "Los Angeles"];

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        const stateUpdater = editingEmployee ? setEditingEmployee : setNewEmployee;
        const currentState = editingEmployee || newEmployee;

        if (type === "checkbox") {
            const updatedInterests = new Set(currentState.interests || []);
            checked ? updatedInterests.add(value) : updatedInterests.delete(value);
            stateUpdater({ ...currentState, interests: Array.from(updatedInterests) });
        } else if (type === "file") {
            stateUpdater({ ...currentState, [name]: files[0] });
        } else {
            stateUpdater({ ...currentState, [name]: value });
        }
    };

    const addEmployee = () => {
        if (newEmployee.city) {
            setEmployees([...employees, newEmployee]);
            setNewEmployee({
                city: "",
                name: "",
                email: "",
                address: "",
                phone: "",
                password: "",
                age: "",
                gender: "",
                interests: [],
                dob: "",
                file: null,
                message: ""
            });
            setShowModal(false);
        }
    };

    const handleEdit = (index) => {
        setEditingEmployee({ ...employees[index], index });
        setShowEditModal(true);
    };

    const saveEmployee = () => {
        if (editingEmployee) {
            const updatedEmployees = employees.map((emp, i) =>
                i === editingEmployee.index ? editingEmployee : emp
            );
            setEmployees(updatedEmployees);
            setEditingEmployee(null);
            setShowEditModal(false);
        }
    };

    const deleteEmployee = (index) => {
        setEmployees(employees.filter((_, i) => i !== index));
    };

    const deleteAllUsers = () => {
        if (!employees.length) return alert("No users to delete.");
        if (window.confirm("Are you sure you want to delete all users?")) {
            setEmployees([]);
            localStorage.removeItem("employees");
        }
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
                <h1>City List</h1>
            </div>

            <div className="flex justify-end gap-3">
                <button
                    className="mt-5 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2"
                    onClick={() => setShowModal(true)}
                >
                    <FaPlus /> Add
                </button>
            </div>

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
                            className="text-gray-500 focus-within:text-black border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            onChange={handleChange}
                            value={newEmployee.city}
                        >
                            <option value="">Select City</option>
                            {cities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded w-50 hover:bg-blue-600 block mx-auto"
                            onClick={addEmployee}
                        >Submit</button>
                    </div>
                </div>
            )}

            <table className="w-full border-collapse mt-5">
                <thead className="bg-gray-200">
                    <tr className="font-semibold">
                        <th className="p-3 text-left">No</th>
                        <th className="p-3 text-left">City Name</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{employee.city}</td>
                            <td className="p-3">{employee.status || "Active"}</td>
                            <td className="p-3 flex gap-2">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => deleteEmployee(index)}>Delete</button>
                                <button className="bg-emerald-500 text-white px-3 py-1 rounded hover:bg-emerald-600">Active</button>
                                <button className="bg-amber-600 text-white px-3 py-1 rounded hover:bg-amber-700">Deactive</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CityList;