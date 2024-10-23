import React, { useState } from "react";
import { useConstraintsContext } from "../context/ConstraintsContext";
import "./TransferConstraint.css";

const TransferConstraint: React.FC = () => {
  const { numberOfTransfers, setNumberOfTransfers } = useConstraintsContext();
  const [error, setError] = useState<string>("");

  const handleChange = (value: number) => {
    if (isNaN(value) || value < 1) {
      value = 1;
      setError("Minimally Transfer 1 Player");
    } else {
      setError("");
    }
    setNumberOfTransfers(value);
    console.log(`Number of Transfers set to: ${value}`);
  };

  const handleIncrease = () => {
    handleChange(numberOfTransfers + 1);
  };

  const handleDecrease = () => {
    handleChange(numberOfTransfers - 1);
  };

  return (
    <div className="transfer-constraint">
      <label htmlFor="number-of-transfers" className="transfer-label">
        Number of Transfers:
      </label>
      <div className="transfer-input-wrapper">
        <button className="arrow-button" onClick={handleDecrease}>-</button>
        <input
          type="number"
          id="number-of-transfers"
          value={numberOfTransfers}
          onChange={(e) => handleChange(parseInt(e.target.value, 10))}
          min="1"
          className="transfer-input"
        />
        <button className="arrow-button" onClick={handleIncrease}>+</button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TransferConstraint;