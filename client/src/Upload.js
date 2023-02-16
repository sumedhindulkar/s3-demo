import React, { useState } from "react";
import axios from "axios";
const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const handleFileInput = (e) => {
    console.log(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  const uploadFile = async (file) => {
    const { data } = await axios.get("/api/s3-url");
    const url = data.URL;

    // const res = await fetch("/api/s3-url");
    // const response = await res.json();
    // const { url } = response;
    // console.log(data);
    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
    const imageUrl = url.split("?")[0];
    setImageLink(imageUrl);
  };
  return (
    <div>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <br></br>
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      <img src={imageLink} alt="" />
    </div>
  );
};

export default Upload;
