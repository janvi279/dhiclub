import { useState, useEffect } from "react";
import { FaPlus, FaSearch, FaSortAmountDownAlt, FaFilter } from "react-icons/fa";
import DataTable from "react-data-table-component";

const City = () => {
    const [cityList, setCityList] = useState([]);
    const [newCity, setNewCity] = useState({
        city: "",
        cityCode: "",
        country: "",
        state: "",
        status: "Active",
        createdAt: new Date().toISOString(),
    });
    const [editingCity, setEditingCity] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // Filters and sorting
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [countryFilter, setCountryFilter] = useState("all");
    const [stateFilter, setStateFilter] = useState("all");
    const [sortOrder, setSortOrder] = useState("newest");

    // Dropdown options
    const [sortCountry] = useState(["India", "USA", "Canada"].sort());
    const [sortState] = useState(["California", "Gujarat", "Maharashtra", "Texas"].sort());

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (editingCity) {
            setEditingCity({ ...editingCity, [name]: value });
        } else {
            setNewCity({ ...newCity, [name]: value });
        }
    };

    const addCity = () => {
        if (newCity.city && newCity.cityCode && newCity.country && newCity.state) {
            setCityList([...cityList, { ...newCity, createdAt: new Date().toISOString() }]);
            setNewCity({ city: "", cityCode: "", country: "", state: "", status: "Active" });
            setShowModal(false);
        }
    };

    const saveCity = () => {
        const updated = [...cityList];
        updated[editingCity.index] = { ...editingCity };
        setCityList(updated);
        setShowEditModal(false);
        setEditingCity(null);
    };

    const deleteCity = (index) => {
        setCityList(cityList.filter((_, i) => i !== index));
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
        localStorage.setItem("cities", JSON.stringify(cityList));
    }, [cityList]);

    const filteredList = cityList
        .filter(
            (item) =>
                item.city.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (statusFilter === "all" || item.status === statusFilter) &&
                (countryFilter === "all" || item.country === countryFilter) &&
                (stateFilter === "all" || item.state === stateFilter)
        )
        .sort((a, b) =>
            sortOrder === "newest"
                ? new Date(b.createdAt) - new Date(a.createdAt)
                : new Date(a.createdAt) - new Date(b.createdAt)
        );

    const columns = [
        { name: "No.", selector: (_, index) => index + 1, width: "60px" },
        { name: "City Name", selector: (row) => row.city },
        { name: "City Code", selector: (row) => row.cityCode },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${row.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                >
                    {row.status}
                </span>
            ),
        },
        {
            name: "Actions",
            cell: (row, index) => (
                <div className="flex gap-2">
                    <button onClick={() => setEditingCity({ ...row, index }) & setShowEditModal(true)} className="bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                    </button>
                    <button onClick={() => deleteCity(index)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const customStyles = {
        headCells: { style: { fontSize: "1rem", fontWeight: 600 } },
        cells: { style: { fontSize: "1rem" } },
        pagination: { style: { fontSize: "1rem" } },
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
            <div className="flex  gap-5 items-center justify-between pb-4 border-b border-gray-200 mb-4">
                <h1 className="text-xl font-semibold">City List</h1>

                <div className="relative w-64">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search City..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <FaSortAmountDownAlt className="text-gray-600" />
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-600" />
                        <select value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none">
                            <option value="all">All Countries</option>
                            {sortCountry.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-600" />
                        <select value={stateFilter} onChange={(e) => setStateFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none">
                            <option value="all">All States</option>
                            {sortState.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-600" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none">
                            <option value="all">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Deactive">Deactive</option>
                        </select>
                    </div>

                    <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
                        <FaPlus /> Add
                    </button>
                </div>
            </div>

            <DataTable columns={columns} data={filteredList} pagination highlightOnHover striped customStyles={customStyles} />

            {/* Add Modal */}
            {showModal && (
                <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-4 text-center">Add City</h2>
                        <button className="absolute top-3 right-3 text-xl font-bold" onClick={() => setShowModal(false)}>
                            ×
                        </button>

                        <select name="country" value={newCity.country} onChange={handleChange} className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5">
                            <option value="">Select Country</option>
                            {sortCountry.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select name="state" value={newCity.state} onChange={handleChange} className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5">
                            <option value="">Select State</option>
                            {sortState.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="city"
                            placeholder="City Name"
                            value={newCity.city}
                            onChange={handleChange}
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
                        />
                        <input
                            type="text"
                            name="cityCode"
                            placeholder="City Code"
                            value={newCity.cityCode}
                            onChange={handleChange}
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
                        />

                        <button onClick={addCity} className="w-full bg-indigo-600 text-white py-2 rounded">
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {showEditModal && editingCity && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-5 rounded w-full max-w-md relative">
                        <h2 className="text-xl font-semibold mb-4 text-center">Edit City</h2>
                        <button className="absolute top-3 right-3 text-xl font-bold" onClick={() => setShowEditModal(false)}>
                            ×
                        </button>

                        <select name="country" value={editingCity.country} onChange={handleChange} className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5">
                            <option value="">Select Country</option>
                            {sortCountry.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>

                        <select name="state" value={editingCity.state} onChange={handleChange} className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5">
                            <option value="">Select State</option>
                            {sortState.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="city"
                            value={editingCity.city}
                            onChange={handleChange}
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
                            placeholder="City Name"
                        />
                        <input
                            type="text"
                            name="cityCode"
                            value={editingCity.cityCode}
                            onChange={handleChange}
                            className="text-gray-700 focus:outline-none border border-gray-300 rounded px-3 py-2 w-full mb-5"
                            placeholder="City Code"
                        />

                        <button onClick={saveCity} className="w-full bg-indigo-600 text-white py-2 rounded">
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default City;
