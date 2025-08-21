import { useState } from "react";

const EditCityModal = ({ city, onClose, onSave }) => {
    const [form, setForm] = useState(city);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onSave(form);
        onClose();
    };

    return (
        <div className="fixed inset-0  flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative">
                {/* Header */}
                <h2 className="text-xl font-semibold mb-5 text-center text-primary-150">
                    Edit City
                </h2>
                <button
                    className="absolute top-3 right-3 text-xl"
                    onClick={onClose}
                >
                    ×
                </button>
                <div className="space-y-4">
                    {/* City Name */}
                    <input
                        name="cityName"
                        placeholder="City Name"
                        value={form.cityName || ""}
                        onChange={handleChange}
                        className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                    />

                    {/* City Code */}
                    <input
                        name="cityCode"
                        placeholder="City Code"
                        value={form.cityCode || ""}
                        onChange={handleChange}
                        className="focus:outline-none border border-gray-300 rounded-lg px-3 py-2 w-full mb-5"
                    />


                    <button
                        onClick={handleSubmit}
                        className="w-50 mx-auto block bg-primary-200 text-white py-2 rounded-full"
                    >
                        Save Changes
                    </button>
                </div>

                {/* Footer Buttons */}




            </div>
        </div>
    );
};

export default EditCityModal;
