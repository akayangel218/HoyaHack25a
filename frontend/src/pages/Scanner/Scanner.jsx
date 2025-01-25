import React, { useState } from "react";

const ImageUpload = () => {
    const [image, setImage] = useState(null);
  
    // Handle the file change
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file)); // For preview
      }
    };
  
    // Handle the form submission (for uploading to a server)
    const handleUpload = () => {
      const formData = new FormData();
      formData.append("image", image); // assuming the key is 'image'
  
      // Replace with your API endpoint
      fetch('https://your-upload-endpoint.com/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Upload successful', data);
        })
        .catch((error) => {
          console.error('Upload failed', error);
        });
    };
  
    return (
      <div>
        <input type="file" onChange={handleImageChange} />
        {image && <img src={image} alt="Preview" width="100" />}
        <button onClick={handleUpload}>Upload Image</button>
      </div>
    );
  };

  



export default Scanner;