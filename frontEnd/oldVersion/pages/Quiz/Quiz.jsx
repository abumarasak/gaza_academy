import { useState } from "react";
import Ads from "../../components/Ads/Ads";
import "./Quiz.css";

const Quiz = () => {
  const quiz = [
    {
      question: "أين يوجد أطباء الأسنان؟",
      answers: [
        {
          answer: "الأطباء الأسنان المحليين",
          correct: false,
        },
        {
          answer: "الأطباء الأسنان الأجنبيين",
          correct: false,
        },
        {
          answer: "الأطباء الأسنان الأوروبيين",
          correct: true,
        },
        {
          answer: "الأطباء الأسنان الأوروبيين",
          correct: false,
        },
      ],
    },
    {
      question: "أين يوجد أطباء الأسنان؟",
      answers: [
        {
          answer: "الأطباء الأسنان المحليين",
          correct: true,
        },
        {
          answer: "الأطباء الأسنان الأجنبيين",
          correct: false,
        },
        {
          answer: "الأطباء الأسنان الأوروبيين",
          correct: false,
        },
        {
          answer: "الأطباء الأسنان الأوروبيين",
          correct: false,
        },
      ],
    },
    {
      question: "أين يوجد أطباء الأسنان؟",
      answers: [
        {
          answer: "الأطباء الأسنان المحليين",
          correct: true,
        },
        {
          answer: "الأطباء الأسنان الأجنبيين",
          correct: false,
        },
        {
          answer: "الأطباء الأسنان الأوروبيين",
          correct: false,
        },
        {
          answer: "الأطباء الأسنان الأوروبيين",
          correct: false,
        },
      ],
    },
  ];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const answerFunction = (isCorrect) => {
    if (isCorrect) {
      setResult(result + 1);
      setShowCorrectAnswer(true);
    } else {
      setShowCorrectAnswer(true);
    }
  };
  const nextQuestion = () => {
    setShowCorrectAnswer(false);
    if (currentQuestion === quiz.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <>
      <div className="quiz">
        <div className="container">
          {showResult ? (
            <div className="box count">
              <div className="count">
                عدد الأسئلة المُجاوبة صحيحة:{" "}
                <span>
                  {" "}
                  {result} / {quiz.length}
                </span>
              </div>
              <div className="do-again">
                <button
                  onClick={() => {
                    setShowResult(false);
                    setCurrentQuestion(0);
                  }}
                >
                  إعادة الاختبار
                </button>
              </div>
            </div>
          ) : (
            <div className="box">
              <div className="quiz-info">
                <h3> أختبار الوحدة الأولى </h3>
                <p>
                  السؤال {currentQuestion + 1} من {quiz.length}
                </p>
              </div>
              <div className="quiz-question">
                <h4>{quiz[currentQuestion].question}</h4>
              </div>
              <div className="quiz-answers">
                {quiz[currentQuestion].answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`answer ${
                      showCorrectAnswer ? answer.correct : ""
                    }`}
                    onClick={() => answerFunction(answer.correct)}
                  >
                    {answer.answer}
                  </div>
                ))}
              </div>
              <div className="next-question">
                <button onClick={nextQuestion}>السؤال التالي</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Ads />
    </>
  );
};

export default Quiz;
