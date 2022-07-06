import { useState } from "react";
import { Link } from "react-router-dom";
import "./SingleCourse.css";

const SingleCourse = () => {
  const [lessonActive, setLessonActive] = useState(0);
  const lessons = [
    {
      title: "Lesson 1",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 2",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 3",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 4",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 5",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 6",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 7",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
    {
      title: "Lesson 8",
      quiz: "Quiz",
      video:
        "https://firebasestorage.googleapis.com/v0/b/gaza-academy.appspot.com/o/videos%2Flanding.mp4?alt=media&token=a1c3748e-eabc-46a3-9fc7-7a7de479b1de",
      image: "https://via.placeholder.com/150",
    },
  ];
  return (
    <div className="single-course">
      <div className="container">
        <div className="box">
          <div className="box-header">
            <h2>الدورة التدريبية الأولى للطلاب الجدد</h2>
          </div>
          <div className="box-body">
            <div className="lessons">
              {lessons.map((lesson, index) => (
                <div
                  onClick={() => setLessonActive(index)}
                  className={`lesson ${index === lessonActive ? "active" : ""}`}
                  key={index}
                >
                  <div className="lesson-image">
                    <img src={lesson.image} alt="" />
                  </div>
                  <div className="lesson-title">
                    <h3>{lesson.title}</h3>
                  </div>
                </div>
              ))}
            </div>
            <div className="video">
              <video
                src={lessons[lessonActive].video}
                controls
                controlsList="nodownload"
              ></video>
              <div className="info">
                <h3>{lessons[lessonActive].title}</h3>
                <Link to={`/quiz/${lessons[lessonActive].quiz}`}>
                  أسئلة الدرس
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
