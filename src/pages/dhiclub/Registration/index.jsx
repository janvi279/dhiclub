import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import CityFilters from "./components/filter";
import CitySearch from "./components/search";
import { useNavigate } from "react-router-dom";
import { registrationColumns } from "./columns"

const RegistrationModule = () => {
  const [registrations, setRegistrations] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("registrations")) || [];
    setRegistrations(stored);
  }, []);

  // Filter + Search + Sort
  const filteredData = registrations
    .filter((r) =>
      r.fullName?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) =>
      filterCountry ? r.country === filterCountry : true
    )
    .sort((a, b) =>
      sortOrder === "newest" ? b.id - a.id : a.id - b.id
    );

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">
          Registration
        </h1>

        <CitySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <CityFilters
            filterCountry={filterCountry}
            setFilterCountry={setFilterCountry}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={() => navigate("/Dhiclub/registration/AddRegistration")}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <DataTable
        columns={registrationColumns()}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default RegistrationModule;
