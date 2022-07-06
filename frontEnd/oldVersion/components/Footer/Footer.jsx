import { Link } from "react-router-dom";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/">About us</Link>
              </li>
              <li>
                <Link to="/">Our services</Link>
              </li>
              <li>
                <Link to="/">Privacy policy</Link>
              </li>
              <li>
                <Link to="/">Affiliate program</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get help</h4>
            <ul>
              <li>
                <Link to="/">FAQ</Link>
              </li>
              <li>
                <Link to="/">Shipping</Link>
              </li>
              <li>
                <Link to="/">Returns</Link>
              </li>
              <li>
                <Link to="/">Order status</Link>
              </li>
              <li>
                <Link to="/">Payment Options</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Online shop</h4>
            <ul>
              <li>
                <Link to="/">Watch</Link>
              </li>
              <li>
                <Link to="/">Bag</Link>
              </li>
              <li>
                <Link to="/">Shoes</Link>
              </li>
              <li>
                <Link to="/">Dress</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow us</h4>
            <div className="social-links">
              <a href="/">
                <FaFacebookF />
              </a>

              <a href="/">
                <FaTwitter />
              </a>

              <a href="/">
                <FaInstagram />
              </a>

              <a href="/">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        <div className="copy-right">
          <p>
            جميع الحقوق محفوظة © 2020 <Link to="/"> أكاديمية غزة </Link>
            <br />
            تصميم وبرمجة <a href="/"> خالد أبومرسه</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
