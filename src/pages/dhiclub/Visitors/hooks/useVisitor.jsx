import { useState, useEffect } from "react";

export const useVisitor = () => {
  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("visitors")) || [];
    setVisitors(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("visitors", JSON.stringify(data));
  };

  const addVisitor = (visitor) => {
    const newData = [...visitors, { id: Date.now(), ...visitor }];
    setVisitors(newData);
    saveToStorage(newData);
  };

  return { visitors, addVisitor };
};
