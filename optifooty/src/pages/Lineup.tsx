// src/pages/Lineup.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import { usePlayerContext } from "../context/PlayerContext";
import OptimalLineup from "../components/OptimalLineup";
import { Player } from "../types";


const Lineup: React.FC = () => {
  const location = useLocation();
  const result = location.state?.result?.lineup_info || {};
  const { players } = usePlayerContext();

  // Function to get player objects from names
  const getPlayerObjects = (names: string[]) => {
    return names.map(name => players.find(player => player.name === name)).filter(player => player !== undefined) as Player[];
  };

  const starting11 = getPlayerObjects(result.Starting_11 || []);
  const bench = getPlayerObjects(result.Bench || []);
  const formation = result.Formation || [];
  const totalPoints = result.Total_Points || [];
  const starting11Points = result.Starting_11_Points || [];
  const benchPoints = result.Bench_Points || [];

  return (
    <div className="lineup-container">
      <OptimalLineup starting11={starting11} bench={bench} formation={formation} totalPoints={totalPoints} starting11Points={starting11Points} benchPoints={benchPoints}/>
    </div>
  );
};

export default Lineup;