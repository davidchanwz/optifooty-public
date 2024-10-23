// PlayerStatsFilter.tsx

import React, { ChangeEvent, useState, useEffect } from 'react';
import './PlayerStatsFilter.css';

interface PlayerStatsFilterProps {
    setTeamFilter: (team: string) => void;
    setPositionFilter: (position: string) => void;
    teams: { id: number; name: string }[]; // Accept teams as a prop
}

const PlayerStatsFilter: React.FC<PlayerStatsFilterProps> = ({ setTeamFilter, setPositionFilter, teams }) => {
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedPosition, setSelectedPosition] = useState('');

    useEffect(() => {
        setTeamFilter(selectedTeam);
    }, [selectedTeam, setTeamFilter]);

    useEffect(() => {
        setPositionFilter(selectedPosition);
    }, [selectedPosition, setPositionFilter]);

    const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedTeam(event.target.value);
    };

    const handlePositionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedPosition(event.target.value);
    };

    const resetFilters = () => {
        setSelectedTeam('');
        setSelectedPosition('');
    };

    return (
        <div className="player-stats-filter">
            <select value={selectedTeam} onChange={handleTeamChange}>
                <option value="">All Teams</option>
                {teams.map((team) => (
                    <option key={team.id} value={team.name}>
                        {team.name}
                    </option>
                ))}
            </select>
            <select value={selectedPosition} onChange={handlePositionChange}>
                <option value="">All Positions</option>
                <option value="GK">GK</option>
                <option value="DEF">DEF</option>
                <option value="MID">MID</option>
                <option value="FWD">FWD</option>
            </select>
            <button onClick={resetFilters} className="reset-button">
                Reset Filters
            </button>
        </div>
    );
};

export default PlayerStatsFilter;