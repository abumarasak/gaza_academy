import "./Profile.css";
// Firebase
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../components/Firebase/data";
/////
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiFillDelete, AiFillCamera } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updateUser, deleteUser, reset } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
const Profile = () => {
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] = useState({
    id: path,
    name: "",
    email: "",
    password: "",
    image: "",
  });
  const uploadImage = (file) => {
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
            setFormData({
              ...formData,
              image: url,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };
  const [image, setImage] = useState(user.image);
  const onChange = (e) => {
    if (e.target.name === "image") {
      uploadImage(e.target.files[0]);
    }
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
  }, [isError, isSuccess, message, user, navigate]);
  const update = (e) => {
    e.preventDefault();
    if (formData.name === "") {
      delete formData.name;
    }
    if (formData.password === "") {
      delete formData.password;
    }
    if (formData.image === "") {
      delete formData.image;
    }
    if (formData.email === "") {
      delete formData.email;
    }
    const isEmpty = Object.keys(formData).length === 1;
    if (isEmpty) {
      toast.error("لا يمكن ترك  جميع الحقول فارغة");
    } else {
      dispatch(updateUser(formData));
      dispatch(reset());
    }
  };
  const deluser = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تستطيع عكس هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, حذفه!",
      cancelButtonText: "إلغاء",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteUser(path));
        dispatch(reset());
      }
    });
  };
  return (
    <div className="profile">
      {user && (
        <div className="container">
          <div className="box">
            <div className="delete">
              <button onClick={deluser}>
                <AiFillDelete className="icon" />
                حذف الحساب
              </button>
            </div>
            <form onSubmit={update}>
              <div className="img-input">
                <input
                  type="file"
                  className="input-file"
                  accept="image/*"
                  id="user-image"
                  value={formData.image}
                  name="image"
                  onChange={onChange}
                />
                <label htmlFor="user-image" className="image-label">
                  <img src={image} alt="user" className="userImage" />
                  <AiFillCamera className="icon" />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="user-name">الاسم</label>
                <input
                  type="text"
                  className="form-control"
                  id="user-name"
                  placeholder={user.name}
                  value={formData.name}
                  name="name"
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-email">البريد الألكتروني</label>
                <input
                  type="email"
                  className="form-control"
                  id="user-email"
                  placeholder={user.email}
                  value={formData.email}
                  onChange={onChange}
                  name="email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="user-password">كلمة المرور</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="user-password"
                  placeholder="********"
                  value={formData.password}
                  onChange={onChange}
                  name="password"
                  onFocus={() => {
                    setShowPassword(true);
                  }}
                  onBlur={() => {
                    setShowPassword(false);
                  }}
                />
              </div>

              <div className="form-group">
                <button type="submit">حفظ التغيرات</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
