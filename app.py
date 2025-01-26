import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import io
import os
import sqlite3

# Load the trained model
model = tf.keras.models.load_model('resnetv2_skin_disease_model_2.h5')

# Create Flask app
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, Render!"

@app.route('/chengml/upload', methods=['POST'])
def handle_post():
    if 'image' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    image = request.files['image']
    
    if image.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Open the image using Pillow
    img = Image.open(image.stream)

    # Resize the image to 224x224
    img = img.resize((224, 224))

    # Convert image to RGB (if not already in RGB)
    img_rgb = img.convert('RGB')

    # Convert image to numpy array
    img_array = np.array(img_rgb)

    # Normalize image if required (you can modify this depending on your model's requirement)
    img_array = img_array / 255.0  # Normalize to 0-1 if required

    # Reshape the image to (1, 224, 224, 3) to match the model input shape
    img_array = np.expand_dims(img_array, axis=0)

    # Get model prediction
    predictions = model.predict(img_array)

    # Get the predicted class (if model outputs probabilities, pick the index with the highest prob)
    predicted_class = np.argmax(predictions, axis=1)[0]  # Change this if needed based on your output

    # You can return the predicted class label as needed, for example:
    return jsonify({'predicted_class': str(predicted_class)}), 200

# Open the SQLite database
db_path = "databases/prescripts.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

# Create the prescripts table if it doesn't exist (you may already have this)
cursor.execute('''
    CREATE TABLE IF NOT EXISTS prescripts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        number TEXT NOT NULL,
        name TEXT NOT NULL,
        medicine TEXT NOT NULL,
        dosage TEXT NOT NULL,
        frequency TEXT NOT NULL
    )
''')
conn.commit()

@app.route("/scan", methods=["POST"])
def insert_data():
    print(request)
    request = request.files['json']
    data = request.get_json()
    number = data.get('number')
    name = data.get('name')
    medicine = data.get('medicine')
    dosage = data.get('dosage')
    frequency = data.get('frequency')

    # Prepare the SQL query to insert data
    sql = '''INSERT INTO prescripts (number, name, medicine, dosage, frequency) 
             VALUES (?, ?, ?, ?, ?)'''
    cursor.execute(sql, (number, name, medicine, dosage, frequency))
    conn.commit()

    return jsonify({
        'id': cursor.lastrowid,
        'number': number,
        'name': name,
        'medicine': medicine,
        'dosage': dosage,
        'frequency': frequency
    }), 201


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
