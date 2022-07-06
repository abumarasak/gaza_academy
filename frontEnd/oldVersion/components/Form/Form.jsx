import "./Form.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../components/Firebase/data";
import {
  AiFillEyeInvisible,
  AiFillEye,
  AiOutlineMail,
  AiFillLock,
  AiFillFileImage,
} from "react-icons/ai";

import { FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset, login } from "../../features/auth/authSlice";
import Loading from "../Loading/Loading";
const Form = ({ signUp }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.auth
  );
  const [showPassword, setShowPassword] = useState(false);
  const [signUpMode, setSignMode] = useState(signUp);
  const [userImage, setUserImage] = useState("");
  const [SignupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    image: userImage,
  });

  const [LoginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const signupOnChange = (e) => {
    if (e.target.name === "image") {
      if (
        e.target.files[0] &&
        e.target.files[0]["type"].split("/")[0] === "image"
      ) {
        setUserImage(e.target.files[0]);
        const storageRef = ref(storage, `/images/${e.target.files[0].name}`);
        const uploadTask = uploadBytesResumable(storageRef, userImage);
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
                setUserImage(url);
                console.log(url);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        );
      } else {
        toast.error("الرجاء اختيار صورة");
      }
    }
    setSignupFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const loginOnChange = (e) => {
    setLoginFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const signupSubmit = (e) => {
    e.preventDefault();
    if (SignupFormData.password !== SignupFormData.password2) {
      toast.error("كلمة المرور غير متطابقة");
    } else {
      const userData = {
        name: SignupFormData.name,
        email: SignupFormData.email,
        password: SignupFormData.password,
        image: SignupFormData.image,
      };
      dispatch(register(userData));
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    if (LoginFormData.email === "" || LoginFormData.password === "") {
      toast.error("يرجى ملئ جميع الحقول");
    } else {
      const userData = {
        email: LoginFormData.email,
        password: LoginFormData.password,
      };
      dispatch(login(userData));
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      navigate("/sign-in");
    }
    if (user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, navigate, isError, isSuccess, message, dispatch, isLoading]);

  return (
    <div className="sign-in">
      {isLoading ? (
        <Loading />
      ) : (
        <div className={`container ${signUpMode && "sign-up-mode"}`}>
          <div className="forms-container">
            <div className="signin-signup">
              <form action="" className="sign-in-form" onSubmit={loginSubmit}>
                <h2 className="title"> تسجيل الدخول </h2>
                <div className="input-field">
                  <AiOutlineMail className="icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الألكتروني"
                    autoComplete="off"
                    value={LoginFormData.email}
                    onChange={loginOnChange}
                  />
                </div>

                <div className="input-field">
                  <AiFillLock className="icon" />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <AiFillEye className="eye" />
                    ) : (
                      <AiFillEyeInvisible className="eye" />
                    )}
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور"
                    autoComplete="off"
                    value={LoginFormData.password}
                    name="password"
                    onChange={loginOnChange}
                  />
                </div>
                <input
                  type="submit"
                  value="تسجيل 
              الدخول"
                  className="btn solid"
                />
                <p className="restart-password">
                  هل نسيت كلمة المرور؟{" "}
                  <Link to="/forget-password">أعادتها</Link>
                </p>
              </form>
              <form className="sign-up-form" onSubmit={signupSubmit}>
                <h2 className="title"> التسجيل </h2>
                <div className="input-field">
                  <FaUserAlt className="icon" />
                  <input
                    type="text"
                    placeholder="الأسم "
                    autoComplete="off"
                    name="name"
                    onChange={signupOnChange}
                  />
                </div>
                <div className="input-field">
                  <AiOutlineMail className="icon" />
                  <input
                    type="email"
                    placeholder="البريد الألكتروني"
                    autoComplete="off"
                    value={SignupFormData.email}
                    name="email"
                    onChange={signupOnChange}
                  />
                </div>
                <div className="input-field">
                  <AiFillLock className="icon" />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <AiFillEye className="eye" />
                    ) : (
                      <AiFillEyeInvisible className="eye" />
                    )}
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="كلمة المرور"
                    autoComplete="off"
                    value={SignupFormData.password}
                    name="password"
                    onChange={signupOnChange}
                  />
                </div>
                <div className="input-field">
                  <AiFillLock className="icon" />
                  <div
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <AiFillEye className="eye" />
                    ) : (
                      <AiFillEyeInvisible className="eye" />
                    )}
                  </div>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder=" تأكيد كلمة المرور"
                    autoComplete="off"
                    value={SignupFormData.password2}
                    name="password2"
                    onChange={signupOnChange}
                  />
                </div>
                <div className="input-field">
                  <AiFillFileImage className="icon" />
                  <input
                    type="file"
                    accept="image/*"
                    id="file"
                    className="file-input"
                    value={SignupFormData.image}
                    name="image"
                    onChange={signupOnChange}
                  />
                  <label className="file-label" htmlFor="file">
                    صورة الملف الشخصي
                  </label>
                </div>

                <div className="checkbox">
                  <input type="checkbox" id="checkbox" className="checkbox" />
                  <label className="checkbox" htmlFor="checkbox">
                    أرسال رسائل عبر البريد الإلكتروني
                  </label>
                </div>

                <input type="submit" value="التسجيل" className="btn solid" />
              </form>
            </div>
          </div>
          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>جديد هنا ؟</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quidem, impedit!
                </p>
                <button
                  className="btn transparent"
                  id="sign-up-btn"
                  onClick={() => {
                    setSignMode(true);
                  }}
                >
                  التسجيل
                </button>
              </div>
              <img src="./images/log.svg" className="image" alt="" />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>لديك حساب بالفعل ؟</h3>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quidem, impedit!
                </p>
                <button
                  className="btn transparent"
                  id="sign-in-btn"
                  onClick={() => {
                    setSignMode(false);
                  }}
                >
                  تسجيل الدخول
                </button>
              </div>
              <img src="./images/register.svg" className="image" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
