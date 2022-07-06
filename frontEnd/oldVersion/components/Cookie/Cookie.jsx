import { useState } from "react";
import "./Cookie.css";

const Cookie = () => {
  const [cookie, setCookie] = useState(false);
  setInterval(() => {
    if (document.cookie.indexOf("cookie") !== -1) {
      setCookie(false);
    } else {
      setCookie(true);
    }
  }, 2000);
  const set_cookie = (name, value, days) => {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  };
  return (
    <div className="cookie">
      <div className={`container ${cookie && "active"}`}>
        <p>
          هذا الموقع يستخدم برامج الكوكيز لتخزين البيانات الخاصة بك. نقوم بحذف
          البيانات الخاصة بك بعد عدم الإستخدام من خلال الموقع.
          <br />
          <a href="https://www.allaboutcookies.org/">أكتب عن الكوكيز</a>
          <button
            onClick={() => {
              set_cookie("cookie", "true", 365);
              setCookie(false);
            }}
          >
            موافق
          </button>
        </p>
      </div>
    </div>
  );
};

export default Cookie;
