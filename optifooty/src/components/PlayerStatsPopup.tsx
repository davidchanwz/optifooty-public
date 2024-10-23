import React from 'react';
import { PlayerStats } from '../types';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './PlayerStatsPopup.css';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface PlayerStatsPopupProps {
    player: PlayerStats;
    onClose: () => void;
}

const PlayerStatsPopup: React.FC<PlayerStatsPopupProps> = ({ player, onClose }) => {
    const formatValue = (value: any) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            return numValue.toFixed(2); // Round to 2 decimal places if value is a number
        }
        return value;
    };

    const isDarkMode = document.body.classList.contains('dark-mode');

    const pointsStats = {
        labels: [
            'Points This Week', 
            'Points per Million', 
            'Bonus Points'
        ],
        datasets: [
            {
                label: 'Points Stats',
                data: [
                    player.percentile_total_points_this_week,
                    player.percentile_points_per_million,
                    player.percentile_avg_bps
                ],
                backgroundColor: isDarkMode ? 'rgba(255, 206, 86, 0.2)' : 'rgba(255, 206, 86, 0.2)',
                borderColor: isDarkMode ? 'rgba(255, 206, 86, 1)' : 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }
        ]
    };

    const attackStats = {
        labels: [
            'Goals Scored per 90', 
            'Goals Scored', 
            'Expected Goals per 90', 
            'Shots per 90', 
            'Assists per 90', 
            'Expected Assists per 90', 
            'Key Passes per 90', 
            'xGChain per 90', 
            'xGBuildup per 90'
        ],
        datasets: [
            {
                label: 'Attack Stats',
                data: [
                    player.percentile_total_goals_scored_per_90,
                    player.percentile_total_goals_scored,
                    player.percentile_total_expected_goals_per_90,
                    player.percentile_shots_per_90,
                    player.percentile_total_assists_per_90,
                    player.percentile_total_expected_assists_per_90,
                    player.percentile_key_passes_per_90,
                    player.percentile_xGChain_per_90,
                    player.percentile_xGBuildup_per_90
                ],
                backgroundColor: isDarkMode ? 'rgba(255, 99, 132, 0.2)' : 'rgba(255, 99, 132, 0.2)',
                borderColor: isDarkMode ? 'rgba(255, 99, 132, 1)' : 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const defenceStats = {
        labels: [
            'Saves', 
            'Average Saves', 
            'Penalties Saved', 
            'Clean Sheets'
        ],
        datasets: [
            {
                label: 'Defence Stats',
                data: [
                    player.percentile_total_saves,
                    player.percentile_avg_saves,
                    player.percentile_total_penalties_saved,
                    player.percentile_total_clean_sheets
                ],
                backgroundColor: isDarkMode ? 'rgba(75, 192, 192, 0.2)' : 'rgba(75, 192, 192, 0.2)',
                borderColor: isDarkMode ? 'rgba(75, 192, 192, 1)' : 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
    };

    const options = {
        scales: {
            r: {
                grid: {
                    color: isDarkMode ? '#777' : '#ccc',
                },
                angleLines: {
                    color: isDarkMode ? '#777' : '#ccc',
                },
                pointLabels: {
                    color: isDarkMode ? '#fff' : '#000',
                },
                ticks: {
                    stepSize: 0.2,
                    backdropColor: isDarkMode ? '#333' : '#fff',
                    color: isDarkMode ? '#fff' : '#000',
                },
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: isDarkMode ? '#fff' : '#000',
                }
            }
        }
    };

    return (
        <div className="player-stats-popup" onClick={onClose}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                <div className="popup-header">
                    <h2>{player.player_name} - {player.position} - {player.team}</h2>
                    <button className="close-button" onClick={onClose}>×</button>
                </div>
                <div className="stats-details">
                    <Radar data={pointsStats} options={options} />
                    <Radar data={attackStats} options={options} />
                    <Radar data={defenceStats} options={options} />
                </div>
            </div>
        </div>
    );
};

export default PlayerStatsPopup;