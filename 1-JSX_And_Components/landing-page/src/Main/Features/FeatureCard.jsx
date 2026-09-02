import { useState } from "react";

function FeatureCard({ feature }) {
  const [readMore, setReadMore] = useState(false);
  const slicedDesc = feature.description.slice(0, 100);

  return (
    <div className="feature-card">
      <h3>[{feature.name}]</h3>
      <p>
        {readMore ? feature.description : `${slicedDesc}...`}
        <br />
        <button onClick={() => setReadMore(!readMore)}>
          {readMore ? "Read Less" : "Read More"}
        </button>
      </p>
    </div>
  );
}

export default FeatureCard;
