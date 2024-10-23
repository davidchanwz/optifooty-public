//PlayerStatsItem.tsx

import React from 'react';
import { PlayerStats } from '../types';
import './PlayerStatsItem.css';

interface PlayerStatsItemProps {
    player: PlayerStats;
    teamColor: string;
    onPlayerClick: (player: PlayerStats) => void;
    onCompareClick: (player: PlayerStats) => void;
    isSelected: boolean;
}

const PlayerStatsItem: React.FC<PlayerStatsItemProps> = ({ player, teamColor, onPlayerClick, onCompareClick, isSelected }) => {
    return (
        <div
            className="player-item"
            onClick={() => {
                console.log('Player item clicked:', player); // Debugging log
                onPlayerClick(player);
            }}
            style={{ backgroundColor: teamColor }}
        >
            <div className="player-info">
                <span className="player-name">{player.player_name}</span>
                <span className="player-position">{player.position}</span>
                <span className="player-team">{player.team}</span>
                <button
                    className={`compare-button ${isSelected ? 'selected' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        onCompareClick(player);
                    }}
                >
                    {isSelected ? 'Remove from Comparison' : 'Add to Comparison'}
                </button>
            </div>
        </div>
    );
};

export default PlayerStatsItem;