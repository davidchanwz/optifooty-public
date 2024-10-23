import React, { useEffect, useState } from 'react';
import { usePlayerComparisonContext } from '../context/PlayerComparisonContext';
import { Radar } from 'react-chartjs-2';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import './PlayerComparison.css';

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PlayerComparison: React.FC = () => {
    const { comparisonList, clearComparison } = usePlayerComparisonContext();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const bodyClass = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        setTheme(bodyClass);
    }, []);

    if (comparisonList.length !== 2) {
        return <p>Select exactly two players to compare.</p>;
    }

    const [player1, player2] = comparisonList;

    const getRadarData = (categories: string[], labels: string[], player1: any, player2: any) => {
        return {
            labels: labels,
            datasets: [
                {
                    label: player1.player_name,
                    data: categories.map(category => parseFloat(player1[category])),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                },
                {
                    label: player2.player_name,
                    data: categories.map(category => parseFloat(player2[category])),
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                }
            ]
        };
    };

    const radarOptions = {
        scales: {
            r: {
                grid: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                angleLines: {
                    color: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                },
                ticks: {
                    stepSize: 0.2,
                    backdropColor: 'rgba(0, 0, 0, 0)',
                    color: theme === 'dark' ? 'white' : 'black',
                },
                pointLabels: {
                    color: theme === 'dark' ? 'white' : 'black',
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: theme === 'dark' ? 'white' : 'black',
                },
            },
        },

        elements: {
            arc: {
                backgroundColor: theme === 'dark' ? '#333' : '#fff',
            },
        },
    };

    const pointsCategories = [
        'percentile_total_points_this_week',
        'percentile_points_per_million',
        'percentile_avg_bps'
    ];
    const pointsLabels = [
        'Points This Week',
        'Points per Million',
        'Bonus Points'
    ];

    const attackCategories = [
        'percentile_total_goals_scored_per_90',
        'percentile_total_goals_scored',
        'percentile_total_expected_goals_per_90',
        'percentile_shots_per_90',
        'percentile_total_assists_per_90',
        'percentile_total_expected_assists_per_90',
        'percentile_key_passes_per_90',
        'percentile_xGChain_per_90',
        'percentile_xGBuildup_per_90'
    ];
    const attackLabels = [
        'Goals Scored/90',
        'Goals Scored',
        'Expected Goals/90',
        'Shots/90',
        'Assists/90',
        'Expected Assists/90',
        'Key Passes/90',
        'xGChain/90',
        'xGBuildup/90'
    ];

    const defenceCategories = [
        'percentile_total_saves',
        'percentile_avg_saves',
        'percentile_total_penalties_saved',
        'percentile_total_clean_sheets'
    ];
    const defenceLabels = [
        'Saves',
        'Average Saves',
        'Penalties Saved',
        'Clean Sheets'
    ];

    return (
        <div className="player-comparison">
            <div className="comparison-controls">
                <button className="clearcompare-button" onClick={clearComparison}>Clear Comparison</button>
            </div>
            <div className="comparison-content">
                <div className="comparison-header">
                    <div className="playercompare-name">{player1.player_name} - {player1.position}, {player1.team}</div>
                    <div className="playercompare-name">{player2.player_name} - {player2.position}, {player2.team}</div>
                </div>
                <div className="radar-chart">
                    <h3>Points Comparison</h3>
                    <Radar data={getRadarData(pointsCategories, pointsLabels, player1, player2)} options={radarOptions} />
                </div>
                <div className="radar-chart">
                    <h3>Attack Comparison</h3>
                    <Radar data={getRadarData(attackCategories, attackLabels, player1, player2)} options={radarOptions} />
                </div>
                <div className="radar-chart">
                    <h3>Defence Comparison</h3>
                    <Radar data={getRadarData(defenceCategories, defenceLabels, player1, player2)} options={radarOptions} />
                </div>
            </div>
        </div>
    );
};

export default PlayerComparison;