import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { storage } from "./data";
const Firebase = () => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => {
            setImage(url);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
    setProgress(progress);
  };
  return (
    <div>
      <form onSubmit={formHandler}>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>
      <hr />
      {image && <img src={image} alt="uploaded" />}
    </div>
  );
};

export default Firebase;
