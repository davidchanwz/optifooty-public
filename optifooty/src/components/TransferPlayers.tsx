// src/components/TransferPlayers.tsx
import React, { useState } from "react";
import { useConstraintsContext } from "../context/ConstraintsContext";
import { useModeContext } from "../context/ModeContext";
import "./TransferPlayers.css";

const TransferPlayers: React.FC = () => {
  const { selectedPlayers, clearSelections } = useConstraintsContext();
  const { isTransferMode, setTransferMode } = useModeContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    const selectedPlayerIds = selectedPlayers.map((player) => player.id);
    console.log(
      "Selected players to pass to Python script:",
      selectedPlayerIds
    );
    // Call your Python script here with selectedPlayerIds
    setIsEditing(false);
    setTransferMode(false);
  };

  const handleCancel = () => {
    clearSelections();
    setIsEditing(false);
    setTransferMode(false);
  };

  return (
    <div className="transfer-players">
      {!isEditing ? (
        <button
          className="transfer-players-button"
          onClick={() => {
            setIsEditing(true);
            setTransferMode(true);
          }}
        >
          Select Players to Transfer
        </button>
      ) : (
        <div className ="save-cancel">
          <button className="optimiser-save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="optimiser-cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default TransferPlayers;
