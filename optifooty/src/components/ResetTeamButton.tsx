// src/components/ResetTeamButton.tsx

import React from 'react';
import { useUserTeamContext } from '../context/UserTeamContext';
import './ResetTeamButton.css';

const ResetTeamButton: React.FC = () => {
    const { resetTeam } = useUserTeamContext();

    const handleReset = () => {
        if (window.confirm('Are you sure you want to reset your team?')) {
            resetTeam();
        }
    };

    return (
        <button onClick={handleReset} className="reset-team-button">
            Reset Team
        </button>
    );
};

export default ResetTeamButton;