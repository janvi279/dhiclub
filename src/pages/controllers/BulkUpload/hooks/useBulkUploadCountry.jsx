import { useEffect, useState } from "react";

export const useBulkUpload = () => {
  const [bulkUploadList, setBulkUploadList] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("bulkUploadList");
    if (saved) setBulkUploadList(JSON.parse(saved));
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem("bulkUploadList", JSON.stringify(data));
    setBulkUploadList(data);
  };

  const addBulkUpload = (item) => {
    const newList = [...bulkUploadList, { ...item, id: Date.now() }];
    saveToStorage(newList);
  };

  const updateBulkUpload = (updatedItem) => {
    const newList = bulkUploadList.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    saveToStorage(newList);
  };

  const deleteBulkUpload = (id) => {
    const newList = bulkUploadList.filter((item) => item.id !== id);
    saveToStorage(newList);
  };

  return { bulkUploadList, addBulkUpload, updateBulkUpload, deleteBulkUpload };
};
