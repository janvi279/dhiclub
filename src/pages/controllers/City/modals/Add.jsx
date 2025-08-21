import { useState } from "react";

const AddCityModal = ({ onClose, onSave }) => {
    const [form, setForm] = useState({ cityName: "", cityCode: "", state: "", country: "" });

    const countries = ["INDIA", "USA", "UK"];
    const states = ["Gujarat", "Maharashtra", "Delhi"];
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <div className="text-primary-150 fixed inset-0  bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-2xl shadow-lg w-full max-w-md relative">
                <h2 className="text-xl font-semibold mb-3 text-center text-primary-150">
                    Add City
                </h2>
                <button
                    className="absolute top-3 right-3 text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <select
                    name="country"

                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                >
                    <option value="">Select Country</option>
                    {countries.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>

                <select
                    name="state"

                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                >
                    <option value="">Select State</option>
                    {states.map((cur) => (
                        <option key={cur} value={cur}>
                            {cur}
                        </option>
                    ))}
                </select>
                <input
                    name="cityName"
                    placeholder="Enter City Name"
                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                />
                <input
                    name="cityCode"
                    placeholder="City Code"
                    onChange={handleChange}
                    className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                />

                <button onClick={handleSubmit} className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full">Save</button>

            </div>
        </div>
    );
};

export default AddCityModal;
