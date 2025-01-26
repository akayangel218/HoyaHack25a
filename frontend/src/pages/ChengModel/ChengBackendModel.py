import tensorflow as tf
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import numpy as np
import io

# Load the trained model
model = tf.keras.models.load_model('resnetv2_skin_disease_model_2.h5')

# Create Flask app
app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

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

if __name__ == '__main__':
    app.run(debug=True)
