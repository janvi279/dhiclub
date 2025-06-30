import { createContext, useContext, useEffect, useState } from "react";

const MemberListContext = createContext();

export const MemberListProvider = ({ children }) => {
  const [members, setMembers] = useState([]);

  // ✅ Load from localStorage once on mount
  useEffect(() => {
    const saved = localStorage.getItem("members");
    if (saved) {
      setMembers(JSON.parse(saved));
    }
  }, []);

  // ✅ Save to localStorage every time members change
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  // ✅ Expose addMember method
  const addMember = (newMember) => {
    setMembers((prev) => [...prev, newMember]);
  };

  return (
    <MemberListContext.Provider value={{ members, addMember }}>
      {children}
    </MemberListContext.Provider>
  );
};

export const useMemberList = () => useContext(MemberListContext);
