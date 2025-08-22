import { useState, useEffect } from "react";

export const useCountry = () => {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("country")) || [];
    setCountry(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("country", JSON.stringify(data));
  };

  const addCountry = (Country) => {
    const newData = [...country, { id: Date.now(), ...Country }];
    setCountry(newData);
    saveToStorage(newData);
  };

  const updateCountry = (updated) => {
    const newData = country.map((c) => (c.id === updated.id ? updated : c));
    setCountry(newData);
    saveToStorage(newData);
  };

  const deleteCountry = (id) => {
    const newData = country.filter((c) => c.id !== id);
    setCountry(newData);
    saveToStorage(newData);
  };

  return { country, addCountry, updateCountry, deleteCountry };
};

// import { useState, useEffect } from "react";
// // import axiosCommonInstance from "../../../utils/axios/axiosCommonInstance";
// // import { setToken } from "../../../utils/cookies/cookies";

// export const useCountry = () => {
//   const [country, setCountry] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch country from API
//   const fetchcountry = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosCommonInstance.get("/api/country");
//       setCountry(res.data);
//     } catch (err) {
//       console.error("Error fetching country:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add new Country
//   const addCountry = async (Country) => {
//     try {
//       const res = await axiosCommonInstance.post("/api/country", Country);
//       setCountry((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Error adding Country:", err);
//     }
//   };

//   // ✅ Update Country
//   const updateCountry = async (updated) => {
//     try {
//       const res = await await axiosCommonInstance.put(`/api/country/${updated.id}`, updated);
//       setCountry((prev) =>
//         prev.map((c) => (c.id === updated.id ? res.data : c))
//       );
//     } catch (err) {
//       console.error("Error updating Country:", err);
//     }
//   };

//   // ✅ Delete Country
//   const deleteCountry = async (id) => {
//     try {
//       await axiosCommonInstance.delete(`/api/country/${id}`);
//       setCountry((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("Error deleting Country:", err);
//     }
//   };

//   // ✅ Fetch on mount
//   useEffect(() => {
//     fetchcountry();
//   }, []);

//   return { country, loading, addCountry, updateCountry, deleteCountry, fetchcountry };
// };
