import json
import os
import pandas as pd
from pulp import *

script_dir = os.path.dirname(os.path.abspath(__file__))
data_file_path = os.path.join(
    script_dir, "..", "data", "user_lineup.json")

# Read data from the file or process it as needed
with open(data_file_path, 'r') as f:
    data = json.load(f)

initial_lineup = data.get('userLineup', [])

# Get the current script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the CSV file
csv_file_path = os.path.join(script_dir, "..", "data", "combined.csv")

df = pd.read_csv(csv_file_path)

# Create a mapping from player names to indices
name_to_index = {row['player_name']: idx for idx, row in df.iterrows()}

# Convert the initial lineup from names to indices
initial_lineup_indices = [name_to_index[name] for name in initial_lineup]

# Function to find best starting XI for the upcoming Gameweek


def find_starting_lineup(df, squad_list):
    # Filter the DataFrame to include only the players in the squad list
    squad_df = df[df['player_name'].isin(squad_list)]

    # Define the Problem
    prob = LpProblem("Find Optimal Starting XI", LpMaximize)

    # Create decision variables
    player_vars = LpVariable.dicts("Player", squad_df.index, cat='Binary')

    # Define the objective function: maximize the total predicted points for 11 players
    prob += lpSum([squad_df.loc[i, 'predicted_points'] * player_vars[i]
                  for i in squad_df.index]), "Total_Predicted_Points"

    # Add constraints for the total number of players
    prob += lpSum([player_vars[i] for i in squad_df.index]
                  ) == 11, "Total_Players_Constraint"

    # Add constraints for each position
    position_constraints = {
        "GK": (1, 1),  # Minimum 1 GK, Maximum 1 GK
        "DEF": (3, 5),  # Minimum 3 DEF, Maximum 5 DEF
        "MID": (2, 5),  # Minimum 2 MID, Maximum 5 MID
        "FWD": (1, 3)   # Minimum 1 FWD, Maximum 3 FWD
    }

    for position, (min_pos, max_pos) in position_constraints.items():
        position_indices = squad_df[squad_df['position'] == position].index
        prob += lpSum([player_vars[i] for i in position_indices]
                      ) >= min_pos, f"Min_{position}_Constraint"
        prob += lpSum([player_vars[i] for i in position_indices]
                      ) <= max_pos, f"Max_{position}_Constraint"

    # Solve the problem
    prob.solve()

    # Check the status of the solution
    if LpStatus[prob.status] != 'Optimal':
        raise ValueError("No optimal solution found.")

    # Retrieve the solution
    starting_lineup_indices = [
        i for i in squad_df.index if player_vars[i].varValue == 1]
    starting_lineup_names = [squad_df.loc[i, 'player_name']
                             for i in starting_lineup_indices]

    # Retrieve predicted points for the starting lineup
    starting_lineup_points = [squad_df.loc[i, 'predicted_points']
                              for i in starting_lineup_indices]

    # Determine the bench players
    bench_indices = [
        i for i in squad_df.index if i not in starting_lineup_indices]
    bench_names = [squad_df.loc[i, 'player_name'] for i in bench_indices]

    # Retrieve predicted points for the bench players
    bench_points = [squad_df.loc[i, 'predicted_points'] for i in bench_indices]

    # Calculate the formation
    def_count = sum(
        1 for i in starting_lineup_indices if squad_df.loc[i, 'position'] == 'DEF')
    mid_count = sum(
        1 for i in starting_lineup_indices if squad_df.loc[i, 'position'] == 'MID')
    fwd_count = sum(
        1 for i in starting_lineup_indices if squad_df.loc[i, 'position'] == 'FWD')
    formation = [def_count, mid_count, fwd_count]

    # Calculate the total points
    total_points = sum(squad_df.loc[i, 'predicted_points']
                       for i in starting_lineup_indices)

    return {
        "Starting_11": starting_lineup_names,
        "Bench": bench_names,
        "Formation": formation,
        "Total_Points": total_points,
        "Starting_11_Points": starting_lineup_points,
        "Bench_Points": bench_points
    }


# Example usage
starting_lineup_result = find_starting_lineup(df, initial_lineup)

result_json = json.dumps({"lineup_info": starting_lineup_result})
print(result_json)
