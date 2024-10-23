import React from "react";
import "./TransferItem.css";

interface PlayerProps {
  player_name: string;
  predicted_points: number | string; // Allow both number and string
}

interface TransferProps {
  outPlayer: PlayerProps;
  inPlayer: PlayerProps;
}

const TransferItem: React.FC<TransferProps> = ({ outPlayer, inPlayer }) => {
  // Debugging logs
  console.log("Out Player:", outPlayer);
  console.log("In Player:", inPlayer);

  // Type checks to handle undefined properties
  if (!outPlayer || !inPlayer) {
    console.error("TransferItem received undefined players:", { outPlayer, inPlayer });
    return null;
  }

  // Helper function to ensure points is a number and format it to 3 significant figures
  const formatPoints = (points: number | string) => {
    const numPoints = typeof points === 'string' ? parseFloat(points) : points;
    return numPoints.toPrecision(3);
  };

  return (
    <div className="transfer-item">
      <div className="transfer-player out-player">
        <h4>Transferred Out</h4>
        <p>{outPlayer.player_name}</p>
        <p>Points: {formatPoints(outPlayer.predicted_points)}</p>
      </div>
      <div className="transfer-player in-player">
        <h4>Transferred In</h4>
        <p>{inPlayer.player_name}</p>
        <p>Points: {formatPoints(inPlayer.predicted_points)}</p>
      </div>
    </div>
  );
};

export default TransferItem;