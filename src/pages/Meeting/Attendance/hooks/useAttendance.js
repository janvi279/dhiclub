import { useState, useEffect } from "react";

const useAttendance = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setLoading(true);
      try {
        // 🚀 Replace with actual API call later
        const dummyData = [
          { 
            id: 1, 
            no: "01", 
            meetingId: "MTG-2024-001", 
            members: 50, 
            present: 47, 
            absent: 3, 
            substitute: 1, 
            status: "Active", 
            createdAt: "2024-07-10",
            meetingDate: "2024-07-10",
            meetingTitle: "Monthly Team Meeting",
            location: "Conference Room A"
          },
          { 
            id: 2, 
            no: "02", 
            meetingId: "MTG-2024-002", 
            members: 60, 
            present: 55, 
            absent: 5, 
            substitute: 2, 
            status: "Inactive", 
            createdAt: "2024-06-05",
            meetingDate: "2024-06-05",
            meetingTitle: "Quarterly Review",
            location: "Main Auditorium"
          },
          { 
            id: 3, 
            no: "03", 
            meetingId: "MTG-2024-003", 
            members: 45, 
            present: 40, 
            absent: 5, 
            substitute: 0, 
            status: "Active", 
            createdAt: "2024-08-15",
            meetingDate: "2024-08-15",
            meetingTitle: "Training Session",
            location: "Training Center"
          },
        ];

        // Simulate API delay
        setTimeout(() => {
          setMeetings(dummyData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  return { meetings, loading };
};

export default useAttendance;