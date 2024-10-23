import React from "react";
import { useLocation } from "react-router-dom";
import Squad from "../components/Squad";
import TransferItem from "../components/TransferItem";
import { useUserTeamContext } from "../context/UserTeamContext";
import { usePlayerContext } from "../context/PlayerContext";
import { Player } from "../types";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


import "./TransferResults.css";


const TransferResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result || {};
  const { goalkeepers, defenders, midfielders, forwards, saveUserTeam, fetchUserTeam } = useUserTeamContext();
  const { players } = usePlayerContext();
  const { user } = useAuth(); // Get the user object from the AuthContext

  const handleSaveTransfers = async () => {
    if (result.transfers && result.transfers.length > 0) {
      let newGoalkeepers = [...goalkeepers];
      let newDefenders = [...defenders];
      let newMidfielders = [...midfielders];
      let newForwards = [...forwards];

      result.transfers.forEach((transferGroup: any) => {
        const outPlayerObj = transferGroup[0]["Transferred Out"];
        const inPlayerObj = transferGroup[1]["Transferred In"];

        const outPlayer = players.find(player => player.name === outPlayerObj.player_name);
        const inPlayer = players.find(player => player.name === inPlayerObj.player_name);

        if (outPlayer) {
          switch (outPlayer.position) {
            case "GK":
              newGoalkeepers = newGoalkeepers.filter(player => player.id !== outPlayer.id);
              break;
            case "DEF":
              newDefenders = newDefenders.filter(player => player.id !== outPlayer.id);
              break;
            case "MID":
              newMidfielders = newMidfielders.filter(player => player.id !== outPlayer.id);
              break;
            case "FWD":
              newForwards = newForwards.filter(player => player.id !== outPlayer.id);
              break;
            default:
              break;
          }
        }

        if (inPlayer) {
          switch (inPlayer.position) {
            case "GK":
              newGoalkeepers.push(inPlayer);
              break;
            case "DEF":
              newDefenders.push(inPlayer);
              break;
            case "MID":
              newMidfielders.push(inPlayer);
              break;
            case "FWD":
              newForwards.push(inPlayer);
              break;
            default:
              break;
          }
        }
      });

      await saveUserTeam({
        goalkeepers: newGoalkeepers,
        defenders: newDefenders,
        midfielders: newMidfielders,
        forwards: newForwards,
      });

      // Refetch the user team using the userId from the AuthContext
      if (user && user.id) {
        await fetchUserTeam(user.id);
      }


      alert("Transfers saved to squad!");
    } else {
      alert("No transfer data available.");
    }
    navigate('/optimiser');
  };

  return (
    <div className="transfer-results-container">
      <div className="transfer-results-left">
        <Squad />
      </div>
      <div className="transfer-results-right">
        {result.transfers && result.transfers.length > 0 ? (
          result.transfers.map((transferGroup: any, index: number) => {
            const outPlayer = transferGroup[0]["Transferred Out"];
            const inPlayer = transferGroup[1]["Transferred In"];

            return (
              <TransferItem
                key={index}
                outPlayer={outPlayer}
                inPlayer={inPlayer}
              />
            );
          })
        ) : (
          <p>No transfer data available.</p>
        )}
        <button onClick={handleSaveTransfers} className="save-transfers-button">
          Save Transfers to Squad
        </button>
      </div>
    </div>
  );
};

export default TransferResults;