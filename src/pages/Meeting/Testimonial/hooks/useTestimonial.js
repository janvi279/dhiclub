import { useState, useEffect } from "react";

export const useTestimonial = () => {
  const [testimonials, setTestimonials] = useState([]);

  // ✅ Load from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("testimonials")) || [];
    setTestimonials(stored);
  }, []);

  // ✅ Save to localStorage whenever testimonials change
  useEffect(() => {
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
  }, [testimonials]);

  // ✅ Add new Testimonial
  const addTestimonial = (entry) => {
    setTestimonials((prev) => [...prev, { id: Date.now(), ...entry }]);
  };

  // ✅ Update Testimonial
  const updateTestimonial = (updated) => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === updated.id ? updated : item))
    );
  };

  // ✅ Delete Testimonial
  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id));
  };

  // 👉 Expose both state + setter so you can inject dummy data
  return { data: testimonials, setData: setTestimonials, addTestimonial, updateTestimonial, deleteTestimonial };
};
