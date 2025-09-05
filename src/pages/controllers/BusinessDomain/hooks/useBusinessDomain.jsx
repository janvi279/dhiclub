import { useState, useEffect } from "react";

export const useBusinessDomain = () => {
  const [domains, setDomains] = useState([]);

  // Load from storage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("businessDomains")) || [];
    setDomains(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("businessDomains", JSON.stringify(data));
  };

  // Add
  const addDomain = (newDomain) => {
    const data = [...domains, { id: Date.now(), ...newDomain }];
    setDomains(data);
    saveToStorage(data);
  };

  // Update
  const updateDomain = (updated) => {
    const data = domains.map((d) => (d.id === updated.id ? updated : d));
    setDomains(data);
    saveToStorage(data);
  };

  // Delete
  const deleteDomain = (id) => {
    const data = domains.filter((d) => d.id !== id);
    setDomains(data);
    saveToStorage(data);
  };

  return { domains, addDomain, updateDomain, deleteDomain };
};
