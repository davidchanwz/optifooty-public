# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client, Client
import subprocess
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize Supabase client
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

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
lineup_optimiser_script = os.path.join(
    base_dir, "scripts", "lineupOptimiser.py")
lineup_optimiser_data_dir = os.path.join(base_dir, "data")
lineup_optimiser_data_file_path = os.path.join(
    lineup_optimiser_data_dir, 'user_lineup.json')


@app.route('/')
def index():
    return "Welcome to OptiFooty!"


@app.route('/run-transferOptimiser-script', methods=['POST'])
def run_transferOptimiser_script():
    try:
        data = request.json

        print(f"Received data: {data}")

        with open(transfer_optimiser_data_file_path, 'w') as f:
            json.dump(data, f)

        result = subprocess.run(
            ['python', transfer_optimiser_script], capture_output=True, text=True)
        print(f"Subprocess result: {result.stdout}")
        print(f"Subprocess error (if any): {result.stderr}")

        output_lines = result.stdout.split('\n')
        json_output = next(
            (line for line in output_lines if line.startswith('{"transfers":')), '{}')

        print(f"JSON Output: {json_output}")

        return jsonify(json.loads(json_output))
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)})


@app.route('/run-lineupOptimiser-script', methods=['POST'])
def run_lineupOptimiser_script():
    try:
        data = request.json
        print(f"Received data: {data}")  # Debugging statement
        with open(lineup_optimiser_data_file_path, 'w') as f:
            json.dump(data, f)

        result = subprocess.run(
            ['python', lineup_optimiser_script], capture_output=True, text=True)
        print(f"Subprocess result: {result.stdout}")  # Debugging statement
        # Debugging statement
        print(f"Subprocess error (if any): {result.stderr}")

        output_lines = result.stdout.split('\n')
        json_output = next(
            (line for line in output_lines if line.startswith('{"lineup_info":')), '{}')

        return jsonify(json.loads(json_output))
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': str(e)})


if __name__ == '__main__':
    app.run(debug=True)