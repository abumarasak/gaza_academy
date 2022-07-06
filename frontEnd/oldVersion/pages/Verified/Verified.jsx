import { Link } from "react-router-dom";
import "./Verified.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { reset, verified } from "../../features/verified/verifiedSlice";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { MdReportGmailerrorred } from "react-icons/md";
const Verified = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError } = useSelector((state) => state.verivied);
  const userId = useLocation().pathname.split("/")[2];
  const uniqueString = useLocation().pathname.split("/")[3];
  const userData = {
    userId: userId,
    uniqueString: uniqueString,
  };

  useEffect(() => {
    if (isError) {
      setInterval(() => {
        navigate("/");
      }, 10000);
    }
    dispatch(reset());
  }, []);
  useEffect(() => {
    dispatch(verified(userData));
  }, []);

  return (
    <div className="verified">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="box">
            {isError ? (
              <h2> حدث خطأ ما الرجاء المحاولة لاحقا</h2>
            ) : (
              <h2> تم تفعيل حسابك بنجاح </h2>
            )}
            {isError ? (
              <>
                <MdReportGmailerrorred className="icon" />
                <h3> الرجاء التاكد من الرابط الخاص بك/ي </h3>
              </>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                fill="currentColor"
                className="bi bi-check-circle-fill animated swing"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
            )}
            {!isError && (
              <>
                <h3>تستطيع الان تسجيل الدخول</h3>
                <Link to="/sign-in" className="sign-in">
                  تسجيل الدخول
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Verified;
