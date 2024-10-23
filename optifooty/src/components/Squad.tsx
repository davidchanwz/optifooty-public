// src/components/Squad.tsx
import React, { useState } from 'react';
import { Player } from '../types';
import { useUserTeamContext } from '../context/UserTeamContext';
import Icon from './Icon';
import pitch from '../assets/images/pitch3.png';
import './Squad.css'; // Create and import a CSS file for styling

const Squad: React.FC = () => {
    const { goalkeepers, defenders, midfielders, forwards, removePlayer } = useUserTeamContext();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Define positions for the players on the pitch
    const gkPositions = [
        { top: '85%', left: '37%' },
        { top: '85%', left: '63%' },
    ];

    const dfPositions = [
        { top: '60%', left: '15%' },
        { top: '60%', left: '32.5%' },
        { top: '60%', left: '50%' },
        { top: '60%', left: '67.5%' },
        { top: '60%', left: '85%' },
    ];

    const mfPositions = [
        { top: '35%', left: '15%' },
        { top: '35%', left: '32.5%' },
        { top: '35%', left: '50%' },
        { top: '35%', left: '67.5%' },
        { top: '35%', left: '85%' },
    ];

    const fwPositions = [
        { top: '10%', left: '27%' },
        { top: '10%', left: '50%' },
        { top: '10%', left: '73%' },
    ];

    const renderIcons = (players: Player[], positions: { top: string, left: string }[], positionType: string) => {
        return positions.map((pos, index) => {
            const player = players[index] || null;
            return (
                <div key={index} onClick={() => handlePlayerClick(player)}>
                    <Icon player={player}  style={pos} />
                </div>
            );
        });
    };

    const handlePlayerClick = (player: Player | null) => {
        setSelectedPlayer(player);
        setShowConfirmation(true);
    };

    const handleConfirmRemove = () => {
        if (selectedPlayer) {
            removePlayer(selectedPlayer);
        }
        setShowConfirmation(false);
        setSelectedPlayer(null);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setSelectedPlayer(null);
    };

    return (
        <div className="squad">
            <img src={pitch} alt="Soccer Pitch" className="pitch" />
            {renderIcons(goalkeepers, gkPositions, 'GK')}
            {renderIcons(defenders, dfPositions, 'DF')}
            {renderIcons(midfielders, mfPositions, 'MF')}
            {renderIcons(forwards, fwPositions, 'FW')}
            {showConfirmation && (
                <>
                    <div className="backdrop" onClick={handleCancel}></div>
                    <div className="confirmation-message">
                        <p>{selectedPlayer ? `Remove ${selectedPlayer.name}?` : 'Empty position'}</p>
                        {selectedPlayer && (
                            <div>
                                <button className="confirm" onClick={handleConfirmRemove}>Confirm</button>
                                <button className="cancel" onClick={handleCancel}>Cancel</button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Squad;
