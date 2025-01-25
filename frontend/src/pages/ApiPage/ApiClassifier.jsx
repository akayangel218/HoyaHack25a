import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-semibold text-center mb-4">Upload an Image</h1>
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
      </div>
    </div>
  );
};

export default ImageUploader;
