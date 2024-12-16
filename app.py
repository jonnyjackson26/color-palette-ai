from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv

app = Flask(__name__, static_folder="dist", static_url_path="")
CORS(app)



# Load API key from environment variable
load_dotenv()  # Load environment variables from .env file
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise ValueError("OpenAI API Key not found. Set it in your environment variables.")

# Function to get response from GPT
def get_chatGPT_response(user_message):
    client = OpenAI(api_key=api_key)

    # Build the GPT prompt
    prompt = f"Create a color palette with 5 hex color codes that reminds me of {user_message}. Output only the hex codes separated by spaces."
    
    # Call the OpenAI API
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # Use your model
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

@app.route("/generate-palette", methods=["POST"])
def generate_palette():
    try:
        data = request.json
        user_input = data.get("query")

        if not user_input:
            return jsonify({"error": "No input provided"}), 400

        # Get the response from ChatGPT
        gpt_response = get_chatGPT_response(user_input)
        hex_codes = [code for code in gpt_response.split() if code.startswith("#")]

        # Ensure exactly 5 hex codes
        if len(hex_codes) != 5:
            return jsonify({"error": "Invalid response from OpenAI"}), 500

        return jsonify({"palette": hex_codes})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Serve React frontend
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")
if __name__ == "__main__":
    app.run(debug=True)