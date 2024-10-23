// StatsList.tsx

import React, { useEffect, useState } from 'react';
import { PlayerStats } from '../types';
import PlayerStatsItem from './PlayerStatsItem';
import Pagination from './Pagination';
import PlayerStatsFilter from './PlayerStatsFilter';
import SearchBar from './SearchBar';
import supabase from '../client';
import './StatsList.css'; // Create and import a CSS file for styling
import { usePlayerComparisonContext } from '../context/PlayerComparisonContext'; // Import the comparison context

interface StatsListProps {
    playerStats: PlayerStats[];
    onPlayerClick: (player: PlayerStats) => void;
}

const StatsList: React.FC<StatsListProps> = ({ playerStats, onPlayerClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [teamFilter, setTeamFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [teams, setTeams] = useState<{ [key: string]: string }>({});
    const playersPerPage = 13;
    const { comparisonList, addToComparison, removeFromComparison, clearComparison, errorMessage, clearError } = usePlayerComparisonContext();

    useEffect(() => {
        const fetchTeams = async () => {
            const { data: teamsData, error } = await supabase.from('teams').select('name, color');
            if (error) {
                console.error('Error fetching teams:', error);
                return;
            }

            const teamsMap: { [key: string]: string } = {};
            teamsData.forEach((team: { name: string, color: string }) => {
                teamsMap[team.name] = team.color;
            });

            setTeams(teamsMap);
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, teamFilter, positionFilter]);

    const handleCompareClick = (player: PlayerStats) => {
        const isPlayerInComparisonList = !!comparisonList.find(p => p.player_name === player.player_name);
        console.log(`Is player (${player.player_name}) in comparison list:`, isPlayerInComparisonList);
        comparisonList.forEach(p => console.log(`Comparing IDs: ${p.player_name} === ${player.player_name}`));
        if (isPlayerInComparisonList) {
            console.log('Removing from comparison:', player.player_name);
            removeFromComparison(player);
        } else {
            console.log('Adding to comparison:', player.player_name);
            addToComparison(player);
        }
        console.log('Updated comparison list:', comparisonList);
    };


    useEffect(() => {
        console.log('Updated comparison list:', comparisonList);
    }, [comparisonList]);

    const filteredPlayers = playerStats.filter((player) => {
        return (
            (teamFilter === '' || player.team === teamFilter) &&
            (positionFilter === '' || player.position === positionFilter) &&
            (searchQuery === '' || player.player_name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    });

    const indexOfLastPlayer = currentPage * playersPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
    const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

    return (
        <div className="statslist-container">
            <SearchBar setSearchQuery={setSearchQuery} />
            <PlayerStatsFilter
                setTeamFilter={setTeamFilter}
                setPositionFilter={setPositionFilter}
                teams={Object.keys(teams).map((key, index) => ({ id: index, name: key }))}
            />
            <div className="player-list">
                {currentPlayers.map((player) => (
                    <PlayerStatsItem
                        key={player.player_name}
                        player={player}
                        onPlayerClick={onPlayerClick}
                        onCompareClick={handleCompareClick}
                        isSelected={comparisonList.includes(player)}
                        teamColor={teams[player.team]}
                    />
                ))}
            </div>
            <Pagination
                totalPlayers={filteredPlayers.length}
                playersPerPage={playersPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default StatsList;