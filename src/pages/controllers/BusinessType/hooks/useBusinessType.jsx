import { useState, useEffect } from "react";

export const useBusinessType = () => {
  const [businessTypes, setBusinessTypes] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("businessTypes")) || [];
    setBusinessTypes(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("businessTypes", JSON.stringify(data));
  };

  const addBusinessType = (bt) => {
    const newData = [...businessTypes, { id: Date.now(), ...bt }];
    setBusinessTypes(newData);
    saveToStorage(newData);
  };

  const updateBusinessType = (updated) => {
    const newData = businessTypes.map((b) => (b.id === updated.id ? updated : b));
    setBusinessTypes(newData);
    saveToStorage(newData);
  };

  const deleteBusinessType = (id) => {
    const newData = businessTypes.filter((b) => b.id !== id);
    setBusinessTypes(newData);
    saveToStorage(newData);
  };

  return { businessTypes, addBusinessType, updateBusinessType, deleteBusinessType };
};
