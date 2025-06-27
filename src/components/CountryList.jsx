import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

const CountryList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ country: "", status: "Active" });
  const countries = ["India", "USA", "Canada"];
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
    if (newEmployee.country) {
      setEmployees([...employees, { ...newEmployee, status: "Active" }]);
      setNewEmployee({ country: "", status: "Active" });
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
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
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
              value={newEmployee.country}
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
              onClick={addEmployee}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingEmployee && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
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
              value={editingEmployee.country}
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
            <th className="px-4 py-3 text-left">No.</th>
            <th className="px-4 py-3 text-left">Country Name</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-sm text-gray-800">
          {employees.map((employee, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50 transition duration-200"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{employee.country}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${employee.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {employee.status}
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
                  className="px-3 py-1 text-xs rounded-lg bg-red-500 hover:bg-red-600 text-white"
                  onClick={() => deleteEmployee(index)}
                >
                  Delete
                </button>
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white"
                  onClick={() => updateStatus(index, "Active")}
                >
                  Active
                </button>
                <button
                  className="px-3 py-1 text-xs rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
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

export default CountryList;
