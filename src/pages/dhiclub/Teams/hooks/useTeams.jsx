import { useState } from "react";

export const useTeams = () => {
  const [teams, setTeams] = useState([]);

  const addTeam = (team) => {
    setTeams((prev) => [
      ...prev,
      {
        ...team,
        id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, // auto-increment ID
        createdAt: new Date().toISOString(), // useful for sorting
      },
    ]);
  };

  const updateTeam = (updatedTeam) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.id === updatedTeam.id ? { ...team, ...updatedTeam } : team
      )
    );
  };

  const deleteTeam = (id) => {
    setTeams((prev) => prev.filter((team) => team.id !== id));
  };

  return { teams, addTeam, updateTeam, deleteTeam };
};
