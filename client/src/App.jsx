import React, { useState } from "react";
import Bar from "./Components/Bar/Bar";
import Search from "./Components/Search/Search";
import "./App.css";

function App() {
  const [colors, setColors] = useState(["#FF3B3B", "#D66E6E", "#C68C6C", "#D5C86E"]);

  const handleSubmit = (newColors) => {
    setColors(newColors);
  };

  return (
    <div className="app">
      <h1>Create me a color palette that ...</h1>
      <Search onSubmit={handleSubmit} />
      <div className="palette">
        {colors.map((color, index) => (
          <Bar key={index} hex={color} />
        ))}
      </div>
    </div>
  );
}

export default App;
