import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
function UploadFromFrontend() {
  const [file, setFile] = useState(null);

  const handleFileInput = (e) => {
    const newFile = e.target.files[0];
    console.log(newFile);
    setFile(newFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:8000/api/s3url", file);
      console.log(data.URL);
      const newURL = data.URL;
      // const result = await axios(data.URL, {
      //   method: "PUT",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   data: file,
      // });
      // const imageUrl = data.url.split("?")[0];
      // console.log(imageUrl);

      await fetch(newURL, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: file,
      });
      console.log("=============================");
    } catch (err) {
      console.log("SENDING DATA FAILED: " + err);
    }
  };
  return (
    <>
      <h1>FROM FRONTEND</h1>
      <br />
      <form className="app" onSubmit={handleSubmit}>
        <input
          name="file"
          type="file"
          onChange={handleFileInput}
          // accept="image/*"
        />
        <button type="submit">SUBMIT</button>
      </form>
    </>
  );
}

export default UploadFromFrontend;
