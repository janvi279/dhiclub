import { useState, useEffect } from "react";

export const useCity = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cities")) || [];
    setCities(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("cities", JSON.stringify(data));
  };

  const addCity = (city) => {
    const newData = [...cities, { id: Date.now(), ...city }];
    setCities(newData);
    saveToStorage(newData);
  };

  const updateCity = (updated) => {
    const newData = cities.map((c) => (c.id === updated.id ? updated : c));
    setCities(newData);
    saveToStorage(newData);
  };

  const deleteCity = (id) => {
    const newData = cities.filter((c) => c.id !== id);
    setCities(newData);
    saveToStorage(newData);
  };

  return { cities, addCity, updateCity, deleteCity };
};

// import { useState, useEffect } from "react";
// // import axiosCommonInstance from "../../../utils/axios/axiosCommonInstance";
// // import { setToken } from "../../../utils/cookies/cookies";

// export const useCity = () => {
//   const [cities, setCities] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch Cities from API
//   const fetchCities = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosCommonInstance.get("/api/cities");
//       setCities(res.data);
//     } catch (err) {
//       console.error("Error fetching cities:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add new city
//   const addCity = async (city) => {
//     try {
//       const res = await axiosCommonInstance.post("/api/cities", city);
//       setCities((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Error adding city:", err);
//     }
//   };

//   // ✅ Update city
//   const updateCity = async (updated) => {
//     try {
//       const res = await await axiosCommonInstance.put(`/api/cities/${updated.id}`, updated);
//       setCities((prev) =>
//         prev.map((c) => (c.id === updated.id ? res.data : c))
//       );
//     } catch (err) {
//       console.error("Error updating city:", err);
//     }
//   };

//   // ✅ Delete city
//   const deleteCity = async (id) => {
//     try {
//       await axiosCommonInstance.delete(`/api/cities/${id}`);
//       setCities((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("Error deleting city:", err);
//     }
//   };

//   // ✅ Fetch on mount
//   useEffect(() => {
//     fetchCities();
//   }, []);

//   return { cities, loading, addCity, updateCity, deleteCity, fetchCities };
// };
