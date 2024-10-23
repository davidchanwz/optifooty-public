// src/components/ComparisonPopup.tsx

import React from 'react';
import { PlayerStats } from '../types';
import './ComparisonPopup.css'; // Create this CSS file

interface ComparisonPopupProps {
    players: PlayerStats[];
    onClose: () => void;
}

const ComparisonPopup: React.FC<ComparisonPopupProps> = ({ players, onClose }) => {
    return (
        <div className="comparison-popup">
            <div className="comparison-content">
                <h2>Player Comparison</h2>
                <div className="comparison-details">
                    {players.map((player, index) => (
                        <div key={index} className="comparison-player">
                            <h3>{player.player_name}</h3>
                            {Object.entries(player).map(([key, value]) => (
                                <div className="stat-item" key={key}>
                                    <span className="stat-key">{key}:</span> <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <button className="close-button" onClick={onClose}>×</button>
            </div>
        </div>
    );
};

export default ComparisonPopup;