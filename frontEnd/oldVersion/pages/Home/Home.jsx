import { Link } from "react-router-dom";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="home">
      <div className="container">
        <section className="showcase">
          <div className="video-container">
            <video muted loop autoPlay>
              <source src="./Videos/landing.mp4 " type="video/mp4" />
            </video>
          </div>
          {user ? (
            <div className="content">
              <h1> مرحبا بعودتك/ي عزيزي/تي {user.name}</h1>
              <h3> الذهاب الى الفصول الدراسية </h3>

              <Link to="sign-in" className="btn">
                الفصول الدراسية
              </Link>
            </div>
          ) : (
            <div className="content">
              <h1> مرحبا عزيزي/تي </h1>
              <h3>في أكاديمية غزة التعلمية لتعليم مادة الفيزياء</h3>
              <div className="links">
                <Link to="sign-in" className="btn ">
                  تسجيل الدخول
                </Link>
                <Link to="sign-up" className="btn active">
                  التسجيل
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Home;
