import "./ResetPassword.css";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="reset-password">
      <div className="container">
        <form>
          <h2> كلمة مرور جديدة</h2>

          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="كلمة المرور"
            />
            <div onClick={handleClick}>
              {showPassword ? (
                <AiFillEye className="eye" />
              ) : (
                <AiFillEyeInvisible className="eye" />
              )}
            </div>
          </div>
          <div className="form-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="confirm-password"
              placeholder="تأكيد كلمة المرور"
            />
            <div onClick={handleClick}>
              {showPassword ? (
                <AiFillEye className="eye" />
              ) : (
                <AiFillEyeInvisible className="eye" />
              )}
            </div>
          </div>
          <button type="submit">تغير</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
