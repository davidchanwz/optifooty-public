import json
import os
import pandas as pd
from pulp import *

data_file_path = os.path.join(os.path.dirname(
    __file__), 'user_transfer_info.json')

# Read data from the file or process it as needed
with open(data_file_path, 'r') as f:
    data = json.load(f)

initial_lineup = data.get('userLineup', [])
number_of_transfers = data.get('numberOfTransfers', 1)
selected_players_for_transfer = data.get('selectedPlayerNames', [])

# Get the current script directory
script_dir = os.path.dirname(os.path.abspath(__file__))

# Construct the absolute path to the CSV file
csv_file_path = os.path.join(
    script_dir, "..", "..", "model", "stanley", "combined.csv")

df = pd.read_csv(csv_file_path)

# df from combined.csv
#df = pd.read_csv("OptiFooty/model/stanley/combined.csv")

# Create a mapping from player names to indices
name_to_index = {row['player_name']: idx for idx, row in df.iterrows()}

# Convert the initial lineup from names to indices
initial_lineup_indices = [name_to_index[name] for name in initial_lineup]

# value_limit
value_limit = 100

max_swaps = number_of_transfers

must_transfer_out = selected_players_for_transfer

k = 1


def find_optimal_squad(combined_df, initial_lineup_indices, value_limit, max_swaps, must_transfer_out, k):
    top_solutions = []
    total_value_limit = value_limit  # Example value limit
    # Number of players in the lineup
    total_transfers = 15

    # Create a reverse mapping from indices to player names
    index_to_name = {v: k for k, v in {
        row['player_name']: idx for idx, row in combined_df.iterrows()}.items()}

    for _ in range(k):
        # Define the linear programming problem
        prob = LpProblem("Maximize_Team_Points", LpMaximize)

        # Define decision variables
        player_vars = LpVariable.dicts(
            "Player", combined_df.index, cat='Binary')

        # Objective Function: Maximize total team points
        prob += lpSum([combined_df.loc[i, 'predicted_points'] * player_vars[i]
                      for i in combined_df.index]), "Total_Team_Points"

        # Constraints:
        prob += lpSum([combined_df.loc[i, 'value'] * player_vars[i]
                      for i in combined_df.index]) <= total_value_limit, "Total_Value_Limit"
        prob += lpSum([player_vars[i] for i in combined_df.index]
                      ) == total_transfers, "Total_Transfers_Limit"

        # Constraint to ensure the number of swaps does not exceed max_swaps
        prob += lpSum([1 - player_vars[i]
                      for i in initial_lineup_indices]) <= max_swaps, "Max_Swaps_Limit"

        # Constraint to limit the number of players from the same team to 3
        teams = combined_df['team'].unique()
        for team in teams:
            team_indices = combined_df[combined_df['team'] == team].index
            prob += lpSum([player_vars[i] for i in team_indices]
                          ) <= 3, f"Max_3_Players_From_Team_{team}"

        # Constraints for the number of players in each position
        position_limits = {
            "GK": 2,
            "DEF": 5,
            "MID": 5,
            "FWD": 3
        }

        for position, limit in position_limits.items():
            position_indices = combined_df[combined_df['position']
                                           == position].index
            prob += lpSum([player_vars[i] for i in position_indices]
                          ) == limit, f"Position_Limit_{position}"

        # Add constraint to exclude must_transfer_out players
        transfer_out_indices = combined_df[combined_df['player_name'].isin(
            must_transfer_out)].index
        for i in transfer_out_indices:
            prob += player_vars[i] == 0, f"Exclude_Player_{i}"

        # Add constraints to exclude previous solutions
        for sol in top_solutions:
            prob += lpSum([player_vars[i] for i in sol]) <= total_transfers - 1

        # Solve the problem
        prob.solve()

        # Check the status of the solution
        if LpStatus[prob.status] != 'Optimal':
            break

        # Retrieve the solution
        current_solution = [
            i for i in combined_df.index if player_vars[i].varValue == 1]
        top_solutions.append(current_solution)

    # Map the solution indices back to player names and predicted points
    optimal_squads = [
        [{"name": index_to_name[idx], "predicted_points": combined_df.loc[idx,
                                                                          'predicted_points']} for idx in sol]
        for sol in top_solutions
    ]

    return optimal_squads


# Find the top 5 solutions
optimal_15 = find_optimal_squad(
    df, initial_lineup_indices, value_limit, max_swaps, must_transfer_out, k)

#result_json = json.dumps({"optimal_squad": optimal_15[0]})
# print(result_json)


def get_transfer_details(initial_lineup, optimal_squad):
    transfer_details = []

    # Create a set for quick lookup
    initial_set = set(initial_lineup)

    # Find transferred out players
    transferred_out = [player for player in initial_lineup if player not in optimal_squad]

    # Find transferred in players
    transferred_in = [player for player in optimal_squad if player not in initial_set]

    # Create a mapping from player names to their predicted points
    name_to_points = {row['player_name']: row['predicted_points'] for idx, row in df.iterrows()}

    # Handle cases where the number of transferred out players is less than transferred in players
    for i in range(max(len(transferred_out), len(transferred_in))):
        out_player = transferred_out[i] if i < len(transferred_out) else ""
        in_player = transferred_in[i] if i < len(transferred_in) else ""

        transfer_details.append([
            {
                "Transferred Out": {
                    "player_name": out_player if out_player in name_to_points else "",
                    "predicted_points": name_to_points.get(out_player, "")
                }
            },
            {
                "Transferred In": {
                    "player_name": in_player if in_player in name_to_points else "",
                    "predicted_points": name_to_points.get(in_player, "")
                }
            }
        ])

    return transfer_details

# Assuming optimal_squad is the first solution in optimal_15
optimal_squad = [player['name'] for player in optimal_15[0]]
transfer_details = get_transfer_details(initial_lineup, optimal_squad)

result_json = json.dumps({"transfers": transfer_details})
print(result_json)

