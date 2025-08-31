import { useEffect, useState } from "react";

export const useBulkUploadBusiness = () => {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("businesses");
    if (stored) {
      try {
        setBusinessList(JSON.parse(stored));
      } catch {
        setBusinessList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("businesses", JSON.stringify(businessList));
  }, [businessList]);

  const addBusiness = (business) => {
    const newItem = {
      ...business,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    setBusinessList([...businessList, newItem]);
  };

  const updateBusiness = (updated) => {
    setBusinessList((prev) =>
      prev.map((b) => (b.id === updated.id ? updated : b))
    );
  };

  const deleteBusiness = (id) => {
    setBusinessList((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleStatus = (id) => {
    setBusinessList((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === "Active" ? "Deactive" : "Active" }
          : b
      )
    );
  };

  return { businessList, addBusiness, updateBusiness, deleteBusiness, toggleStatus };
};
