import React, { useState } from "react";

const ChengClassifier = () => {
  const [image, setImage] = useState(null);
  const [huggingClassification, setHuggingClassification] = useState("");

  async function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    huggingFaceQuery(file).then((response) => {
      console.log(JSON.stringify(response));
      console.log(response[0].label)
      setHuggingClassification(JSON.parse(JSON.stringify(response[0].label)))
    });
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
        <div>
          <h1>This is according to HuggingFace: -- {huggingClassification}</h1>
        </div>
      </div>
    </div>
  );
};


async function huggingFaceQuery(imageFile) {
    const data = imageFile
    const response = await fetch(
        "https://api-inference.huggingface.co/models/Anwarkh1/Skin_Cancer-Image_Classification",
        {
            headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: data,
        }
    );
    const result = await response.json();
    return result;
}

export default ChengClassifier;
