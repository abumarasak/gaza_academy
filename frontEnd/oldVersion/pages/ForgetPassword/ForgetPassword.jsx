import "./ForgetPassword.css";

const ForgetPassword = () => {
  return (
    <div className="forget-password">
      <div className="container">
        <form>
          <h2> نسيت كلمة المرور</h2>
          <p>أعادة تعين كلمة المرور الخاصة بك/ي</p>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="البريد الألكتروني"
            />
            <button type="submit">أرسال</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
