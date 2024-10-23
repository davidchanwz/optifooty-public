// src/components/OptimiserSquad.tsx
import React, { useState } from "react";
import { Player } from "../types";
import { useUserTeamContext } from "../context/UserTeamContext";
import { useConstraintsContext } from "../context/ConstraintsContext";
import { useModeContext } from "../context/ModeContext";
import Icon from "./Icon";
import pitch from "../assets/images/pitch3.png";
import transferIcon from "../assets/images/transfer_icon.png";
import "./OptimiserSquad.css";

const OptimiserSquad: React.FC = () => {
  const { goalkeepers, defenders, midfielders, forwards } =
    useUserTeamContext();
  const { selectedPlayers, selectPlayer, unselectPlayer } =
    useConstraintsContext();
  const { isTransferMode } = useModeContext();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

    // Define positions for the players on the pitch
    const gkPositions = [
      { top: '85%', left: '37%' },
      { top: '85%', left: '63%' },
  ];

  const dfPositions = [
      { top: '60%', left: '15%' },
      { top: '60%', left: '32.5%' },
      { top: '60%', left: '50%' },
      { top: '60%', left: '67.5%' },
      { top: '60%', left: '85%' },
  ];

  const mfPositions = [
      { top: '35%', left: '15%' },
      { top: '35%', left: '32.5%' },
      { top: '35%', left: '50%' },
      { top: '35%', left: '67.5%' },
      { top: '35%', left: '85%' },
  ];

  const fwPositions = [
      { top: '10%', left: '27%' },
      { top: '10%', left: '50%' },
      { top: '10%', left: '73%' },
  ];

  const renderIcons = (
    players: Player[],
    positions: { top: string; left: string }[],
    positionType: string
  ) => {
    return positions.map((pos, index) => {
      const player = players[index] || null;
      const isSelected =
        player && selectedPlayers.find((p) => p.id === player.id);
      return (
        <div
          key={index}
          onClick={() => handlePlayerClick(player)}
          className={`optimiser-player-icon ${isSelected ? "selected" : ""}`}
          style={pos}
        >
          <Icon player={player}  style={pos} />
          {isSelected && (
            <img
              src={transferIcon}
              alt="Transfer Icon"
              className="transfer-icon"
            />
          )}
        </div>
      );
    });
  };

  const handlePlayerClick = (player: Player | null) => {
    if (!player) return; // Ensure player is not null

    if (isTransferMode) {
      if (selectedPlayers.find((p) => p.id === player.id)) {
        unselectPlayer(player);
      } else {
        selectPlayer(player);
      }
    } else {
      setSelectedPlayer(player);
    }
  };

  return (
    <div className="squad">
      <img src={pitch} alt="Soccer Pitch" className="pitch" />
      {renderIcons(goalkeepers, gkPositions, "GK")}
      {renderIcons(defenders, dfPositions, "DF")}
      {renderIcons(midfielders, mfPositions, "MF")}
      {renderIcons(forwards, fwPositions, "FW")}
    </div>
  );
};

export default OptimiserSquad;