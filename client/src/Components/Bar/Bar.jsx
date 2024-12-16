import React from "react";
import "./Bar.css";

const Bar = ({ hex }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(hex);
    alert(`Copied ${hex} to clipboard!`);
  };

  return (
    <div className="bar" style={{ backgroundColor: hex }} onClick={handleCopy}>
      <div className="hex-label">{hex}</div>
    </div>
  );
};

export default Bar;
