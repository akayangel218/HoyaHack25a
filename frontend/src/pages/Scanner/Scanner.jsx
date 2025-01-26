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

  // Function to categorize extracted text
  const categorizeText = (text) => {
    const lines = text.split("\n");

    let number = "";
    let name = "";
    let medicine = "";
    let dosage = "";
    let frequency = "";

    // Regular expressions for matching common patterns
    const numberRegex = /\b(?:prescription|rx)\s*(\d+)\b/i;
    const nameRegex = /\b(?:patient|name)\s*[:\-]?\s*([A-Za-z\s]+)\b/i;
    const dosageRegex = /\b(?:dosage|dose)\s*[:\-]?\s*(\d+(\s*mg|\s*ml)?)\b/i;
    const frequencyRegex = /\b(?:frequency|take)\s*[:\-]?\s*(\d+\s*(?:times|per)\s*(?:day|week))\b/i;
    const medicineRegex = /\b(?:medicine|drug)\s*[:\-]?\s*([A-Za-z\s]+(?:\s*\d+)?(?:\s*[A-Za-z]+)*)\b/i;

    lines.forEach((line) => {
      if (numberRegex.test(line)) {
        number = line.match(numberRegex)[1];
      } else if (nameRegex.test(line)) {
        name = line.match(nameRegex)[1];
      } else if (dosageRegex.test(line)) {
        dosage = line.match(dosageRegex)[1];
      } else if (frequencyRegex.test(line)) {
        frequency = line.match(frequencyRegex)[1];
      } else if (medicineRegex.test(line)) {
        medicine = line.match(medicineRegex)[1];
      }
    });

    return {
      number,
      name,
      medicine,
      dosage,
      frequency,
    };
  };

  // Handle the OCR scan
  async function handleOCRScan() {
    if (image) {
      setLoading(true);
      const recognized = await Tesseract.recognize(image, "eng", {
        logger: (info) => console.log(info), // Optional: Log progress
      })
      const text = await recognized.data.text
        // .then(({ data: { text } }) => {
      const categorizedData = categorizeText(text);
      //   //   console.log(categorizedData); // Log the categorized data

          // Now send the data to the backend to store in the database
          const formData = new FormData();
          formData.append('json', JSON.stringify(categorizedData));
          const response = await fetch("http://10.150.237.146:5000/scan", {
            method: "POST",
            body: formData,
          })
          const result  = await response.json()
            .then((data) => {
              console.log("Data saved:", data);
            })
            .catch((error) => {
              console.error("Error saving data:", error);
            });

          setLoading(false);
    }
  };

  // Handle the file upload
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