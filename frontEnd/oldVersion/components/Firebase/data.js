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

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
