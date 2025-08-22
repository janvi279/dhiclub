import { useState, useEffect } from "react";

export const useStates = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("state")) || [];
    setState(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("state", JSON.stringify(data));
  };

  const addState = (s) => {
    const newData = [...state, { id: Date.now(), ...s }];
    setState(newData);
    saveToStorage(newData);
  };

  const updateState = (updated) => {
    const newData = state.map((c) => (c.id === updated.id ? updated : c));
    setState(newData);
    saveToStorage(newData);
  };

  const deleteState = (id) => {
    const newData = state.filter((c) => c.id !== id);
    setState(newData);
    saveToStorage(newData);
  };

  return { state, addState, updateState, deleteState };
};

// import { useState, useEffect } from "react";
// // import axiosCommonInstance from "../../../utils/axios/axiosCommonInstance";
// // import { setToken } from "../../../utils/cookies/cookies";

// export const useState = () => {
//   const [state, setState] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch state from API
//   const fetchstate = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosCommonInstance.get("/api/state");
//       setState(res.data);
//     } catch (err) {
//       console.error("Error fetching state:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add new city
//   const addCity = async (city) => {
//     try {
//       const res = await axiosCommonInstance.post("/api/state", city);
//       setState((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Error adding city:", err);
//     }
//   };

//   // ✅ Update city
//   const updateCity = async (updated) => {
//     try {
//       const res = await await axiosCommonInstance.put(`/api/state/${updated.id}`, updated);
//       setState((prev) =>
//         prev.map((c) => (c.id === updated.id ? res.data : c))
//       );
//     } catch (err) {
//       console.error("Error updating city:", err);
//     }
//   };

//   // ✅ Delete city
//   const deleteCity = async (id) => {
//     try {
//       await axiosCommonInstance.delete(`/api/state/${id}`);
//       setState((prev) => prev.filter((c) => c.id !== id));
//     } catch (err) {
//       console.error("Error deleting city:", err);
//     }
//   };

//   // ✅ Fetch on mount
//   useEffect(() => {
//     fetchstate();
//   }, []);

//   return { state, loading, addCity, updateCity, deleteCity, fetchstate };
// };
