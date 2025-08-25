import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import customStyles from "../../../components/custom/customStyle";

const Index = () => {
  // ✅ Dummy Data
  const [data, setData] = useState([
    { id: 1, name: "John Doe", city: "Ahmedabad", state: "Gujarat", pincode: "380015", status: "Active" },
    { id: 2, name: "Jane Smith", city: "Surat", state: "Gujarat", pincode: "395007", status: "Inactive" },
    { id: 3, name: "Ravi Patel", city: "Rajkot", state: "Gujarat", pincode: "360001", status: "Active" },
  ]);

  // ✅ Columns
  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true, width: "70px" },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "City", selector: (row) => row.city, sortable: true },
    { name: "State", selector: (row) => row.state, sortable: true },
    { name: "Pincode", selector: (row) => row.pincode, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  return (
    <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
 <h1 className="text-primary-150 font-semibold text-xl">Members</h1>
      
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
      />
    </div>
  );
};

export default Index;
