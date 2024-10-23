// src/components/PlayerSelector.tsx

import React, { useState, useEffect } from "react";
import { Player } from "../types";
import { usePlayerContext } from "../context/PlayerContext";
import { useUserTeamContext } from "../context/UserTeamContext";
import SearchBar from "./SearchBar";
import PlayerList from "./PlayerList";
import Pagination from "./Pagination";
import PlayerFilter from "./PlayerFilter"; // Import the new filter component
import supabase from "../client"; // Import the Supabase client
import "./PlayerSelector.css"; // Import the new CSS file

const PlayerSelector: React.FC = () => {
  const { players } = usePlayerContext();
  const {
    goalkeepers,
    defenders,
    midfielders,
    forwards,
    addPlayer,
    removePlayer,
  } = useUserTeamContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 12; // Example number of players per page
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]); // State to store team options

  useEffect(() => {
    const fetchTeams = async () => {
      const { data: teamsData, error } = await supabase
        .from("teams")
        .select("id, name");
      if (error) {
        console.error("Error fetching teams:", error);
      } else {
        setTeams(teamsData || []);
      }
    };

    fetchTeams();
  }, []);

  const filteredPlayers = players.filter(
    (player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (teamFilter === "" || player.teamName === teamFilter) &&
      (positionFilter === "" || player.position === positionFilter)
  );

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const handlePlayerClick = (player: Player) => {
    const allPlayers = [
      ...goalkeepers,
      ...defenders,
      ...midfielders,
      ...forwards,
    ];
    if (allPlayers.find((p) => p.id === player.id)) {
      removePlayer(player);
    } else {
      addPlayer(player);
    }
  };

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="player-selector">
      <div className="search-bar-container">
        <SearchBar setSearchQuery={handleSearchQueryChange} />
      </div>
      <div className="player-filter-container">
        <PlayerFilter
          setTeamFilter={setTeamFilter}
          setPositionFilter={setPositionFilter}
          teams={teams}
        />
      </div>
      <div className="player-list-container">
        <PlayerList
          players={currentPlayers}
          onPlayerClick={handlePlayerClick}
          userTeam={[...goalkeepers, ...defenders, ...midfielders, ...forwards]}
        />
      </div>
      <Pagination
        totalPlayers={filteredPlayers.length}
        playersPerPage={playersPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default PlayerSelector;
