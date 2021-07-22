import React from "react";

const GenderRadio = ({ handler }) => (
  <div>
    <div>
      <label>Gender:</label>
    </div>
    <div>
      <div>
        <input {...handler("radio", "male")} />
        <label>Male</label>
      </div>
      <div>
        <input {...handler("radio", "female")} />
        <label>Female</label>
      </div>
      <div>
        <input {...handler("radio", "other")} />
        <label>Other</label>
      </div>
    </div>
  </div>
);

export default GenderRadio;
