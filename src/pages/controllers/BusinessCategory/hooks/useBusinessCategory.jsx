import { useState, useEffect } from "react";

export const useBusinessCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("businessCategories")) || [];
    setCategories(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("businessCategories", JSON.stringify(data));
  };

  const addCategory = (category) => {
    const newData = [...categories, { id: Date.now(), ...category }];
    setCategories(newData);
    saveToStorage(newData);
  };

  const updateCategory = (updated) => {
    const newData = categories.map((c) => (c.id === updated.id ? updated : c));
    setCategories(newData);
    saveToStorage(newData);
  };

  const deleteCategory = (id) => {
    const newData = categories.filter((c) => c.id !== id);
    setCategories(newData);
    saveToStorage(newData);
  };

  return { categories, addCategory, updateCategory, deleteCategory };
};
