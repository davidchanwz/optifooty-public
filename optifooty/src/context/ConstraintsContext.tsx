// src/context/ConstraintsContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Player } from "../types";

interface ConstraintsContextType {
  selectedPlayers: Player[];
  selectPlayer: (player: Player) => void;
  unselectPlayer: (player: Player) => void;
  clearSelections: () => void;
  numberOfTransfers: number;
  setNumberOfTransfers: (num: number) => void;
}

const ConstraintsContext = createContext<ConstraintsContextType | undefined>(
  undefined
);

export const ConstraintsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [numberOfTransfers, setNumberOfTransfers] = useState<number>(1);

  const selectPlayer = (player: Player) => {
    setSelectedPlayers((prev) => [...prev, player]);
  };

  const unselectPlayer = (player: Player) => {
    setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
  };

  const clearSelections = () => {
    setSelectedPlayers([]);
  };

  return (
    <ConstraintsContext.Provider
      value={{
        selectedPlayers,
        selectPlayer,
        unselectPlayer,
        clearSelections,
        numberOfTransfers,
        setNumberOfTransfers,
      }}
    >
      {children}
    </ConstraintsContext.Provider>
  );
};

export const useConstraintsContext = (): ConstraintsContextType => {
  const context = useContext(ConstraintsContext);
  if (context === undefined) {
    throw new Error(
      "useConstraintsContext must be used within a ConstraintsProvider"
    );
  }
  return context;
};
