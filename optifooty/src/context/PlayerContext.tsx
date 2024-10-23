import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Player } from '../types';
import supabase from '../client'; // Import the Supabase client

interface PlayerContextType {
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [players, setPlayers] = useState<Player[]>([]);

    useEffect(() => {
        const fetchPlayersAndTeams = async () => {
            console.log("Fetching players and teams data from Supabase...");

            const { data: playersData, error: playersError, status: playersStatus } = await supabase.from('players').select('*');
            console.log("Fetch players response:", playersStatus, playersData, playersError);

            const { data: teamsData, error: teamsError, status: teamsStatus } = await supabase.from('teams').select('*');
            console.log("Fetch teams response:", teamsStatus, teamsData, teamsError);

            if (playersError) {
                console.error('Error fetching players:', playersError);
                return;
            }

            if (teamsError) {
                console.error('Error fetching teams:', teamsError);
                return;
            }

            console.log("Players data fetched:", playersData);
            console.log("Teams data fetched:", teamsData);

            if (playersData && teamsData) {
                // Map team data to players
                const playersWithTeamData = playersData.map((player) => {
                    const team = teamsData.find((team) => team.id === player.team);
                    return {
                        ...player,
                        teamName: team?.name || 'Unknown Team',
                        clubColor: team?.color || 'grey',
                    };
                });

                console.log("Players with team data:", playersWithTeamData);
                setPlayers(playersWithTeamData);
            }
        };

        fetchPlayersAndTeams();
    }, []);

    return (
        <PlayerContext.Provider value={{ players, setPlayers }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = (): PlayerContextType => {
    const context = useContext(PlayerContext);
    if (context === undefined) {
        throw new Error('usePlayerContext must be used within a PlayerProvider');
    }
    return context;
};