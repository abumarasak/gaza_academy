import "./Landing.css";

const Landing = (props) => {
  return (
    <div className="landing">
      <div className="container">
        <div className="img">
          <img src={`./Images/${props.img}`} alt="" />
        </div>
        <div className="info">{props.text}</div>
      </div>
    </div>
  );
};

export default Landing;
