// src/components/PlayerItem.tsx

import React from 'react';
import { Player } from '../types';
import './PlayerItem.css'; // Import the new CSS file

interface PlayerItemProps {
    player: Player;
    onClick: () => void;
    isSelected: boolean;
}

const PlayerItem: React.FC<PlayerItemProps> = ({ player, onClick, isSelected }) => {
    return (
        <div
            className={`player-card ${isSelected ? 'selected' : ''}`}
            onClick={onClick}
            style={{ backgroundColor: player.clubColor }}
        >
            <div className="player-name">{player.name}</div>
            <div className="player-position">{player.position}</div>
            <div className="player-team">{player.teamName}</div>
            {isSelected && <div className="selected-icon">✓</div>}

        </div>
    );
};

export default PlayerItem;