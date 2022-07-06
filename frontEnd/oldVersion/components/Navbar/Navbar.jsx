import { useEffect, useState } from "react";

import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    const submenu = document.querySelectorAll(".submenu");
    const links = document.querySelectorAll(".link");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        setIsOpen(false);
      });
    });
    submenu.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
    window.onscroll = () => {
      setIsOpen(false);
    };
  });
  return (
    <header className={`navbar ${isOpen && "active"}`}>
      <Link className="logo" to="/">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/images%2Flogo.svg?alt=media&token=b18ae552-8cc5-4a6f-8646-531bb9cdf403"
          alt="logo"
        />
      </Link>
      <div
        className={`icon ${isOpen && "active"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${isOpen && "active"}`}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
            >
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
            >
              حول
            </NavLink>
          </li>

          <li>
            <a href="/" className="submenu">
              الصفحات +
            </a>
            <ul>
              <li>
                <NavLink
                  to="/blog"
                  className={`link ${({ isActive }) =>
                    isActive ? "active" : ""}`}
                >
                  المقالات
                </NavLink>
              </li>
              <li>
                <a href="/" className="submenu">
                  الخدمات +
                </a>

                <ul>
                  <li>
                    <NavLink
                      to="/first"
                      className={`link ${({ isActive }) =>
                        isActive ? "active" : ""}`}
                    >
                      First
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/second"
                      className={`link ${({ isActive }) =>
                        isActive ? "active" : ""}`}
                    >
                      Second
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/third"
                      className={`link ${({ isActive }) =>
                        isActive ? "active" : ""}`}
                    >
                      Third
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              to="/revoew"
              className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
            >
              التقييمات
            </NavLink>
          </li>
          <li>
            <a href="/" className="submenu">
              معرض +
            </a>
            <ul>
              <li>
                <NavLink
                  to="/third"
                  className={`link ${({ isActive }) =>
                    isActive ? "active" : ""}`}
                >
                  Third
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/third"
                  className={`link ${({ isActive }) =>
                    isActive ? "active" : ""}`}
                >
                  Third
                </NavLink>
              </li>
            </ul>
          </li>
          {user && (
            <li>
              <a href="/" className="submenu">
                {user.user.name} +
              </a>
              <ul>
                <li>
                  <NavLink
                    to={`/profile/${user.user._id}`}
                    className={`link ${({ isActive }) =>
                      isActive ? "active" : ""}`}
                  >
                    الملف الشخصي
                  </NavLink>
                </li>
                <li>
                  <a onClick={onLogout} className="link " href="/">
                    تسجيل الخروج
                  </a>
                </li>
              </ul>
            </li>
          )}
          <li>
            <NavLink
              to="/contact"
              className={`link ${({ isActive }) => (isActive ? "active" : "")}`}
            >
              تواصل معنا
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
