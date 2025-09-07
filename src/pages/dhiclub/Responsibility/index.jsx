import { useState } from "react";
import DataTable from "react-data-table-component";
import { RiContactsLine } from "react-icons/ri";
import ViewVisitorModal from "./modals/view";

import ResponsibilityFilters from "./components/filter";
import ResponsibilitySearch from "./components/search";

import Step1Modal from "./modals/step1";
import Step2Modal from "./modals/step2";
import EditModal from "./modals/Edit";

import useResponsibility from "./hooks/useResponsibility";
import responsibilityColumns from "./columns";
import customStyles from "../../../components/custom/customStyle";
import SuccessModal from "./modals/sucess";

const Responsibility = () => {
  const { responsibilities, addResponsibility, updateResponsibility, deleteResponsibility } = useResponsibility();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");

  // orchestration for modal flow
  const [step, setStep] = useState(0);
  const [newResponsibility, setNewResponsibility] = useState(null);
  const [viewResponsibility, setViewResponsibility] = useState(null);
  const [editData, setEditData] = useState(null);
  const [showView, setShowView] = useState(false);

  const handleViewVisitor = (rowData) => {
    setViewResponsibility(rowData);
    setShowView(true);
  };

  // filtered table
  const filteredData = responsibilities
    .filter((r) => {
      const name = r.memberRole || "";
      const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" ? true : r.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) =>
      sortOrder === "newest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt)
    );

  // handle add from Step2
  const handleAddFromStep2 = (step2Values) => {
    const merged = { ...(newResponsibility || {}), ...step2Values };
    const normalized = {
      ...merged,
      MemberId: merged.memberId || merged.MemberId || "",
      MemberName: merged.memberName || merged.MemberName || "",
      memberRole: merged.memberRole || merged.MemberRole || "",
      assignDate: merged.assignDate || merged.AssignDate || "",
      status: merged.status || merged.Status || "Active",
      createdAt: merged.createdAt || new Date().toISOString(),
    };

    const saved = addResponsibility(normalized);
    setViewResponsibility(saved);
    setNewResponsibility(null);
    setStep(3);
  };

  return (
    <div className="mx-auto border border-primary-800 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-11 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Responsibility</h1>

        <ResponsibilitySearch search={search} setSearch={setSearch} />

        <div className="flex gap-4">
          <ResponsibilityFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={() => {
              setNewResponsibility({});
              setStep(1);
            }}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <RiContactsLine /> Assign Role
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={responsibilityColumns({
          responsibilityList: responsibilities,
          handleEdit: (row) => setEditData(row),
          deleteResponsibility,
          updateResponsibility,
          setResponsibilityList: () => { }, // if you want inline Active/Deactive toggle
          handleViewVisitor,
        })}
        data={filteredData}
        pagination
        highlightOnHover
        striped
        customStyles={customStyles}
      />

      {/* Step Modals */}
      {step === 1 && (
        <Step1Modal
          newResponsibility={newResponsibility}
          setNewResponsibility={setNewResponsibility}
          setStep={setStep}
        />
      )}
      {step === 2 && (
        <Step2Modal
          newResponsibility={newResponsibility}
          setStep={setStep}
          onSave={handleAddFromStep2}
        />
      )}

      {step === 3 && viewResponsibility && (
        <SuccessModal
          newResponsibility={viewResponsibility}
          isOpen={true}
          onClose={() => {
            setStep(0);
            setViewResponsibility(null);
          }}
          setStep={setStep}
        />
      )}

      {/* View Modal */}
      {showView && viewResponsibility && (
        <ViewVisitorModal
          newResponsibility={viewResponsibility}
          isOpen={showView}
          onClose={() => setShowView(false)}
        />
      )}

      {/* Edit Modal */}
     {editData && (
  <EditModal
    isOpen={!!editData}
    responsibility={editData}   // 👈 pass correct prop
    onClose={() => setEditData(null)}
    onSave={updateResponsibility}  // 👈 pass save function
  />
)}
    </div>
  );
};

export default Responsibility;
