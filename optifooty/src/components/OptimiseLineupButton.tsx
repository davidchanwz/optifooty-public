// src/components/OptimiseLineupButton.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUserTeamContext } from "../context/UserTeamContext";
import "./OptimiseLineupButton.css";

const OptimiseLineupButton: React.FC = () => {
  const navigate = useNavigate();
  const { goalkeepers, defenders, midfielders, forwards } =
    useUserTeamContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleOptimiseLineup = async () => {
    setIsLoading(true);

    const userLineup = [
      ...goalkeepers.map((p) => p.name),
      ...defenders.map((p) => p.name),
      ...midfielders.map((p) => p.name),
      ...forwards.map((p) => p.name),
    ];

    console.log("Optimising lineup with the following data:");
    console.log("User Lineup:", userLineup);

    // Send data to the Flask endpoint
    try {
      const response = await axios.post(
        "https://optifooty.onrender.com/run-lineupOptimiser-script",
        { userLineup },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from Flask:", response.data);
      // Redirect to Lineup page
      navigate("/lineup", { state: { result: response.data } });
    } catch (error) {
      console.error("Error sending data to Flask:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="optimise-lineup">
      <button
        className="optimise-lineup-button"
        onClick={handleOptimiseLineup}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Optimise Lineup"}
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

export default OptimiseLineupButton;