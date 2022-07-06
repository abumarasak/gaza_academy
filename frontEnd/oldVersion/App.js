import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./global.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Signin from "./pages/Signin/Signin";
import SignUp from "./pages/Signup/Signup";
import SingleLesson from "./pages/SingleLesson/SingleLesson";
import SingleCourse from "./pages/SingleCourse/SingleCourse";
import SingleBlogPost from "./pages/SingleBlogPost/SingleBlogPost";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Blog from "./pages/Blog/Blog";
import SchoolGrade from "./pages/SchoolGrade/SchoolGrade";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Exams from "./pages/Exams/Exams";
import Quiz from "./pages/Quiz/Quiz";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/Loading/Loading";
import Verified from "./pages/Verified/Verified";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/school-grade" element={<SchoolGrade />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/reset-password/:userId/:resetString"
          element={<ResetPassword />}
        />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/lesson/:id" element={<SingleLesson />} />
        <Route path="/course/:id" element={<SingleCourse />} />
        <Route path="/blog/:id" element={<SingleBlogPost />} />
        <Route path="/verified/:userId/:uniqueString" element={<Verified />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
/*


*/
