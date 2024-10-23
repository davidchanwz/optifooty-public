// src/components/PlayerList.tsx

import React from 'react';
import { Player } from '../types';
import PlayerItem from './PlayerItem';
import './PlayerList.css'; // Import the new CSS file

interface PlayerListProps {
    players: Player[];
    onPlayerClick: (player: Player) => void;
    userTeam: Player[];
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onPlayerClick, userTeam }) => {
    return (
        <div className="player-list">
            {players.map(player => (
                <PlayerItem
                    key={player.id}
                    player={player}
                    onClick={() => onPlayerClick(player)}
                    isSelected={userTeam.some(p => p.id === player.id)}
                />
            ))}
        </div>
    );
};

export default PlayerList;