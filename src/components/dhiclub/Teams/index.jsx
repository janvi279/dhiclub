import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        pincode: '',
        teamName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        const newTeam = {
            id: teams.length + 1,
            teamName: formData.teamName,
            captainName: 'Auto Captain ' + (teams.length + 1),
            launchDate: new Date().toISOString().split('T')[0],
            members: Math.floor(Math.random() * 10) + 1,
            status: 'Active',
            country: formData.country,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
        };

        setTeams(prev => [...prev, newTeam]);
        resetForm();
    };

    const handleEdit = (index) => {
        const team = teams[index];
        setFormData({
            country: team.country,
            state: team.state,
            city: team.city,
            pincode: team.pincode,
            teamName: team.teamName,
        });
        setEditIndex(index);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleUpdate = () => {
        const updatedTeam = {
            ...teams[editIndex],
            teamName: formData.teamName,
            country: formData.country,
            state: formData.state,
            city: formData.city,
            pincode: formData.pincode,
        };

        const newTeamList = [...teams];
        newTeamList[editIndex] = updatedTeam;
        setTeams(newTeamList);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            country: '',
            state: '',
            city: '',
            pincode: '',
            teamName: '',
        });
        setModalOpen(false);
        setIsEditing(false);
        setEditIndex(null);
    };

    const columns = [
        { name: 'NO', selector: (row, index) => index + 1, width: '60px' },
        { name: 'Team Name', selector: row => row.teamName },
        { name: 'Captain Name', selector: row => row.captainName },
        { name: 'Team Launching Date', selector: row => row.launchDate },
        { name: 'No. of Members', selector: row => row.members },
        {
            name: 'Status',
            cell: row => (
                <span className={`px-2 py-1 rounded text-sm font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {row.status}
                </span>
            ),
        },
        {
            name: 'Action',
            cell: (row, index) => (
                <div className="flex space-x-2">
                    <button className="text-blue-600" onClick={() => handleEdit(index)}><FaEdit /></button>
                    <button className="text-red-600" onClick={() => handleDelete(index)}><FaTrash /></button>
                </div>
            ),
        },
    ];

    const handleDelete = (index) => {
        const newList = [...teams];
        newList.splice(index, 1);
        setTeams(newList);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Team List</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setModalOpen(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <FaPlus /> Add Team
                </button>
            </div>

            <DataTable
                columns={columns}
                data={teams}
                pagination
                highlightOnHover
                striped
            />

            {/* Add/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-xl">
                        <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Team' : 'Add New Team'}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm">Pincode</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm">Team Name</label>
                                <input
                                    type="text"
                                    name="teamName"
                                    value={formData.teamName}
                                    onChange={handleInputChange}
                                    className="w-full border p-2 rounded"
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={resetForm}
                                className="px-4 py-2 rounded bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={isEditing ? handleUpdate : handleAdd}
                                className="px-4 py-2 rounded bg-blue-600 text-white"
                            >
                                {isEditing ? 'Update' : 'Submit'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Teams;
