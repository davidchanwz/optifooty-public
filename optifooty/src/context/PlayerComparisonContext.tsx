import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PlayerStats } from '../types';

interface PlayerComparisonContextType {
    comparisonList: PlayerStats[];
    addToComparison: (player: PlayerStats) => void;
    removeFromComparison: (player: PlayerStats) => void;
    clearComparison: () => void;
    errorMessage: string | null;
    clearError: () => void;


}

const PlayerComparisonContext = createContext<PlayerComparisonContextType | undefined>(undefined);

export const PlayerComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [comparisonList, setComparisonList] = useState<PlayerStats[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    const addToComparison = (player: PlayerStats) => {
        console.log('Previous List (before adding):', comparisonList);
        setComparisonList((prevList) => {
            if (prevList.length >= 2) {
                alert('You can only compare up to 2 players.');
                return prevList;
            }
            if (prevList.find(p => p.player_name === player.player_name)) return prevList;
            const newList = [...prevList, player];
            console.log('New List (after adding):', newList);
            return newList;
        });
    };

    const removeFromComparison = (player: PlayerStats) => {
        setComparisonList((prevList) => {
            console.log('Previous List (before removing):', prevList);
            const newList = prevList.filter((p) => p.player_name !== player.player_name);
            console.log('New List (after removing):', newList);
            return newList;
        });
    };

    const clearComparison = () => {
        setComparisonList([]);
    };

    const clearError = () => {
        setErrorMessage(null);
    };

    return (
        <PlayerComparisonContext.Provider value={{ errorMessage, clearError, comparisonList, addToComparison, removeFromComparison, clearComparison }}>
            {children}
        </PlayerComparisonContext.Provider>
    );
};

export const usePlayerComparisonContext = () => {
    const context = useContext(PlayerComparisonContext);
    if (!context) {
        throw new Error('usePlayerComparisonContext must be used within a PlayerComparisonProvider');
    }
    return context;
};