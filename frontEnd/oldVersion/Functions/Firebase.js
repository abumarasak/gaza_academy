import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCj1BjYiunxu4_QXYBM2XOgZU3L2WRy_-s",
  authDomain: "gaza-academy.firebaseapp.com",
  projectId: "gaza-academy",
  storageBucket: "gaza-academy.appspot.com",
  messagingSenderId: "52614663749",
  appId: "1:52614663749:web:57ef1318870c575bdbdd2c",
  measurementId: "G-VBMDNJXBZS",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFiles = (file) => {
  if (!file) return;
  const storageRef = ref(storage, `/files/${Date.now()}}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  uploadTask.on("state_changed", () => {
    getDownloadURL(uploadTask.snapshot.ref)
      .then((url) => {
        console.log(url);
        return url;
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

export default uploadFiles;
