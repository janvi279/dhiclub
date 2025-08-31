import { useState, useEffect } from "react";

export const useBusinessDomain = () => {
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("businessDomains")) || [];
    setDomains(stored);
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("businessDomains", JSON.stringify(data));
  };

  const addDomain = (domain) => {
    const newData = [...domains, { id: Date.now(), ...domain }];
    setDomains(newData);
    saveToStorage(newData);
  };

  const updateDomain = (updated) => {
    const newData = domains.map((d) => (d.id === updated.id ? updated : d));
    setDomains(newData);
    saveToStorage(newData);
  };

  const deleteDomain = (id) => {
    const newData = domains.filter((d) => d.id !== id);
    setDomains(newData);
    saveToStorage(newData);
  };

  return { domains, addDomain, updateDomain, deleteDomain };
};
