import { useState } from "react";
import DataTable from "react-data-table-component";
import useAttendance from "./hooks/useAttendance";
import { AttendanceColumns } from "./columns";
import ViewModal from "./modals/view";
import customStyles from "../../../components/custom/customStyle";

const AttendanceList = () => {
  const { meetings, loading } = useAttendance();
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  return (
  <div className="mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header + Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between pb-4 border-b border-gray-200 mb-4">
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>
      </div>
      <DataTable
        columns={AttendanceColumns(setSelectedMeeting)}
        data={meetings}
        pagination
        highlightOnHover
        progressPending={loading}
         customStyles={customStyles}
        
      />

      {selectedMeeting && (
        <ViewModal
          isOpen={!!selectedMeeting}
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}
    </div>
  );
};

export default AttendanceList;