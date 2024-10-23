// src/context/ModeContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModeContextType {
  isTransferMode: boolean;
  setTransferMode: (mode: boolean) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isTransferMode, setTransferMode] = useState(false);

  return (
    <ModeContext.Provider value={{ isTransferMode, setTransferMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export const useModeContext = (): ModeContextType => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useModeContext must be used within a ModeProvider");
  }
  return context;
};
