import React, { useState } from 'react';
import { usePlayerStatsContext } from '../context/PlayerStatsContext';
import { PlayerComparisonProvider } from '../context/PlayerComparisonContext';
import './Stats.css'; // Ensure to create this CSS file
import { PlayerStats } from '../types';
import PlayerStatsPopup from '../components/PlayerStatsPopup'; // Import PlayerStatsPopup component
import StatsList from '../components/StatsList'; // Import the new StatsList component
import PlayerComparison from '../components/PlayerComparison'; // Import the PlayerComparison component

const Stats: React.FC = () => {
    const { playerStats } = usePlayerStatsContext();
    const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);
    const [activeTab, setActiveTab] = useState('stats');

    const handlePlayerClick = (player: PlayerStats) => {
        setSelectedPlayer(player);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <PlayerComparisonProvider>
            <div className="stats-container">
                <div className="tabs">
                    <button className={`tab ${activeTab === 'stats' ? 'active' : ''}`} onClick={() => handleTabClick('stats')}>
                        Stats
                    </button>
                    <button className={`tab ${activeTab === 'comparison' ? 'active' : ''}`} onClick={() => handleTabClick('comparison')}>
                        Comparison
                    </button>
                </div>
                {activeTab === 'stats' && (
                    <StatsList
                        playerStats={playerStats}
                        onPlayerClick={handlePlayerClick}
                    />
                )}
                {activeTab === 'comparison' && (
                    <PlayerComparison />
                )}
                {selectedPlayer && (
                    <PlayerStatsPopup player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
                )}
            </div>
        </PlayerComparisonProvider>
    );
};

export default Stats;