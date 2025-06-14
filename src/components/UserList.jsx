import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";

const userList = () => {
    const [employees, setEmployees] = useState([]);

    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        age: "",
        gender: "",
        interests: [],
        country: "",
        dob: "",
        file: null,
        message: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShoEditModel] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);


    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (editingEmployee) {
            if (type === "checkbox") {
                const updatedInterests = new Set(editingEmployee.interests || []);
                checked ? updatedInterests.add(value) : updatedInterests.delete(value);
                setEditingEmployee({ ...editingEmployee, interests: Array.from(updatedInterests) });
            } else if (type === "file") {
                setEditingEmployee({ ...editingEmployee, [name]: files[0] });
            } else {
                setEditingEmployee({ ...editingEmployee, [name]: value });
            }
        } else {
            if (type === "checkbox") {
                const updatedInterests = new Set(newEmployee.interests || []);
                checked ? updatedInterests.add(value) : updatedInterests.delete(value);
                setNewEmployee({ ...newEmployee, interests: Array.from(updatedInterests) });
            } else if (type === "file") {
                setNewEmployee({ ...newEmployee, [name]: files[0] });
            } else {
                setNewEmployee({ ...newEmployee, [name]: value });
            }
        }
    };
    // Add employee
    const addEmployee = () => {
        if (newEmployee.name && newEmployee.email) {
            setEmployees([...employees, newEmployee]);
            setNewEmployee({
                name: "",
                email: "",
                address: "",
                phone: "",
                password: "",
                age: "",
                gender: "",
                interests: [],
                country: "",
                dob: "",
                file: null,
                message: ""
            });


            setShowModal(false);
        }
    };
    const handleEdit = (index) => {
        setEditingEmployee({ ...employees[index], index });
        setShoEditModel(true)
    }
    const saveEmployee = () => {
        if (editingEmployee) {
            const updatedEmployees = employees.map((emp, i) =>
                i === editingEmployee.index ? editingEmployee : emp
            );
            setEmployees(updatedEmployees);
            setEditingEmployee(null);
            setShoEditModel(false);
        }
    };

    // Delete employee
    const deleteEmployee = (index) => {
        setEmployees(employees.filter((_, i) => i !== index));
    };

    const deleteAllUsers = () => {
        if (employees.length === 0) {
            return alert("No users to delete.");
        } else {
            const confirmDelete = window.confirm("Are you sure you want to delete all users?");
            if (confirmDelete) {
                setEmployees([]); // <- clear employees
                localStorage.removeItem("employees"); // optional: clear localStorage too
            }
        }
    };

    useEffect(() => {
        const storedEmployees = localStorage.getItem("employees");
        if (storedEmployees) {
            try {
                setEmployees(JSON.parse(storedEmployees));
            } catch (error) {
                console.error("Error parsing employees from localStorage", error);
                setEmployees([]);
            }
        }
    }, []);


    useEffect(() => {
        if (employees.length > 0) {
            localStorage.setItem("employees", JSON.stringify(employees));
        }
    }, [employees]);

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden p-5">

            <div className="bg-[#435d7d] p-5 text-white text-bold font-bold border-[3px] text-2xl rounded-t-3xl border">
                <h1>User List</h1>
            </div>

            <div className="flex justify-end gap-3">
                <button className="mt-5 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 flex items-center gap-2" onClick={() => {

                    deleteAllUsers();
                }}>
                    <FaMinus /> Delete
                </button>

                <button className="mt-5 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 flex items-center gap-2" onClick={() => setShowModal(true)}><FaPlus /> Add User</button>
            </div>


            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Add User</h2>

                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShowModal(false)}
                        >
                            ×
                        </button>

                        <input
                            className="border border-gray-300 rounded px-3 py-1 w-full mb-3 focus:outline-none"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={newEmployee.name}
                            onChange={handleChange}
                        />

                        <input
                            className="border focus:outline-none border-gray-300 rounded px-3 py-1 w-full mb-3"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newEmployee.email}
                            onChange={handleChange}
                        />

                        <input
                            className="border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={newEmployee.password}
                            onChange={handleChange}
                        />
                        <input type="number" name="age" placeholder="Age" className="border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange} required />
                        {/* Radio Buttons */}
                        <div className="w-full mb-3 focus-within:accent-blue-600">
                            <p className="font-normal  focus-within:text-black text-gray-500">Gender:</p>
                            <label className="mr-3 text-gray-500  focus-within:text-black">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleChange}
                                    className=""
                                />{" "}
                                Male
                            </label>
                            <label className="text-gray-500  focus-within:text-black">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleChange}
                                    className="focus:text-black"
                                />{" "}
                                Female
                            </label>
                        </div>


                        {/* Checkboxes */}
                        <div className="text-gray-500 mb-3 focus-within:text-black focus-within:accent-blue-600 ">
                            <p className="font-semibold">Interests:</p>
                            <label className="mr-3"><input type="checkbox" name="interests" value="Coding" onChange={handleChange} /> Coding</label>
                            <label className="mr-3"><input type="checkbox" name="interests" value="Design" onChange={handleChange} /> Design</label>
                            <label><input type="checkbox" name="interests" value="Gaming" onChange={handleChange} /> Gaming</label>
                        </div>

                        {/* Dropdown */}
                        <select name="country" className="text-gray-500 focus-within:text-black border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange}>
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>

                        {/* Date */}
                        <input type="date" name="dob" className="focus:outline-none     text-gray-500  focus-within:text-black border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange} required />

                        {/* File Upload */}
                        <input type="file" name="file" className="text-gray-500  focus-within:text-black  border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange} />

                        {/* Textarea */}
                        <textarea name="message" placeholder="Your Message" className="focus:outline-none border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange}></textarea>

                        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded w-50 hover:bg-blue-600 block mx-auto" onClick={addEmployee}>Submit</button>
                    </div>
                </div>
            )}
            {showEditModal && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-4 relative">
                        <h2 className="text-2xl font-semibold mb-4 text-center">Edit User</h2>

                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl font-bold"
                            onClick={() => setShoEditModel(false)}
                        >
                            ×
                        </button>

                        <input
                            className="border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={editingEmployee?.name || ""}
                            onChange={handleChange}
                        />

                        <input
                            className="border border-gray-300 rounded px-3 py-1 w-full mb-3"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={editingEmployee?.email || ""}
                            onChange={handleChange}
                        />


                        <input type="number" name="age" value={editingEmployee?.age || ""} placeholder="Age" className="border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange} required />
                        {/* Radio Buttons */}
                        <div className="w-full mb-3">
                            <p className="font-normal text-gray-500">Gender:</p>
                            <label className="mr-3 text-gray-500 focus:text-black">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={editingEmployee?.gender === "Male"}
                                    onChange={handleChange}
                                    className="focus:text-black"
                                />{" "}
                                Male
                            </label>
                            <label className="text-gray-500">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={editingEmployee?.gender === "Female"}
                                    onChange={handleChange}
                                    className="focus:text-black"
                                />{" "}
                                Female
                            </label>
                        </div>


                        {/* Checkboxes */}
                        <div className="text-gray-500 mb-3">
                            <p className="font-semibold">Interests:</p>
                            <label className="mr-3"><input type="checkbox" name="interests" value="Coding"
                                checked={editingEmployee?.interests?.includes("Coding")} onChange={handleChange} /> Coding</label>
                            <label className="mr-3"><input type="checkbox" name="interests" value="Design"
                                checked={editingEmployee?.interests?.includes("Design")} onChange={handleChange} /> Design</label>
                            <label><input type="checkbox" name="interests" value="Gaming"
                                checked={editingEmployee?.interests?.includes("Gaming")} onChange={handleChange} /> Gaming</label>
                        </div>

                        {/* Dropdown */}
                        <select name="country" value={editingEmployee?.country || ""} className="text-gray-500 border border-gray-300 rounded px-3 py-1 w-full mb-3" onChange={handleChange}>
                            <option value="">Select Country</option>
                            <option value="India">India</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>

                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-1 rounded w-50 hover:bg-blue-600 block mx-auto"
                            onClick={saveEmployee}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>

            )}

            {/* Employee Table */}
            <table className="w-full border-collapse mt-5">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Age</th>
                        <th className="p-3 text-left">Gender</th>
                        <th className="p-3 text-left">Interests</th>
                        <th className="p-3 text-left">country</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index} className="border-b hover:bg-gray-100">
                            <td className="p-3">{employee.name}</td>
                            <td className="p-3">{employee.email}</td>
                            <td className="p-3">{employee.age}</td>
                            <td className="p-3">{employee.gender}</td>
                            <td className="p-3">
                                {(employee.interests || []).join(", ")}
                            </td>
                            <td className="p-3">   {employee.country}</td>
                            <td className="p-3 flex gap-2">
                                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => deleteEmployee(index)}> <FaTrash /></button>
                                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => handleEdit(index)}><FaEdit /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default userList;
