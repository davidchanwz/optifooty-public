// src/pages/YourTeam.tsx

import React from "react";
import Squad from "../components/Squad";
import PlayerSelector from "../components/PlayerSelector";
import ResetTeamButton from "../components/ResetTeamButton";
import OptimiseLineupButton from "../components/OptimiseLineupButton";

import "./YourTeam.css"; // Import a CSS file for styling

const YourTeam: React.FC = () => {
  return (
    <>
      <div className="your-team-container">
        <div className="left-section">
          <div className="button-container">
            <ResetTeamButton />
          </div>
          <Squad /> {/* Render the Squad component */}
        </div>
        <div className="right-section">
          <PlayerSelector /> {/* Render the PlayerSelector component */}
        </div>
      </div>
    </>
  );
};

export default YourTeam;
