import { useState } from "react";

const AddCityModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    code: "",
    state: "",
    country: "",
  });

  const handleSubmit = () => {
    if (!form.name || !form.code) return alert("Fill all fields");
    onAdd(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-3">Add City</h2>

        <input
          placeholder="City Name"
          className="border p-2 w-full mb-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="City Code"
          className="border p-2 w-full mb-2"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          placeholder="State"
          className="border p-2 w-full mb-2"
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
        />
        <input
          placeholder="Country"
          className="border p-2 w-full mb-2"
          value={form.country}
          onChange={(e) => setForm({ ...form, country: e.target.value })}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCityModal;
