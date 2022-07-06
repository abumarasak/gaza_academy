import "./Contact.css";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { contact, reset } from "../../features/contact/contactSlice";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading/Loading";
const Contact = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.contact
  );
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const handelChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (
      contactData.name === "" ||
      contactData.email === "" ||
      contactData.phoneNumber === "" ||
      contactData.subject === "" ||
      contactData.message === ""
    ) {
      toast.error("الرجاء تعبئة جميع الحقول");
    } else {
      dispatch(
        contact({
          name: contactData.name,
          email: contactData.email,
          phoneNumber: contactData.phoneNumber,
          subject: contactData.subject,
          message: contactData.message,
        })
      );
    }
  };
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
      setContactData({
        name: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
      });
    }

    dispatch(reset());
  }, [isError, isSuccess, message, dispatch, isLoading]);
  return (
    <div className="contact">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container">
          <div className="contact-info">
            <div>
              <h2>أبقى على تواصل</h2>
              <p>
                عندما يحتاج إلى مساعدة أو إشعارات أو أي شيء آخر يمكنك الاتصال
                بنا عبر الأتصالات التالية
              </p>
            </div>

            <div className="info">
              <div className="info-item">
                <h2>رقم الهاتف</h2>
                <p>
                  <BsFillTelephoneFill className="icon" />
                  +966 544 544 544
                </p>
              </div>
              <div className="info-item">
                <h2>البريد الألكتروني</h2>
                <p>
                  <AiOutlineMail className="icon" />
                  contact@gaza-academy.com
                </p>
              </div>
            </div>
          </div>
          <div className="form-box">
            <form onSubmit={handelSubmit}>
              <div className="box">
                <div className="input">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="الأسم"
                    name="name"
                    onChange={handelChange}
                    value={contactData.name}
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="البريد الألكتروني"
                    name="email"
                    onChange={handelChange}
                    value={contactData.email}
                  />
                </div>
              </div>
              <div className="box">
                <div className="input">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="رقم الهاتف"
                    name="phoneNumber"
                    onChange={handelChange}
                    value={contactData.phoneNumber}
                  />
                </div>
                <div className="input">
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="الموضوع"
                    name="subject"
                    onChange={handelChange}
                    value={contactData.subject}
                  />
                </div>
              </div>
              <div className="message">
                <textarea
                  placeholder="الرسالة"
                  name="message"
                  onChange={handelChange}
                  value={contactData.message}
                ></textarea>
              </div>
              <div className="submit">
                <button type="submit">
                  إرسال
                  <FiSend className="icon" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
