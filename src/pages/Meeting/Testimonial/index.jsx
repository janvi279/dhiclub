import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import testimonialColumns from "./columns";
import ViewTestimonialModal from "./Modals/view";
import { useTestimonial } from "./hooks/useTestimonial";
import customStyles from "../../../components/custom/customStyle";

const Testimonial = () => {
  const { data, setData } = useTestimonial(); // ✅ hook now returns data + setData
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    // ✅ Dummy data for initial render
    const dummyTestimonials = [
      {
        id: 1,
        name: "John Doe",
        designation: "CEO, TechCorp",
        message: "This service is outstanding! Highly recommended.",
        date: "2025-08-01",
        topic: "",
        status: "Active"
      },
      {
        id: 2,
        name: "Jane Smith",
        designation: "Marketing Head, BrightCo",
        message: "Amazing experience. The team was professional and supportive.",
        date: "2025-08-05",
        status: "Active"
      },
      {
        id: 3,
        name: "Rajesh Patel",
        designation: "Founder, StartupHub",
        message: "Helped us grow our business faster than expected!",
        date: "2025-08-10",
        status: "Active"
      },
    ];

    setData(dummyTestimonials);
  }, [setData]);

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Testimonial List</h1>
      </div>
      <DataTable
        columns={testimonialColumns(setSelectedTestimonial)}
        data={data}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
      />

      {/* ✅ View Modal */}
      {selectedTestimonial && (
        <ViewTestimonialModal
          isOpen={!!selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
          testimonial={selectedTestimonial}
        />
      )}
    </div>
  );
};

export default Testimonial;
