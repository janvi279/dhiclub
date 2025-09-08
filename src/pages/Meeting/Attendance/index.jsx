import { useState, useMemo } from "react";
import DataTable from "react-data-table-component";
import { FaPlus } from "react-icons/fa";
import AttendanceFilters from "./component/filter";
import AttendanceSearch from "./component/search";
import ViewModal from "./modals/view";
import useAttendance from "./hooks/useAttendance";
import { AttendanceColumns } from "./columns";
import customStyles from "../../../components/custom/customStyle";

const AttendanceList = () => {
  const { meetings, updateAttendance, deleteAttendance } = useAttendance();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  // ✅ Filter + Search + Sort
  const filteredMeetings = useMemo(() => {
    return meetings
      .filter((m) => {
        const name = (m.meetingId || "") + "";
        const matchesSearch = name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
          statusFilter === "all" ? true : m.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) =>
        sortOrder === "newest"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
  }, [meetings, search, statusFilter, sortOrder]);

  // ✅ Handle Add new meeting (optional)
  const handleAdd = () => {
    // provide empty template object for Add modal
    setSelectedMeeting({
      meetingId: "",
      members: 0,
      present: 0,
      absent: 0,
      substitute: 0,
      status: "Active",
    });
  };

  return (
    <div className="mx-auto bg-white shadow-lg border-primary-800 border rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-5 border-b border-gray-200 mb-4">
        <h1 className="text-primary-150 font-semibold text-xl">Attendance</h1>

        <AttendanceSearch search={search} setSearch={setSearch} />

        <div className="flex gap-4 max-sm:flex-wrap">
          <AttendanceFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <button
            onClick={handleAdd}
            className="bg-primary-200 text-white px-4 py-2 rounded-full flex items-center gap-2"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={AttendanceColumns({
          onView: setSelectedMeeting,
          updateAttendance,
          deleteAttendance,
        })}
        data={filteredMeetings}
        pagination
        highlightOnHover
        customStyles={customStyles}
      />

      {/* View/Add Modal */}
      {selectedMeeting && (
        <ViewModal
          isOpen={true}
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </div>
  );
};

export default AttendanceList;
