# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS  # Import the CORS package
from supabase import create_client, Client
import subprocess
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Supabase client
SUPABASE_URL = 'https://ixfqzcmehjwszhgpavua.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZnF6Y21laGp3c3poZ3BhdnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NzU3MTMsImV4cCI6MjAzMjU1MTcxM30.oJ7b7A5m0rSOiBTHslpEQWwduvlhdmQ3gBYxR5TOVR4'
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Get the base directory of the Flask app
base_dir = os.path.abspath(os.path.dirname(__file__))

# Define paths relative to the base directory

# Transfer Optimiser Script
transfer_optimiser_script = os.path.join(
    base_dir, "scripts", "transferOptimiser.py")
transfer_optimiser_data_dir = os.path.join(base_dir, "data")
transfer_optimiser_data_file_path = os.path.join(
    transfer_optimiser_data_dir, 'user_transfer_info.json')

# Lineup Optimiser Script
lineup_optimiser_script_file = os.path.join(
    base_dir, "scripts", "transferOptimiser.py")
lineup_optimiser_data_dir = os.path.join(base_dir, "data")
lineup_optimiser_data_file_path = os.path.join(
    lineup_optimiser_data_dir, 'user_lineup.json')

# Define root URL route


@app.route('/')
def index():
    return "Welcome to OptiFooty!"


@app.route('/run-transferOptimiser-script', methods=['POST'])
def run_transferOptimiser_script():
    try:
        data = request.json
        user_lineup = data.get('userLineup', [])
        number_of_transfers = data.get('numberOfTransfers', 1)
        selected_players_for_transfer = data.get('selectedPlayerNames', [])

        print(f"Received data: {data}")

        with open(transfer_optimiser_data_file_path, 'w') as f:
            json.dump(data, f)

        result = subprocess.run(['python', transfer_optimiser_script],
                                capture_output=True, text=True)
        print(f"Subprocess result: {result.stdout}")
        print(f"Subprocess error (if any): {result.stderr}")

        # Extract JSON part from the output
        output_lines = result.stdout.split('\n')
        json_output = next(
            (line for line in output_lines if line.startswith('{"transfers":')), '{}')

        print(f"JSON Output: {json_output}")

        return jsonify(json.loads(json_output))
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
