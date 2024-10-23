// src/components/OptimiseTransfers.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useConstraintsContext } from "../context/ConstraintsContext";
import { useUserTeamContext } from "../context/UserTeamContext";
import "./OptimiseTransfers.css";

const OptimiseTransfers: React.FC = () => {
  const navigate = useNavigate();
  const { selectedPlayers, numberOfTransfers } = useConstraintsContext();
  const { goalkeepers, defenders, midfielders, forwards } =
    useUserTeamContext();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleOptimise = async () => {
    setIsLoading(true); // Set loading to true when the request starts

    const selectedPlayerNames = selectedPlayers.map((player) => player.name);
    const userLineup = [
      ...goalkeepers.map((p) => p.name),
      ...defenders.map((p) => p.name),
      ...midfielders.map((p) => p.name),
      ...forwards.map((p) => p.name),
    ];

    console.log("Optimising transfers with the following data:");
    console.log("User Lineup:", userLineup);
    console.log("Number of Transfers:", numberOfTransfers);
    console.log("Selected Players for Transfer:", selectedPlayerNames);

    // Send data to the Flask endpoint
    try {
      const response = await axios.post(
        "https://optifooty.onrender.com/run-transferOptimiser-script",
        {
          userLineup,
          numberOfTransfers,
          selectedPlayerNames,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from Flask:", response.data);
      // Redirect to TransferResults page
      navigate("/transfer-results", { state: { result: response.data } });
    } catch (error) {
      console.error("Error sending data to Flask:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // Request was made but no response received
          console.error("Request data:", error.request);
        } else {
          // Something happened in setting up the request
          console.error("Error message:", error.message);
        }
      } else {
        // Some other error occurred
        console.error("Unknown error:", error);
      }
    } finally {
      setIsLoading(false); // Set loading to false when the request is completed
    }
  };

  return (
    <div className="optimise-transfers">
      <button
        className="optimise-transfers-button"
        onClick={handleOptimise}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Optimise Transfers"}
      </button>
      {isLoading && (
        <div className="loading-message">
          <div className="spinner"></div>
          <span>Please wait...</span>
        </div>
      )}
    </div>
  );
};

export default OptimiseTransfers;
