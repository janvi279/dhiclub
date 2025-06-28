// MemberListContext.js
import { createContext, useContext, useState } from "react";

const MemberListContext = createContext();

export const MemberListProvider = ({ children }) => {
  const [members, setMembers] = useState([]);

  const addMember = (memberData) => {
    const entry = {
      teamName: memberData.firstName + " " + memberData.lastName,
      country: memberData.countryCode,
      state: memberData.address?.state || "-",
      city: memberData.address?.city || "-",
      joiningDate: new Date().toLocaleDateString(),
    };
    setMembers((prev) => [...prev, entry]);
  };

  return (
    <MemberListContext.Provider value={{ members, addMember }}>
      {children}
    </MemberListContext.Provider>
  );
};

export const useMemberList = () => useContext(MemberListContext);
