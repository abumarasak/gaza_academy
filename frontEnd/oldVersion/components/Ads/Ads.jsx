import { useEffect } from "react";
import "./Ads.css";
const Ads = (props) => {
  const { currentPath } = props;
  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, []);

  return (
    <div className="ads">
      <div className="container">
        {/* <div className="text">
          <h2>أعلانات </h2>
          <p>هذه الأعلانات خاصة في جوجل</p>
        </div>
        <div className="items" key={currentPath}>
          <div className="ads-item">
            <ins
              className="adsbygoogle"
              data-ad-client="pub-4094004418026803"
              data-ad-slot="2340286051"
            />
          </div>
          <div className="ads-item">
            <ins
              className="adsbygoogle"
              data-ad-client="pub-4094004418026803"
              data-ad-slot="2340286051"
            />
          </div>
          <div className="ads-item">
            <ins
              className="adsbygoogle"
              data-ad-client="pub-4094004418026803"
              data-ad-slot="2340286051"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Ads;
