import { useState, useEffect } from "react";

export const useCity = () => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("city")) || [];
    setCity(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("city", JSON.stringify(data));
  };

  // 🔹 Fix: avoid same name for param & state
  const addCity = (newCity) => {
    const newData = [...city, { id: Date.now(), ...newCity }];
    setCity(newData);
    saveToStorage(newData);
  };

  const updateCity = (id, updatedData) => {
    const newData = city.map((c) =>
      c.id === id ? { ...c, ...updatedData } : c
    );
    setCity(newData);
    saveToStorage(newData);
  };

  const deleteCity = (id) => {
    const newData = city.filter((c) => c.id !== id);
    setCity(newData);
    saveToStorage(newData);
  };

  return { city, addCity, updateCity, deleteCity };
};

// import { useState, useEffect } from "react";
// // import axiosCommonInstance from "../../../utils/axios/axiosCommonInstance";
// // import { setToken } from "../../../utils/cookies/cookies";

// export const useCity = () => {
//   const [city, setCity] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch City from API
//   const fetchCity = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosCommonInstance.get("/api/city");
//       setCity(res.data);
//     } catch (err) {
//       console.error("Error fetching city:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add new city
//   const addCity = async (city) => {
//     try {
//       const res = await axiosCommonInstance.post("/api/city", city);
//       setCity((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Error adding city:", err);
//     }
//   };

//   // ✅ Update city
//   const updateCity = async (updated) => {
//     try {
//       const res = await await axiosCommonInstance.put(`/api/city/${updated.id}`, updated);
//       setCity((prev) =>
//         prev.map((c) => (c.id === updated.id ? res.data : c))
//       );
//     } catch (err) {
//       console.error("Error updating city:", err);
//     }
//   };

//   // ✅ Delete city
//   const deleteCity = async (id) => {
//     try {
//       await axiosCommonInstance.delete(`/api/city/${id}`);
//       setCity((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("Error deleting city:", err);
//     }
//   };

//   // ✅ Fetch on mount
//   useEffect(() => {
//     fetchCity();
//   }, []);

//   return { city, loading, addCity, updateCity, deleteCity, fetchCity };
// };
