import { useState, useEffect } from "react";

export const useOnetoOne = () => {
  const [onetoone, setOneToOne] = useState([]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("onetoone")) || [];
    setOneToOne(stored);
  }, []);

  // ✅ Save to localStorage
  const saveToStorage = (data) => {
    localStorage.setItem("onetoone", JSON.stringify(data));
  };

  // ✅ Add new One-to-One entry
  const addOnetoOne = (entry) => {
    const newData = [...onetoone, { id: Date.now(), ...entry }];
    setOneToOne(newData);
    saveToStorage(newData);
  };

  // ✅ Update One-to-One entry
  const updateOnetoOne = (updated) => {
    const newData = onetoone.map((item) =>
      item.id === updated.id ? updated : item
    );
    setOneToOne(newData);
    saveToStorage(newData);
  };

  // ✅ Delete One-to-One entry
  const deleteOnetoOne = (id) => {
    const newData = onetoone.filter((item) => item.id !== id);
    setOneToOne(newData);
    saveToStorage(newData);
  };

  return { onetoone, addOnetoOne, updateOnetoOne, deleteOnetoOne };
};
