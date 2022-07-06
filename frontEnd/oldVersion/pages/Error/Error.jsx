import { Link } from "react-router-dom";
import "./Error.css";

const Error = () => {
  setInterval(() => {
    window.location.href = "/";
  }, 10000);
  return (
    <section className="page_404">
      <div className="container">
        <div className="error-text">
          <img
            src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg"
            alt="404"
          />
          <span>الورشة 404</span>
          <p className="p-a">
            هذه الصفحة غير موجودة! إما أن تم حذفها أو تغيير العنوان الخاص بها.
          </p>
          <p className="p-b">
            سيتم توجيهك الى الصفحة الرئيسية في غضون ثوانٍ قليلة...
          </p>
          <Link to="/" className="back">
            صفحة البداية
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
