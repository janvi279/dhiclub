import { useState, useEffect } from "react";

const useResponsibility = () => {
  const [responsibilities, setResponsibilities] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("responsibilities");
    if (stored) setResponsibilities(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("responsibilities", JSON.stringify(responsibilities));
  }, [responsibilities]);

  const addResponsibility = (item) => {
    const payload = { ...item, id: Date.now(), createdAt: item.createdAt || new Date().toISOString() };
    setResponsibilities((prev) => [payload, ...prev]);
    return payload;
  };

  const updateResponsibility = (updated) => {
    setResponsibilities((prev) => prev.map((it) => (it.id === updated.id ? updated : it)));
  };

  const deleteResponsibility = (id) => {
    setResponsibilities((prev) => prev.filter((it) => it.id !== id));
  };

  return {
    responsibilities,
    addResponsibility,
    updateResponsibility,
    deleteResponsibility,
  };
};

export default useResponsibility;
