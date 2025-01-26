import React, { useState } from "react";
import * as tf from '@tensorflow/tfjs';

const ChengModel = () => {
  const [image, setImage] = useState(null);
  const [chengClassification, setChengClassification] = useState("");

  async function handleImageUpload(event) {
    const file = event.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);

    fetch('https://hoyahacks25backend.onrender.com/chengml/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      console.log(data.predicted_class);
      
      const diseaseDictionary = {
        "0": "Actinic keratosis",
        "1": "Basal cell carcinoma",
        "2": "Benign keratosis",
        "3": "Dermatofibroma",
        "4": "Melanocytic nevus",
        "5": "Melanoma",
        "6": "Squamous cell carcinoma",
        "7": "Vascular lesion"
      };

      setChengClassification(diseaseDictionary[data.predicted_class])

    })
    .catch(error => {
      // Handle any errors
      console.error(error);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Upload an Image for Cheng's Brilliant Model</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-4"
        />
        {image && (
          <div className="mt-4">
            <p className="text-center text-gray-500 mb-2">Preview:</p>
            <img
              src={image}
              alt="Uploaded Preview"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        )}
        <h1>Chengs Classification is: -- {chengClassification}</h1>
      </div>
    </div>
  );
};

export default ChengModel;
