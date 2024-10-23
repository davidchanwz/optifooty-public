// src/components/ResultComponent.tsx
import React from "react";

const ResultComponent: React.FC = () => {
  // Placeholder for result data
  const resultData = "This is where the results will be displayed.";

  return (
    <div className="result-component">
      <h2>Transfer Results</h2>
      <p>{resultData}</p>
    </div>
  );
};

export default ResultComponent;
