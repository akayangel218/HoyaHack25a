import React, { useState } from "react";
import Tesseract from "tesseract.js";

const Scanner = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle the file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // For preview
    }
  };

  // Handle the OCR scan
  const handleOCRScan = () => {
    if (image) {
      setLoading(true);
      Tesseract.recognize(image, "eng", {
        logger: (info) => console.log(info), // Optional: Log progress
      })
        .then(({ data: { text } }) => {
          setExtractedText(text);
          setLoading(false);
        })
        .catch((error) => {
          console.error("OCR failed:", error);
          setLoading(false);
        });
    }
  };

  // Handle the form submission (for uploading to a server)
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", image); // assuming the key is 'image'

    // Replace with your API endpoint
    fetch("https://your-upload-endpoint.com/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload successful", data);
      })
      .catch((error) => {
        console.error("Upload failed", error);
      });
  };

  return (
    <div>
      <h1>Image Scanner with OCR</h1>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && <img src={image} alt="Preview" width="100" />}
      <div style={{ margin: "20px 0" }}>
        <button onClick={handleUpload}>Upload Image</button>
        <button onClick={handleOCRScan} disabled={loading}>
          {loading ? "Scanning..." : "Scan for Text"}
        </button>
      </div>
      {extractedText && (
        <div>
          <h3>Extracted Text:</h3>
          <p>{extractedText}</p>
        </div>
      )}
    </div>
  );
};

export default Scanner;
