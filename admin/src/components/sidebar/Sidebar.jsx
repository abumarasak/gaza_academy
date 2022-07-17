import "./Sidebar.css";
import { BsFillGridFill } from "react-icons/bs";
import { FaChalkboardTeacher, FaGraduationCap } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { BiMailSend, BiLogOut } from "react-icons/bi";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { MdPlayLesson } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
const Sidebar = ({ sidebar }) => {
  return (
    <div className={`sidebar ${sidebar && "active"}`}>
      <div className="logo-details">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/images%2Flogo.svg?alt=media&token=b18ae552-8cc5-4a6f-8646-531bb9cdf403"
          alt=""
          className="logo"
        />
        <span className="logo_name">أكاديمة غزة</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#">
            <BsFillGridFill className="icon" />
            <span>اللوحة الرئيسية</span>
          </a>
        </li>
        <li>
          <a href="#">
            <FaGraduationCap className="icon" />
            <span>المراحل الدراسة</span>
          </a>
        </li>
        <li>
          <a href="#">
            <FiUsers className="icon" />
            <span>الطلاب</span>
          </a>
        </li>
        <li>
          <a href="#">
            <FaChalkboardTeacher className="icon" />
            <span>المعلمين</span>
          </a>
        </li>
        <li>
          <a href="#">
            <RiAdminFill className="icon" />
            <span>الأدارة</span>
          </a>
        </li>
        <li>
          <a href="#">
            <MdPlayLesson className="icon" />
            <span>الدروس</span>
          </a>
        </li>
        <li>
          <a href="#">
            <BsFillFileEarmarkPostFill className="icon" />
            <span>المقالات</span>
          </a>
        </li>
        <li>
          <a href="#">
            <AiFillMessage className="icon" />
            <span>الرسائل</span>
          </a>
        </li>
        <li>
          <a href="#">
            <BiMailSend className="icon" />
            <span>أرسال رسالة</span>
          </a>
        </li>
        <li>
          <a href="#">
            <BiLogOut className="icon" />
            <span>تسجيل خروج</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
