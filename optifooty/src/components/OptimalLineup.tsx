// src/components/OptimalLineup.tsx
import React from "react";
import { Player } from "../types";
import Icon from "./Icon";
import pitch from "../assets/images/pitch3.png";
import "./OptimalLineup.css";

interface OptimalLineupProps {
  starting11: Player[];
  bench: Player[];
  formation: number[];
  totalPoints: number;
  starting11Points: number[];
  benchPoints: number[];
}

const OptimalLineup: React.FC<OptimalLineupProps> = ({ starting11, bench, formation, totalPoints, starting11Points, benchPoints }) => {
  const generatePositions = (formation: number[]) => {
    const positions = [];
    const totalLines = formation.length + 1; // Including the goalkeeper line
    const lineHeight = 80 / totalLines; // Height percentage for each line

    positions.push({ top: "80%", left: "50%" }); // Position for the goalkeeper

    for (let i = 0; i < formation.length; i++) {
      const playerCount = formation[i];
      const linePosition = ((totalLines - i - 1) * lineHeight); // Position for each line

      for (let j = 0; j < playerCount; j++) {
        const playerPosition = (100 / (playerCount + 1)) * (j + 1); // Position for each player in the line
        positions.push({ top: `${linePosition}%`, left: `${playerPosition}%` });
      }
    }
    return positions;
  };

  const positions = generatePositions(formation);

  const renderIcons = (
    players: Player[],
    positions: { top: string; left: string }[],
    points: number[]
  ) => {
    return positions.map((pos, index) => {
      const player = players[index] || null;
      const playerPoints = points[index] || 0;
      const positionType = index === 0 ? "GK" : index <= formation[0] ? "DEF" : index <= formation[0] + formation[1] ? "MID" : "FWD";
      return (
        <div key={index} className="optimal-player-icon" style={pos}>
          <Icon player={player}  style={pos} />
          <div className="player-points">{playerPoints.toFixed(2)}</div>
        </div>
      );
    });
  };

  return (
    <div className="optimal-lineup">
      <div className="total-points">Total Points: {totalPoints.toFixed(2)}</div>
      <div className="lineup-container">
        <img src={pitch} alt="Soccer Pitch" className="pitch" />
        {renderIcons(starting11, positions, starting11Points)}
      </div>
      <div className="bench-container">
        {bench.map((player, index) => (
          <div key={index} className="bench-player-icon">
            <Icon player={player}  style={{ top: "0%", left: `${(index + 1) * 15}%` }} />
            <div className="player-points">{benchPoints[index].toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptimalLineup;