import React from "react";
import Squad from "../components/Squad";
import TransferPlayers from "../components/TransferPlayers";
import TransferConstraint from "../components/TransferConstraint";
import "./Optimiser.css"; // Create a CSS file for styling
import OptimiseTransfers from "../components/OptimiseTransfers";
import OptimiserSquad from "../components/OptimiserSquad";
import OptimiseLineupButton from "../components/OptimiseLineupButton";

const Optimiser: React.FC = () => {
  return (
    <>
      <div className="optimiser-container">
        <div className="optimiser-left">
          <OptimiserSquad />
        </div>
        <div className="optimiser-right">
          <div className="constraint-container">
            <TransferConstraint />
            <TransferPlayers />
            <OptimiseTransfers />
            <OptimiseLineupButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Optimiser;
