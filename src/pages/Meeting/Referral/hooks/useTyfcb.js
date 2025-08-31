import { useState, useEffect } from "react";

export const useTyfcb = () => {
  const [tyfcb, setTyfcb] = useState([]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("tyfcb")) || [];
    setTyfcb(stored);
  }, []);

  // ✅ Save to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem("tyfcb", JSON.stringify(data));
  };

  // ✅ Add new TYFCB entry
  const addTyfcb = (entry) => {
    const newData = [...tyfcb, { id: Date.now(), ...entry }];
    setTyfcb(newData);
    saveToStorage(newData);
  };

  // ✅ Update TYFCB entry
  const updateTyfcb = (updated) => {
    const newData = tyfcb.map((item) =>
      item.id === updated.id ? updated : item
    );
    setTyfcb(newData);
    saveToStorage(newData);
  };

  // ✅ Delete TYFCB entry
  const deleteTyfcb = (id) => {
    const newData = tyfcb.filter((item) => item.id !== id);
    setTyfcb(newData);
    saveToStorage(newData);
  };

  return { tyfcb, addTyfcb, updateTyfcb, deleteTyfcb };
};
// import { useState, useEffect } from "react";
// import axiosCommonInstance from "../../../utils/axios/axiosCommonInstance";

// export const useTyfcb = () => {
//   const [tyfcb, setTyfcb] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch TYFCB data
//   const fetchTyfcb = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosCommonInstance.get("/api/tyfcb");
//       setTyfcb(res.data);
//     } catch (err) {
//       console.error("Error fetching TYFCB:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Add TYFCB entry
//   const addTyfcb = async (entry) => {
//     try {
//       const res = await axiosCommonInstance.post("/api/tyfcb", entry);
//       setTyfcb((prev) => [...prev, res.data]);
//     } catch (err) {
//       console.error("Error adding TYFCB:", err);
//     }
//   };

//   // ✅ Update TYFCB entry
//   const updateTyfcb = async (updated) => {
//     try {
//       const res = await axiosCommonInstance.put(`/api/tyfcb/${updated.id}`, updated);
//       setTyfcb((prev) =>
//         prev.map((item) => (item.id === updated.id ? res.data : item))
//       );
//     } catch (err) {
//       console.error("Error updating TYFCB:", err);
//     }
//   };

//   // ✅ Delete TYFCB entry
//   const deleteTyfcb = async (id) => {
//     try {
//       await axiosCommonInstance.delete(`/api/tyfcb/${id}`);
//       setTyfcb((prev) => prev.filter((item) => item.id !== id));
//     } catch (err) {
//       console.error("Error deleting TYFCB:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTyfcb();
//   }, []);

//   return { tyfcb, loading, addTyfcb, updateTyfcb, deleteTyfcb, fetchTyfcb };
// };
