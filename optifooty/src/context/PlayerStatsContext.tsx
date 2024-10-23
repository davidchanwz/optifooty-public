import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import supabase from '../client';
import { PlayerStats } from '../types';

interface PlayerStatsContextType {
    playerStats: PlayerStats[];
}

interface PlayerStatsProviderProps {
    children: ReactNode;
}

const PlayerStatsContext = createContext<PlayerStatsContextType | undefined>(undefined);

export const PlayerStatsProvider: React.FC<PlayerStatsProviderProps> = ({ children }) => {
    const [playerStats, setPlayerStats] = useState<PlayerStats[]>([]);

    useEffect(() => {
        const fetchPlayerStats = async () => {
            const { data, error } = await supabase.from('player_stats_new').select('*');
            if (error) {
                console.error('Error fetching player stats:', error);
                return;
            }
            setPlayerStats(data);
        };

        fetchPlayerStats();
    }, []);

    return (
        <PlayerStatsContext.Provider value={{ playerStats }}>
            {children}
        </PlayerStatsContext.Provider>
    );
};

export const usePlayerStatsContext = (): PlayerStatsContextType => {
    const context = useContext(PlayerStatsContext);
    if (!context) {
        throw new Error('usePlayerStatsContext must be used within a PlayerStatsProvider');
    }
    return context;
};