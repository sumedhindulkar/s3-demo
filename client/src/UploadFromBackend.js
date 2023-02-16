import React, { useState } from "react";
import axios from "axios";
function UploadFromBackend() {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("This is Dummy Description");
  const handleFileInput = (e) => {
    const newFile = e.target.files[0];
    setFile(newFile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("description", description);

    try {
      const result = await axios.post(
        "http://localhost:8000/api/addImg",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
    } catch (err) {}
  };
  return (
    <>
      <h1>FROM BACKEND</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileInput} accept="image/*" />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UploadFromBackend;
