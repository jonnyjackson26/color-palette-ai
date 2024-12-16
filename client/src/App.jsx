import React, { useState } from "react";
import Bar from "./Components/Bar/Bar";
import Search from "./Components/Search/Search";
import "./App.css";

const App = () => {
  const [colors, setColors] = useState(["#FF3B30", "#D87A7A", "#D49A6A", "#CBB765", "#AB7766"]);

  const handlePaletteGenerated = (newPalette) => {
    setColors(newPalette); // Update the colors with new hex values
  };

  return (
    <div className="app">
      <Search onPaletteGenerated={handlePaletteGenerated} />
      <div className="palette">
        {colors.map((color, index) => (
          <Bar key={index} hex={color} />
        ))}
      </div>
    </div>
  );
};

export default App;
