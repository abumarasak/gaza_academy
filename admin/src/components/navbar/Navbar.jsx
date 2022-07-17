import "./Navbar.css";
import {
  AiOutlineMenu,
  AiOutlineSearch,
  AiFillCaretDown,
} from "react-icons/ai";
const navbar = ({ sidebar, setSidebar }) => {
  console.log(sidebar);
  return (
    <nav className={!sidebar ? "active" : ""}>
      <div className="sidebar-button">
        <AiOutlineMenu onClick={() => setSidebar(!sidebar)} />
        {/* <span className="dashboard">لوحة التحكم</span> */}
      </div>
      <div className="search-box">
        <input type="text" placeholder=" بحث " />
        <AiOutlineSearch />
      </div>
      <div className="profile-details">
        <img src="./images/profile.jpg" alt="" />
        <span className="admin_name">خالد أبومرسه</span>
        <AiFillCaretDown />
      </div>
    </nav>
  );
};

export default navbar;
